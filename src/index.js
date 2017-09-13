const React = require('react')
const {getHashLocation} = require('./router')
const ReactDOM = require('react-dom')
const {App} = require('./app/app')
const {reducer} = require('./reducer')
const {createStore} = require('redux')
const {connect, Provider} = require('react-redux')

const store = createStore(reducer, {
  docsList: [ 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9' ],
  docs: {
    'a1': { id: 'a1', title: 'Write 0', lastEdit: new Date(2017, 8, 11, 24, 60 - 20, 60, 1000), content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta volutpat lorem, vehicula condimentum metus blandit at. Ut in ante finibus, suscipit magna sed, malesuada velit. Morbi feugiat libero at diam consectetur suscipit. Sed nec purus tempus, malesuada urna sit amet, ultrices arcu. Praesent consectetur eros id enim congue sollicitudin. Mauris quis nisl eget magna venenatis molestie. Quisque eros eros, molestie id tincidunt in, varius nec lacus.\n\nProin vulputate metus pellentesque ligula imperdiet semper. Proin varius leo velit, eget feugiat neque pretium non. Sed quis risus ornare, sollicitudin turpis non, volutpat est. Sed facilisis ut mauris ut placerat. Phasellus congue dui eu odio placerat vehicula. Curabitur finibus, odio vitae imperdiet venenatis, justo purus rhoncus nulla, varius hendrerit enim lectus ac orci. Ut urna diam, ultricies vel tincidunt et, fringilla ac felis. Mauris elementum euismod nulla, eu maximus eros porttitor eu. Quisque tortor lorem, dapibus sit amet dui et, egestas hendrerit justo. Mauris nulla mi, posuere eget posuere ut, luctus nec ex. Quisque at egestas velit. Nunc faucibus hendrerit neque vel efficitur.' },
    'a2': { id: 'a2', title: 'Lorem ipsum dolor sit', lastEdit: new Date(2017, 8, 11, 24 - 1, 60, 60, 1000), content: '' },
    'a3': { id: 'a3', title: 'Consectetur adipiscing elit. Lorem ipsum dolor sit, Sit amet vehicula ligula.', lastEdit: new Date(2017, 8, 11, 24 - 2, 60, 60, 1000), content: '' },
    'a4': { id: 'a4', title: 'Mauris sit', lastEdit: new Date(2017, 7, 10, 24, 60, 60, 1000), content: '' },
    'a5': { id: 'a5', title: 'Amet pharetra eros', lastEdit: new Date(2017, 7, 10, 24, 60, 60, 1000), content: '' },
    'a6': { id: 'a6', title: 'Sit amet vehicula ligula.', lastEdit: new Date(2016, 6, 10, 24, 60, 60, 1000), content: '' },
    'a7': { id: 'a7', title: 'Vestibulum tristique', lastEdit: new Date(2016, 8, 11, 24, 60, 60, 1000), content: '' },
    'a8': { id: 'a8', title: 'Justo', lastEdit: new Date(2016, 6, 10, 24, 60, 60, 1000), content: '' },
    'a9': { id: 'a9', title: 'Class aptent taciti', lastEdit: new Date(2015, 8, 11, 24, 60, 60, 1000), content: '' }
  },
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.querySelector('#app')
)
