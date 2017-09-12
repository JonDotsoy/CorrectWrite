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
      routerCpnt => (routerCpnt.props.path && (routerCpnt.props.path instanceof RegExp) && routerCpnt.props.path.test(props.hashLocation) === true)
    )

    if (SelectableRouter) return SelectableRouter
    return DefaultRouter || null
  }
}

module.exports.Router = connect()(Router)
module.exports.RouterManager = connect(
  state => ({hashLocation: state.hashLocation || getHashLocation()}),
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
  return location.hash.replace(/^#?!?/, '')
}


module.exports.getHashLocation = getHashLocation