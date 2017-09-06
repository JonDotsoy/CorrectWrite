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
        case 'pull-list': {
          await DB.ready
          const data = await pullDataSitemap()
          log`Ok download the sitemap`
          await DB.set('data.urls', data)
          log`Save ${ Object.keys( await DB.get('data.urls') ).length } urls`
          break
        }
        case 'ls':
        case 'list': {
          await DB.ready
          const urls = await queryURLS(DB, argv.n)

          log`${Object.keys(urls).length} urls to inspect`

          for (const urlk in urls) {
            const urld = urls[urlk]
            log`href: ${urld.url} pulled: ${urld._pulled === true}`
          }

          break
        }
        case 'i':
        case 'info': {
          await DB.ready

          const urls = await DB.get('data.urls')

          const urlsTotal = Object.keys(urls).length

          const urlsCompletes = [0, ...Object.keys(urls)]
          .reduce((c, keyurl) => {
            if (urls[keyurl]._pulled) {
              return c + 1
            }
            return c
          })

          log`Urls: ${urlsTotal}`
          log`Urls Ok: ${urlsCompletes}`
          log`Urls No Ok: ${urlsTotal - urlsCompletes}`

          break
        }
        case 'scan-urls': {
          await DB.ready

          const urls = await queryURLS(DB, argv.n)

          const urlsTotal = Object.keys(urls).length

          log`${urlsTotal} urls to inspect`

          if (argv.V) log`Detail URLS\n${urls}`

          let n = 0
          for (const urlk in urls) {
            const urld = urls[urlk]
            n += 1
            if (urld._pulled === true) {
              log`[${Math.round(100*(n/urlsTotal))}% (#${n})] skip ${urld.url}`
            } else {
              log`[${Math.round(100*(n/urlsTotal))}% (#${n})] pull ${urld.url}`
              const contextBody = await requestDefFromPage(urld.url)
              await DB.set(['data', 'urls', urld.url, '_context'], contextBody)
              await DB.set(['data', 'urls', urld.url, '_pulled'], true)
              if (argv.V) log`contextBody\n${contextBody}`
              log`[${Math.round(100*(n/urlsTotal))}% (#${n})] pulled ${urld.url}`
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
async function pullDataSitemap () {
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
    // title,
    txtl,
    txtr
    // cur,
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
