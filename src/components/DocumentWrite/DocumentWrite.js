const React = require('react')
const {default:styled} = require('styled-components')

const Container = styled.div`
  height: 70px;
  border-bottom: solid 1px #C4C4C4;
`

const Title = styled.h3`
  padding: 0px;
  margin: 0px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  font-size: 24px;

  color: #515151;

  padding-top: 10px;
  padding-left: 16px;
`

const DocumentWrite = ({title}) => <Container>
  <Title>{title}</Title>
</Container>

module.exports.DocumentWrite = DocumentWrite
