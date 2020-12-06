import React from 'react'
import { useSelector } from 'react-redux'
import { Form } from 'react-bootstrap'
import styled from 'styled-components'

const LoggedIn = () => {

  const user = useSelector(state => state.user)

  const Button = styled.button`
    background: red;
    font-size: 1em;
    border: 2px solid light red;
  `
  const padding = {
    padding: 10
  }

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.clear()
  }

  return(
      <Form onSubmit={handleLogout}>
        <Form.Label style={padding}>{user.name} logged in</Form.Label>
        <Button type="submit">logout</Button>
      </Form>
  )
}

export default LoggedIn