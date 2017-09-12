const React = require('react')
const {connect} = require('react-redux')

class Router extends React.Component {
  render () {
    const props = this.props
    const ChildComponent = props.component

    if (ChildComponent) {
      return <ChildComponent />
    } else {
      return null
    }
  }
}

class RouterManager extends React.Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
    window.addEventListener("hashchange", this.handleChangeHash, false);
  }

  handleChangeHash = (event) => {
    this.props.updateHashLocation(getHashLocation())
  }

  render () {
    const state = this.state
    const props = this.props

    const DefaultRouter = props.children.find(
      routerCpnt => (routerCpnt.props.default === true)
    )

    const SelectableRouter = props.children.find(
      routerCpnt => (routerCpnt.props.hash && (routerCpnt.props.hash instanceof RegExp) && routerCpnt.props.hash.test(props.hashLocation) === true)
    )

    if (SelectableRouter) return SelectableRouter
    return DefaultRouter
  }
}

module.exports.Router = connect()(Router)
module.exports.RouterManager = connect(
  store => ({hashLocation: getHashLocation()}),
  dispatch => ({
    updateHashLocation: (hashLocation) => {
      dispatch({
        type: 'UpdateHashLocation',
        hashLocation,
      })
    }
  }),
)(RouterManager)

function getHashLocation () {
  return location.hash.replace(/^#?/, '')
}
