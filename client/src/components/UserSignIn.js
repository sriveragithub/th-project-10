import React, { useState } from 'react'
import { Link } from 'react-router-dom';

// functional sign-in component that submits email and password to the server for sign-in check
const UserSignIn = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // submission function that calls the signIn function from context with credentials to check if this user exists and can authenticate
  const submit = (e) => {
    e.preventDefault()
    props.context.actions.signIn(email, password)
    if (props.history.length < 3) {
      props.history.push('/')
    } else {
      props.history.goBack()
    }
  }

  const cancel = () => {
    props.history.push('/')
  }

  return (
    <main>
      <div className="form--centered">
          <h2>Sign In</h2>
          
          <form onSubmit={submit}>
              <label htmlFor="emailAddress">Email Address</label>
              <input id="emailAddress" name="emailAddress" type="email" onChange={e => {setEmail(e.target.value)}} />
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" onChange={e => {setPassword(e.target.value)}} />
              <button className="button" type="submit">Sign In</button>
              <button className="button button-secondary" onClick={cancel}>Cancel</button>
          </form>
          <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
          
      </div>
    </main>
  )
}

export default UserSignIn