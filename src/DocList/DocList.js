const React = require('react')
const {connect} = require('react-redux')
const {Navbar} = require('../components/Navbar/Navbar')
const {DocumentWrite} = require('../components/DocumentWrite/DocumentWrite')
const {default: styled} = require('styled-components')

const ContainerWritingList = styled.div`
`

const DocList = ({docsList}) => (
  <div>
    <Navbar title='Writings' />
    <ContainerWritingList>
      {
        docsList
        .map((doc, idDoc) =>
          <DocumentWrite key={idDoc} {...doc} />)
      }
    </ContainerWritingList>
  </div>
)

module.exports.DocList = connect(
  (state, props) => ({
    docsList: state
      .docsList
      .map((docIndex) => (state.docs[docIndex]))
  })
)(DocList)
