const React = require('react')
const {default: styled} = require('styled-components')

const inlineSvgArrowBack = (color) => `<svg xmlns="http://www.w3.org/2000/svg" fill="${color}" height="24" viewBox="0 0 24 24" width="24"><path d="M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20v-2z"/></svg>`

const Container = styled.div`
  background: #FFFFFF;
  height: 56px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.24), 0px 0px 4px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: row;
`

const TitleCompContainer = styled.div `
`

const TitleComp = styled.h1`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  line-height: 56px;
  font-size: 20px;
  padding: 0px;
  margin: 0px;
  margin-left: 16px;
  padding-right: 16px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  color: rgba(0, 0, 0, 0.87);
`

const ContainerBTNBack = styled.div`
  padding: 16px;
`

const BTNBack = styled.button`
  border: none;
  display: block;
  background-color: transparent;
  background-image: url('data:image/svg+xml;utf8,${inlineSvgArrowBack('#757575')}');
  color: #757575;
  width: 24px;
  height: 24px;
`

const Navbar = ({title, onClickBack}) => (
  <Container>
    {onClickBack && (
      <ContainerBTNBack>
        <BTNBack onClick={onClickBack} />
      </ContainerBTNBack>
    )}
    <TitleComp title={title}>{title}</TitleComp>
  </Container>
)

module.exports.Navbar = Navbar
