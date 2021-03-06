import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Consumer } from './Context'

// our private route that protects the sensitive portions of the app such as creating courses and updating courses
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      { context => {
        return (
        <Route
          {...rest}
          render={props => context.authenticatedUser ? (
            <Component {...props} />
          ) : (
            <Redirect to={{
              pathname: '/signin',
              state: { from: props.location }
            }} />
          )}
        />
      )}}
    </Consumer>
  )
}

export default PrivateRoute