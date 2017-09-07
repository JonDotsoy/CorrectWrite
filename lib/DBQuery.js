
const set = require('lodash/set')
const get = require('lodash/get')
const fs = require('fs')

class DBQuery {
  constructor (filepath, opts = {}) {
    this.filepath = filepath
    this.jsondata = null
    this.immediateWriting = opts.immediateWriting === true
    this.outputFormatted = opts.outputFormatted || null

    this.ready = new Promise((resolve, reject) => {
      const loadJSONData = () => {
        this.jsondata = JSON.parse(fs.readFileSync(this.filepath))
      }

      if (fs.existsSync(this.filepath)) {
        if (!fs.statSync(this.filepath).isFile()) {
          reject(new Error(`file ${this.filepath} exit but is not a file`))
        } else {
          loadJSONData()
          resolve()
        }
      } else {
        fs.writeFileSync(this.filepath, '{}', 'utf8')
        loadJSONData()
        resolve()
      }
    })
  }

  async set (path, data) {
    if (path) {
      this.jsondata = set(this.jsondata, path, data)
    } else {
      this.jsondata = data
    }
    if (this.immediateWriting === true) {
      await this.write()
    }
  }

  async clear () {
    await this.set(null, {})
  }

  async write () {
    fs.writeFileSync(
      this.filepath,
      JSON.stringify(this.jsondata, null, this.outputFormatted),
      'utf8'
    )
  }

  async get (path) {
    if (!path) {
      return this.jsondata
    } else {
      return get(this.jsondata, path)
    }
  }
}

module.exports.DBQuery = DBQuery
