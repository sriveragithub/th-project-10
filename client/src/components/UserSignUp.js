import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Data from '../Data'

const UserSignUp = (props) => {

  const data = new Data()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  const submit = (e) => {
    e.preventDefault()
    const user = {
      firstName,
      lastName,
      emailAddress,
      password
    }
    data.createUser(user)
      .then(errors => {
        if (errors.length) {
          setErrors(errors)
        } else {
          props.context.actions.signIn(user.emailAddress, user.password)
            .then(() => {
              props.history.push('/')
            })
        }
      })

  }

  const cancel = () => {
    props.history.push('/')
  }

  return (
    <main>
        <div className="form--centered">
            <h2>Sign Up</h2>
            
            <form onSubmit={submit}>

                {
                  errors.length
                  ? <div className="validation--errors">
                      <h3>Validation Errors</h3>
                      <ul>
                        {
                          errors.map((err, i) => {
                            return <li key={i}>{err}</li>
                          })
                        }
                      </ul>
                    </div>
                  : null
                }

                <label htmlFor="firstName">First Name</label>
                <input id="firstName" name="firstName" type="text" onChange={e => {setFirstName(e.target.value)}} />
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" name="lastName" type="text" onChange={e => {setLastName(e.target.value)}} />
                <label htmlFor="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" type="email" onChange={e => {setEmailAddress(e.target.value)}} />
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" onChange={e => {setPassword(e.target.value)}} />
                <button className="button" type="submit">Sign Up</button>
                <button className="button button-secondary" onClick={cancel}>Cancel</button>
            </form>
            <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
        </div>
    </main>
  )
}

export default UserSignUp