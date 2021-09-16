const UserSignOut = (props) => {
  const redirect = () => {
    props.history.push('/')
  }
  redirect()
  return null
}

export default UserSignOut