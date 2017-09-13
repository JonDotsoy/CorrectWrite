
// const { Router, Route, hashHistory } = require('react-router')
const React = require('react')
const {DocList} = require('../DocList/DocList')
const {DocEditor} = require('../DocEditor/DocEditor')
const {NotFound} = require('../notFound/notFound')
const {injectGlobal} = require('styled-components')

const {HashRouter: Router, Route, Switch} = require('react-router-dom')

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto');
  @import url('https://fonts.googleapis.com/css?family=Roboto+Slab:300,400');
  body {
    margin: 0px;
    padding: 0px;
  }
`

const App = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={DocList} />
      <Route exact path='/p/:idDoc' component={DocEditor} />
      <Route component={NotFound} />
    </Switch>
  </Router>
)

module.exports.App = App
