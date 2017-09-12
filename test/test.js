const {expect} = require('chai')

describe('Scan Latters', () => {
  it('Humanize Date', () => {
    const {diffHumanize, dateDiffHumanize} = require('../lib/utilTime')

    expect(dateDiffHumanize).to.be.equal(diffHumanize)

    const todayDate = new Date(2017, 9, 10)

    expect(diffHumanize(new Date(2016, 8, 10), todayDate)).to.be.equal('one year')
    expect(diffHumanize(new Date(2015, 8, 10), todayDate)).to.be.equal('2 years')
    expect(diffHumanize(new Date(2017, 8, 10), todayDate)).to.be.equal('one month')
    expect(diffHumanize(new Date(2017, 7, 10), todayDate)).to.be.equal('2 months')
    expect(diffHumanize(new Date(2017, 9, 9), todayDate)).to.be.equal('one day')
    expect(diffHumanize(new Date(2017, 9, 8), todayDate)).to.be.equal('2 days')
    expect(diffHumanize(new Date(2017, 9, 9, 23), todayDate)).to.be.equal('one hour')
    expect(diffHumanize(new Date(2017, 9, 9, 22), todayDate)).to.be.equal('2 hours')
    expect(diffHumanize(new Date(2017, 9, 9, 23, 59), todayDate)).to.be.equal('one minute')
    expect(diffHumanize(new Date(2017, 9, 9, 23, 58), todayDate)).to.be.equal('2 minutes')
    expect(diffHumanize(new Date(2017, 9, 9, 23, 59, 59), todayDate)).to.be.equal('one second')
    expect(diffHumanize(new Date(2017, 9, 9, 23, 59, 58), todayDate)).to.be.equal('2 seconds')
    expect(diffHumanize(new Date(2017, 9, 10), todayDate)).to.be.equal('now')
  })
})
