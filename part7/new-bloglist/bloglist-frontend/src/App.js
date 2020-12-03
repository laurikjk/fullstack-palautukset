import React, { useEffect, useRef } from 'react'
import Notification from './components/Notifcation'
import BlogForm from './components/BlogForm'
import LoggedIn from './components/LoggedIn'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { loggedIn } from './reducers/userReducer'

const App = () => {

  const user = useSelector(state => {
    return state.user
  })

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(loggedIn(user))
    }
  }, [dispatch])

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
        />
      </div>
    )
  }

  

  return (
    <div>
      <LoggedIn />

      <Notification />

      {blogForm()}

      <h2>blogs</h2>

      <BlogList />

    </div>
  )
}


export default App