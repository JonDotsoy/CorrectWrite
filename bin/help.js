#! /usr/bin/env node

const log = require('../lib/customLog')
const {URL} = require('url')
const chalk = require('chalk')
const fs = require('fs')
const http = require('http')
const cheerio = require('cheerio')
const path = require('path')
const argv = require('minimist')(process.argv.slice(2), {
  alias: {
    'V': 'verbose',
    'n': 'quantity',
    'v': 'version',
    'f': 'force'
  },
  boolean: [
    'verbose',
    'version',
    'force'
  ]
})

if (argv.V) log`argv: ${argv}`

const workdir = path.resolve(__dirname, '..')
const {DBQuery} = require('../lib/DBQuery')

if (argv.V) log`workdir: ${workdir}`

const DB = new DBQuery(path.resolve(workdir, 'data.json'))
const DBClear = new DBQuery(path.resolve(workdir, 'data.clear.json'), {immediateWriting: false, outputFormatted: null})

const dbReady = Promise.all([DB.ready, DBClear.ready])
const _ = argv._

const configs = {
  sitemap: 'http://www.como-se-escribe.com/sitemap.xml'
}

async function RUN () {
  switch (_.shift()) {
    case 'print': {
      await dbReady
      const data = await DBClear.get('data')

      console.log(data)

      break
    }
    case 'data': {
      switch (_.shift()) {
        case 'fetch-list': {
          await dbReady
          const data = await fetchDataSitemap()
          log`Ok download the sitemap`
          await DB.set('data.urls', data)
          log`Save ${Object.keys(await DB.get('data.urls')).length} urls`
          break
        }
        case 'ls':
        case 'list': {
          await dbReady
          const sites = await queryURLS(DB, argv.n)

          log`${Object.keys(sites).length} sites to inspect`

          for (const indexSite in sites) {
            const site = sites[indexSite]
            log`href: ${site.url} pulled: ${site._pulled === true}`
          }

          break
        }
        case 'i':
        case 'info': {
          await dbReady
          const sites = await DB.get('data.urls')
          const sitesNTotal = Object.keys(sites).length
          const initialCount = 0
          const urlsCompletes = [initialCount, ...Object.keys(sites)]
            .reduce((count, indexSite) => {
              if (sites[indexSite]._pulled) return count + 1
              return count
            })
          log`Sites: ${sitesNTotal}`
          log`Sites fetched: ${urlsCompletes}`
          log`Sites not fetched: ${sitesNTotal - urlsCompletes}`

          break
        }
        case 'fetch-sites': {
          await dbReady
          const sites = await queryURLS(DB, argv.n)
          const sitesNTotal = Object.keys(sites).length
          log`${sitesNTotal} sites to inspect`
          if (argv.V) log`Sites:\n${sites}`

          // Initial Count
          let count = 0
          for (const indexSite in sites) {
            const site = sites[indexSite]

            count += 1

            if (site._pulled === true) {
              log`[${Math.floor(100 * (count / sitesNTotal))}% (#${count})] skip ${site._context.title} (${site.url})`
            } else {
              log`[${Math.floor(100 * ((count - 1) / sitesNTotal))}% (#${count})] fetch ${site.url}`
              const contextBody = await requestDefFromPage(site.url)
              await DB.set(['data', 'urls', site.url, '_context'], contextBody)
              await DB.set(['data', 'urls', site.url, '_pulled'], true)
              if (argv.V) log`contextBody\n${contextBody}`
              log`[${Math.floor(100 * (count / sitesNTotal))}% (#${count})] complet fetch ${contextBody.title}`
            }
          }

          break
        }
        case 'sites': {
          let search = _.shift()
          if (!search) throw new Error('"search" is not defined')
          search = `${search.replace(/([^A-Z]+)/gi, '.+')}`

          await dbReady

          const sites = await DB.get('data.urls')

          for (const indexSite in sites) {
            const site = sites[indexSite]
            if ((new RegExp(search, 'i')).test(site._context.title)) {
              console.log(site._context.title)
              console.log(site.url)
            }
          }
          break
        }

        case 'clear': {
          await dbReady
          await DBClear.clear()

          const sites = await queryURLS(DB, argv.n)

          let count = 0
          const urls = {}

          for (const indexSite in sites) {
            const site = sites[indexSite]

            if (filterIsSiteValid(site)) {
              count += 1
              if (argv.V) log`valid ${site._context.title}`
              const newSite = clearSite(site)
              await DBClear.set(['data', 'urls', newSite.id], newSite)
              urls[site.url] = site
            } else {
              if (argv.V) log`skip ${site._context.title} this is not valid`
            }
          }

          await DBClear.set(['data','indexSearch'], getListIndexSearch())

          await DBClear.write()
          log`${count} sites was transferred`

          break
        }

        case 'search': {
          await dbReady
          const word = _.shift()

          const indexSearch = await DBClear.get('data.indexSearch')
          const sites = await DBClear.get('data.urls')

          console.log(
            indexSearch
              .filter(([e]) => (e.search(word.toLocaleLowerCase()) !== -1))
              .map(([w,id]) => `${sites[id]._context.title} (${w})`)
          )

          break
        }
      }

      break
    }
    case 's':
    case 'search': {
      await dbReady
      const word = _.shift()
      const indexSearch = await DBClear.get('data.indexSearch')

      async function loadAllIndexsables () {
        const sites = []

        const sitesResult = indexSearch.filter(([value]) => (
          value === word.toLocaleLowerCase()
        ))

        for (const resultElement of sitesResult) {
          const [,idSite] = resultElement

          sites.push(await DBClear.get(['data', 'urls', idSite]))
        }

        return sites
      }

      const sites = await loadAllIndexsables()

      for (const site of sites) {
        const url = site.url
        const title = site._context.title

        // Print info
        log(`${chalk.green(title)}\n${printTextSite(site)}`)
      }

      break
    }
  }
}

function printTextSite (site) {
  const {txtl, txtr} = site._context

  return [...txtl, ...txtr]
    .map((elm) => {
      if (elm.type === 'tag' && elm.name === 'h2') {
        return `${chalk.green(elm._text)}:`
      } else {
        return elm._text
      }
    })
    .map(e => `\t${e}`)
    .join('\n')
}

let n = 0
const listIndexSearch = []
function getListIndexSearch () { return listIndexSearch }

function clearSite (site) {
  n += 1
  id = `$${n}`

  const {txtl, txtr, cur} = site._context

  for (const el of [...txtl, ...txtr, ...cur]) {
    if (el.type === 'tag' && el.name === 'h2') {
      listIndexSearch.push([el._text.toLocaleLowerCase(), id])
    }
  }

  return {id, ...site}
}

function filterIsSiteValid (site) {
  if (/^http\:\/\/www.como-se-escribe\.com\/lista\-palabras\//i.test(site.url)) return false
  if (/^http\:\/\/www.como-se-escribe\.com\/numeros\//i.test(site.url)) return false
  if (/^http\:\/\/www.como-se-escribe\.com\/lista\-nombres\//i.test(site.url)) return false
  if (/^http\:\/\/www.como-se-escribe\.com\/buscador\//i.test(site.url)) return false
  if (/^http\:\/\/www.como-se-escribe\.com\/$/i.test(site.url)) return false
  return true
}

async function queryURLS (DB, n) {
  n = Number(n)
  let urls = await DB.get('data.urls')
  if (n) {
    const urlsKeys = Object.keys(urls).slice(0, n)
    const newUrls = {}
    for (const key of urlsKeys) {
      newUrls[key] = urls[key]
    }
    urls = newUrls
  }
  return urls
}

/**
 * get the sitemap with all words
 */
async function fetchDataSitemap () {
  const {body} = await requestFromURL(configs.sitemap)

  const $ = cheerio.load(body)

  const arrData = {}

  $('url > loc').each((index, doc) => {
    arrData[(new cheerio(doc)).text()] = {url: (new cheerio(doc)).text()}
  })

  return arrData
}

async function requestDefFromPage (url) {
  const {body} = await requestFromURL(url)

  const $ = cheerio.load(body)

  const title = $('title').text()
  const txtl = htmlCheerioToJSON($('#txtl'), $)
  const txtr = htmlCheerioToJSON($('#txtr'), $)
  const cur = htmlCheerioToJSON($('#cur'), $)

  return {
    title,
    txtl,
    txtr,
    cur
  }
}

function htmlCheerioToJSON (el, $) {
  const els = []

  el.contents().each((i, el) => {
    const e = {}

    e._html = $(el).html()
    e._text = $(el).text()

    e.name = el.name
    e.type = el.type
    e.data = el.data

    // if (e.name === 'h2') {
    //   console.log( $(el).children() )
    //   process.exit()
    // }

    if (e.type === 'tag') {
      e.contents = htmlCheerioToJSON($(el).children(), $)
    }

    els.push(e)
  })

  return els
}

async function requestFromURL (url) {
  return new Promise((resolve, reject) => {
    const req = http.request((
      new URL(url)
    ), (res) => {
      res.setEncoding('utf8')

      let body = ''

      res.on('data', (d) => {
        body += d.toString()
      })

      res.on('end', () => {
        resolve({body, req, res})
      })
    })

    req.on('error', (err) => {
      reject(err)
    })

    req.end()
  })
}

RUN().catch(console.error)
