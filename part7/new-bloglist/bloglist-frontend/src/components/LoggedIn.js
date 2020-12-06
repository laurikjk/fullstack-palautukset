import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'

const LoggedIn = () => {

  const user = useSelector(state => state.user)

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.clear()
  }

  return(
      <form onSubmit={handleLogout}>
        {user.name} logged in
        <Button type="submit">logout</Button>
      </form>
  )
}

export default LoggedIn