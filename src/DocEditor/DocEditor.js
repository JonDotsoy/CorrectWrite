const React = require('react')
const {Redirect} = require('react-router-dom')
const {TextEditor} = require('../components/TextEditor/TextEditor')
const {Navbar} = require('../components/Navbar/Navbar')
const {connect} = require('react-redux')
const {default: styled} = require('styled-components')

const Container = styled.div `
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  position: relative;
`

const DocEditor = ({doc, history}) => (
  <Container>
    <Navbar title={doc.title} onClickBack={() => history.push('/')} />
    <TextEditor value={doc.content} />
  </Container>
)

module.exports.DocEditor = connect(
  (state, props) => ({
    doc: state.docs[props.match.params.idDoc]
  })
)(DocEditor)
