const moment = require('moment')

function dateDiffHumanize (date, fromDate) {
  const diffYears = moment(fromDate).diff(date, 'year')
  const diffMonths = moment(fromDate).diff(date, 'month')
  const diffDays = moment(fromDate).diff(date, 'day')
  const diffHours = moment(fromDate).diff(date, 'hour')
  const diffMinutes = moment(fromDate).diff(date, 'minutes')
  const diffSeconds = moment(fromDate).diff(date, 'seconds')

  if (diffYears === 1) {
    return 'one year'
  } else if (diffYears > 0) {
    return `${diffYears} years`
  } else if (diffMonths === 1) {
    return `one month`
  } else if (diffMonths > 0) {
    return `${diffMonths} months`
  } else if (diffDays === 1) {
    return `one day`
  } else if (diffDays > 0) {
    return `${diffDays} days`
  } else if (diffHours === 1) {
    return `one hour`
  } else if (diffHours > 0) {
    return `${diffHours} hours`
  } else if (diffMinutes === 1) {
    return `one minute`
  } else if (diffMinutes > 0) {
    return `${diffMinutes} minutes`
  } else if (diffSeconds === 1) {
    return `one second`
  } else if (diffSeconds > 0) {
    return `${diffSeconds} seconds`
  } else {
    return `now`
  }
}

module.exports.dateDiffHumanize = dateDiffHumanize
module.exports.diffHumanize = dateDiffHumanize
