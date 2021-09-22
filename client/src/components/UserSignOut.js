import { useEffect } from "react"

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