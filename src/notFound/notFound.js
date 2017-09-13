const React = require('react')
const {Link} = require('react-router-dom')

const NotFound = ({location}) => (
  <div>
    <div>
      <h1>
        Not Found <strong>{location.pathname}</strong>
      </h1>
      <div>Go to <Link to='/'>home</Link>.</div>
    </div>
  </div>
)

module.exports.NotFound = NotFound
