
const set = require('lodash/set')
const get = require('lodash/get')
const fs = require('fs')

class DBQuery {
  constructor (filepath) {
    this.filepath = filepath
    this.jsondata = JSON.parse(fs.readFileSync(this.filepath))
  }

  async _ready () {
    return true
  }

  get ready () {
    return this._ready()
  }

  async set (path, data) {
    fs.writeFileSync(this.filepath, (JSON.stringify(this.jsondata = set(this.jsondata, path, data), null, null)))
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
