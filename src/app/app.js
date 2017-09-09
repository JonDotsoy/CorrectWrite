const React = require('react')
const {Router, RouterManager} = require('../router')
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

class App extends React.Component {
  render () {
    let con = /dsa/ig
    return (
      <RouterManager>
        <Router hash={/^\/p\/(.+)$/i} component={Page}></Router>
        <Router hash={/^$/i} component={Home}></Router>
        <Router default component={NotFound}/>
      </RouterManager>
    )
  }
}

module.exports = App
