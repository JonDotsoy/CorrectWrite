const React = require('react')
const {NavBar} = require('../components/navbar/navbar')
const {DocumentWrite} = require('../components/DocumentWrite/DocumentWrite')

const Home = () => (
  <div>
    <NavBar title='Writings' />
    <DocumentWrite title='Write 0' lastEdit={new Date()} />
    <DocumentWrite title='Lorem ipsum dolor sit' lastEdit={new Date()} />
    <DocumentWrite title='Consectetur adipiscing elit.' lastEdit={new Date()} />
    <DocumentWrite title='Mauris sit' lastEdit={new Date()} />
    <DocumentWrite title='Amet pharetra eros' lastEdit={new Date()} />
    <DocumentWrite title='Sit amet vehicula ligula.' lastEdit={new Date()} />
    <DocumentWrite title='Vestibulum tristique' lastEdit={new Date()} />
    <DocumentWrite title='Justo' lastEdit={new Date()} />
    <DocumentWrite title='Class aptent taciti' lastEdit={new Date()} />
  </div>
)

module.exports.Home = Home
