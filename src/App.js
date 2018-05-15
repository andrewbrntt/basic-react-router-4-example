import React, { Component, Fragment } from 'react'
import { Route, Link, Switch, Redirect } from 'react-router-dom'
import Home from './Components/Home.jsx'
import About from './Components/About.jsx'
import PureComponentExample from './Components/PureComponentExample.jsx'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Fragment>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/pureComponentExample'>Pure Component Example</Link></li>
          </ul>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/about/:id' render={(props) => <About {...props} />} />
            <Route exact path='/pureComponentExample' component={PureComponentExample} />
            <Redirect to='/' />
          </Switch>
        </Fragment>
      </div>
    )
  }
}

export default App
