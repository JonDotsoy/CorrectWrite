const React = require('react')
const {connect} = require('react-redux')
const {NavBar} = require('../components/navbar/navbar')
const {DocumentWrite} = require('../components/DocumentWrite/DocumentWrite')
const {default: styled} = require('styled-components')

const ContainerWritingList = styled.div`
`

const Home = ({writingsList}) => (
  <div>
    <NavBar title='Writings' />
    <ContainerWritingList>
      {
        writingsList
        .map((writing, index) =>
          <DocumentWrite key={index} {...writing} />)
      }
    </ContainerWritingList>
  </div>
)

module.exports.Home = connect(
  store => ({
    writingsList: store
      .writingsList
      .map((writingIndex) => (store.writings[writingIndex]))
  })
)(Home)
