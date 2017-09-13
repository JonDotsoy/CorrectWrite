const React = require('react')
const {default: styled} = require('styled-components')

const Container = styled.div `
  display: block;
  width: 100%;
  height: 100%;
  flex: 1;
  position: relative;
  overflow: auto;
`

const ShowText = styled.span `
  padding: 30px;
  display: block;
  position: relative;
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  font-size: 20px;

  color: #000000;
`

const TextEditor = ({value}) => (
  <Container>
    <ShowText>{value}</ShowText>
  </Container>
)

module.exports.TextEditor = TextEditor
