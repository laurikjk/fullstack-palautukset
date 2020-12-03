import React, { useState } from 'react'
import { connect } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/userReducer'

const LoginForm = ({ blogService, setUser, showNotification, loginUser }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      loginUser({ username, password })
      setUsername('')
      setPassword('')
    } catch (exception) {
      showNotification('wrong credentials', 5)
    }
  }

  return(
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          id="username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          id="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />

      </div>
      <button type="submit" id="login-button">login</button>
    </form>
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
