const React = require('react')
const {NavBar} = require('../components/navbar/navbar')
const {connect} = require('react-redux')

const Page = () => (
  <div>
    <NavBar title='Writings' />
  </div>
)

module.exports.Page = connect(
  state => ({

  })
)(Page)
