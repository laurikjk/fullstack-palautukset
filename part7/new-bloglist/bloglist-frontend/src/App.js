import React, { useState, useEffect, useRef } from 'react'
import Notification from './components/Notifcation'
import BlogForm from './components/BlogForm'
import LoggedIn from './components/LoggedIn'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import { useDispatch } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'

const App = () => {
  const [ user, setUser ] = useState(null)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const blogForm = () => {
    return(
      <Togglable
        showButtonLabel="new blog"
        showid="show-button"
        hideButtonLabel="cancel"
        ref={blogFormRef}
      >
        <BlogForm
          blogFormRef={blogFormRef}
        />
      </Togglable>
    )
  }

  if (user === null) {
    return(
      <div>
        <Notification />

        <LoginForm
          blogService={blogService}
          setUser={setUser}
        />
      </div>
    )
  }

  

  return (
    <div>
      <LoggedIn
        user={user}
      />

      <Notification />

      {blogForm()}

      <h2>blogs</h2>

      <BlogList />

    </div>
  )
}

export default App