import React, { useState } from 'react'
import { connect } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/userReducer'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ showNotification, loginUser }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
      loginUser({ username, password })
      setUsername('')
      setPassword('')
  }

  return(
    <div className="container">
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            id="username"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />

        </Form.Group>
        <Button type="submit" id="login-button">login</Button>
      </Form>
    </div>
  )
}

const mapStateToProps = () => {
  return {
  }
}

const mapDispatchToProps = {
  showNotification,
  loginUser
}

const ConnectedLoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)

export default ConnectedLoginForm
