import React, { useState } from 'react'
import Cookies from 'js-cookie'
import Data from './Data'

const Context = React.createContext()
export const Consumer = Context.Consumer

export const Provider = (props) => {

  const cookie = Cookies.get('authenticatedUser')
  const [authenticatedUser, setAuthenticatedUser] = useState(cookie ? JSON.parse(cookie) : null)
  const [hashedPassword, setHashedPassword] = useState('')
  const data = new Data()

  const signIn = async (username, password) => {
    const user = await data.getUser(username, password)
    if (user !== null) {
      setAuthenticatedUser(user)
      setHashedPassword(password)
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 })
    }
  }

  const signOut = () => {
    setAuthenticatedUser(null)
    setHashedPassword(null)
    Cookies.remove('authenticatedUser')
  }

  const value = {
    authenticatedUser,
    hashedPassword,
    actions: {
      signIn,
      signOut
    }
  }

  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider> 
  )
}


/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

 export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}