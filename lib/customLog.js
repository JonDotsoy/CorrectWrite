const chalk = require('chalk')

module.exports = function CustomLog (strParts, ...args) {
  if (Array.isArray(strParts)) {
    let outstr = ''

    strParts.forEach((str, index) => {
      const value = args[index]

      outstr += str

      if (strParts.length !== index + 1) {
        outstr += (() => {
          if (Array.isArray(value)) {
            return chalk.grey(JSON.stringify(value, null, 4))
          } else if (typeof value === 'number') {
            return chalk.cyan(value)
          } else if (typeof value === 'boolean') {
            return chalk.cyan(JSON.stringify(value))
          } else if (typeof value === 'string') {
            return chalk.green(JSON.stringify(value))
          } else if (typeof value === 'object') {
            return chalk.grey(JSON.stringify(value, null, 4))
          } else {
            return value
          }
        })()
      }
    })

    console.log(outstr)
  } else {
    console.log(strParts, ...args)
  }
}
