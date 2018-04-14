import React, { Component, Fragment } from 'react'

class Home extends Component {
  render () {
    return (<Fragment>
      <h2>This the default route of this example</h2>
      <p>Because of the use of the "switch" element the routes are wrapped in, if a unknown route is in the url it will
        use the "redirect" route type to just send users back here</p>
    </Fragment>)
  }
}

export default Home
