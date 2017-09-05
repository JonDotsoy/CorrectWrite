
const {expect} = require('chai')


describe('Scan Latters', () => {

  it('has latters', (next) => {

    const {URL} = require('url')
    const http = require('http')
    const cheerio = require('cheerio')


    const req = http.request((
      new URL('http://www.como-se-escribe.com/sitemap.xml')
    ), (res) => {
      res.setEncoding('utf8')

      let body = ''

      res.on('data', (d) => {
        body += d.toString()
      })

      res.on('end', () => {
        const e = cheerio.load(body)

        console.log( e('url').length )

        next()
      })

    })

    req.on('error', (err) => {
      next(err)
    })

    req.end()
  })
})