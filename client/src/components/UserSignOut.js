const UserSignOut = (props) => {
  const redirect = () => {
    props.context.actions.signOut()
    props.history.push('/')
  }
  redirect()
  return null
}

export default UserSignOut