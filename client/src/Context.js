import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const Context = React.createContext()
export const Consumer = Context.Consumer

export const Provider = (props) => {

  const cookie = Cookies.get('authenticatedUser')
  const [authenticatedUser, setAuthenticatedUser] = useState(cookie ? JSON.parse(cookie) : null)
  const [hashedPassword, setHashedPassword] = useState('')
  

  const api = (path, method = 'GET', body = null, requiresAuth = false, credentials = null) => {
    const url = `http://localhost:5000` + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`)
      options.headers['Authorization'] = `Basic ${encodedCredentials}`
    }

    return axios(url, options);
  }

  const signIn = async (username, password) => {
    const res = await api(`/api/users`, 'GET', null, true, {username, password})
    if (res.status === 200) {
      console.log(res)
      const user = res.data
      if (user !== null) {
        setAuthenticatedUser(user)
        setHashedPassword(password)
        Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 })
      }
      return user
    } else if (res.status === 401) {
      return null
    } else {
      throw new Error()
    }
  }

  const signUp = async (user) => {
    console.log(user)

    const res = await axios.post(`http://localhost:5000/api/users`,
    user,
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      }
    })
    console.log(res)

    if (res.status === 201) {
      return []
    } else if (res.status === 400) {
      return res.json().then(data => {
        console.log(data.errors)
        return data.errors
      })
    } else {
      throw new Error()
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
      signOut,
      signUp
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