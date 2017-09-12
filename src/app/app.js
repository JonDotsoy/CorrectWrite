const { Router, Route, hashHistory } = require('react-router')
const React = require('react')
const {Home} = require('../home/home')
const {Page} = require('../page/page')
const {NotFound} = require('../notFound/notFound')
const {injectGlobal} = require('styled-components')

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto');
  body {
    margin: 0px;
    padding: 0px;
  }
`

const App = () => (
  <Router history={hashHistory}>
    <Route path='/p/:id' component={Page} />
    <Route path='/' component={Home} />
    {/*<Route default component={NotFound} />*/}
  </Router>
)

module.exports.App = App
