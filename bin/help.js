#! /usr/bin/env node

const log = require('../lib/customLog')
const {URL} = require('url')
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

const _ = argv._

const configs = {
  sitemap: 'http://www.como-se-escribe.com/sitemap.xml'
}

async function RUN () {
  switch (_.shift()) {
    case 'data': {
      switch (_.shift()) {
        case 'fetch-list': {
          await DB.ready
          const data = await fetchDataSitemap()
          log`Ok download the sitemap`
          await DB.set('data.urls', data)
          log`Save ${ Object.keys( await DB.get('data.urls') ).length } urls`
          break
        }
        case 'ls':
        case 'list': {
          await DB.ready
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
          await DB.ready
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
          await DB.ready
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
              log`[${Math.floor(100*(count/sitesNTotal))}% (#${count})] skip ${site._context.title} (${site.url})`
            } else {
              log`[${Math.floor(100*((count - 1)/sitesNTotal))}% (#${count})] fetch ${site.url}`
              const contextBody = await requestDefFromPage(site.url)
              await DB.set(['data', 'urls', site.url, '_context'], contextBody)
              await DB.set(['data', 'urls', site.url, '_pulled'], true)
              if (argv.V) log`contextBody\n${contextBody}`
              log`[${Math.floor(100*(count/sitesNTotal))}% (#${count})] complet fetch ${contextBody.title}`
            }
          }

          break
        }
      }
      break
    }
  }
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
    cur,
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
