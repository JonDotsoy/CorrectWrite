const React = require('react')
const {getHashLocation} = require('./router')
const ReactDOM = require('react-dom')
const {App} = require('./app/app')
const {reducer} = require('./reducer')
const {createStore} = require('redux')
const {connect, Provider} = require('react-redux')

const store = createStore(reducer, {
  hashLocation: getHashLocation(),
  writingsList: [ 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9' ],
  writings: {
    'a1': { id: 'a1', title: 'Write 0', lastEdit: new Date(2017, 8, 11, 24, 60 - 20, 60, 1000) },
    'a2': { id: 'a2', title: 'Lorem ipsum dolor sit', lastEdit: new Date(2017, 8, 11, 24 - 1, 60, 60, 1000) },
    'a3': { id: 'a3', title: 'Consectetur adipiscing elit.', lastEdit: new Date(2017, 8, 11, 24 - 2, 60, 60, 1000) },
    'a4': { id: 'a4', title: 'Mauris sit', lastEdit: new Date(2017, 7, 10, 24, 60, 60, 1000) },
    'a5': { id: 'a5', title: 'Amet pharetra eros', lastEdit: new Date(2017, 7, 10, 24, 60, 60, 1000) },
    'a6': { id: 'a6', title: 'Sit amet vehicula ligula.', lastEdit: new Date(2016, 6, 10, 24, 60, 60, 1000) },
    'a7': { id: 'a7', title: 'Vestibulum tristique', lastEdit: new Date(2016, 8, 11, 24, 60, 60, 1000) },
    'a8': { id: 'a8', title: 'Justo', lastEdit: new Date(2016, 6, 10, 24, 60, 60, 1000) },
    'a9': { id: 'a9', title: 'Class aptent taciti', lastEdit: new Date(2015, 8, 11, 24, 60, 60, 1000) }
  },
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.querySelector('#app')
)
