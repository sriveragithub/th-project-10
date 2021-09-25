import { useEffect } from "react"

// function that signs a user out by calling the signOut context function and pushes them back to home
const UserSignOut = (props) => {
  useEffect(() => {
    const redirect = () => {
      props.context.actions.signOut()
      props.history.push('/')
    }
    redirect()
  }, [props.context.actions, props.history])
  return null
}

export default UserSignOut