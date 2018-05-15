import React, { Component, Fragment } from 'react'

class About extends Component {

  constructor (props) {
    super(props)
    console.log(props)
  }

  render () {
    return (<Fragment>
      <p>This is a very basic example showing how to use React Router 4. I will eventually add an example of this with
        Redux</p>
      <a href='https://reacttraining.com/react-router/web/guides/basic-components'>These are the React Router 4
        documents</a>
      <p>I may also add an example of how to do component testing with React Router 4</p>
    </Fragment>)
  }
}

export default About
