import React, { useState } from 'react'
import loginService from '../services/login'

const LoginForm = ({ blogService, setUser, notifyWith, setNotification }) => {

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notifyWith('wrong credentials', 'error')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }
  
  return(
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          />

      </div>
      <button type="submit">login</button>
    </form>
  )      
}

  export default LoginForm
