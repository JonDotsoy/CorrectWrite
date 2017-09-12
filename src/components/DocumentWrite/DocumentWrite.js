const React = require('react')
const {diffHumanize} = require('../../../lib/utilTime')
const {default:styled} = require('styled-components')

const Container = styled.a`
  display: block;
  height: 70px;
  border-bottom: solid 1px #C4C4C4;
  text-decoration: none;
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
  padding-rigth: 16px;
`

const LabelDate = styled.span `
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  font-size: 18px;

  color: #676767;

  padding-top: 10px;
  padding-left: 16px;
  padding-rigth: 16px;
`

const today = new Date(2017, 8, 11, 24, 60, 60, 1000)

const DocumentWrite = ({id, title, lastEdit}) => <Container href={`#!/p/${id}`}>
  <Title>{title}</Title>
  <LabelDate>Last edit {diffHumanize(lastEdit, today)} ago</LabelDate>
</Container>

module.exports.DocumentWrite = DocumentWrite
