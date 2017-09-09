const {expect} = require('chai')

describe('Scan Latters', () => {
  it('Humanize Date', () => {
    const moment = require('moment')

    function dateDiffHumanize(date, fromDate) {
      const diffYears = moment(fromDate).diff(date, 'year')
      const diffMonths = moment(fromDate).diff(date, 'month')
      const diffDays = moment(fromDate).diff(date, 'day')
      const diffHours = moment(fromDate).diff(date, 'hour')
      const diffMinutes = moment(fromDate).diff(date, 'minutes')
      const diffSeconds = moment(fromDate).diff(date, 'seconds')

      const sufix = 'days'

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

    const todayDate = new Date(2017, 9, 10)

    expect(dateDiffHumanize(new Date(2016, 8, 10), todayDate)).to.be.equal('one year')
    expect(dateDiffHumanize(new Date(2015, 8, 10), todayDate)).to.be.equal('2 years')
    expect(dateDiffHumanize(new Date(2017, 8, 10), todayDate)).to.be.equal('one month')
    expect(dateDiffHumanize(new Date(2017, 7, 10), todayDate)).to.be.equal('2 months')
    expect(dateDiffHumanize(new Date(2017, 9, 9), todayDate)).to.be.equal('one day')
    expect(dateDiffHumanize(new Date(2017, 9, 8), todayDate)).to.be.equal('2 days')
    expect(dateDiffHumanize(new Date(2017, 9, 9, 23), todayDate)).to.be.equal('one hour')
    expect(dateDiffHumanize(new Date(2017, 9, 9, 22), todayDate)).to.be.equal('2 hours')
    expect(dateDiffHumanize(new Date(2017, 9, 9, 23, 59), todayDate)).to.be.equal('one minute')
    expect(dateDiffHumanize(new Date(2017, 9, 9, 23, 58), todayDate)).to.be.equal('2 minutes')
    expect(dateDiffHumanize(new Date(2017, 9, 9, 23, 59, 59), todayDate)).to.be.equal('one second')
    expect(dateDiffHumanize(new Date(2017, 9, 9, 23, 59, 58), todayDate)).to.be.equal('2 seconds')
    expect(dateDiffHumanize(new Date(2017, 9, 10), todayDate)).to.be.equal('now')
  })
})