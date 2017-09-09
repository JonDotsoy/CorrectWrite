const React = require('react')
const {default:styled} = require('styled-components')

const Container = styled.div`
  background: #FFFFFF;
  height: 56px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.24), 0px 0px 4px rgba(0, 0, 0, 0.12);
`

const TitleComp = styled.h1`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  line-height: 56px;
  font-size: 20px;
  padding: 0px;
  margin: 0px;
  margin-left: 72px;

  color: rgba(0, 0, 0, 0.87);
`

const NavBar = ({title}) => (
  <Container>
    <TitleComp>{title}</TitleComp>
  </Container>
)

module.exports.NavBar = NavBar