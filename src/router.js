const React = require('react')

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

    this.state = {
      hash: this.localhash
    }
  }

  get localhash () {
    return location.hash.replace(/^#?/, '')
  }

  componentWillMount () {
    window.addEventListener("hashchange", this.handleChangeHash, false);
  }

  handleChangeHash = (event) => {
    this.setState({hash: this.localhash})
  }

  render () {
    const state = this.state
    const props = this.props

    const DefaultRouter = props.children.find(
      routerCpnt => (routerCpnt.props.default === true)
    )

    const SelectableRouter = props.children.find(
      routerCpnt => (routerCpnt.props.hash && (routerCpnt.props.hash instanceof RegExp) && routerCpnt.props.hash.test(state.hash) === true)
    )

    if (SelectableRouter) return SelectableRouter
    return DefaultRouter
  }
}

module.exports.Router = Router
module.exports.RouterManager = RouterManager
