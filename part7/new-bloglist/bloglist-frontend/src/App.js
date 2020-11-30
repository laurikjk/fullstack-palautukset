import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
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
  const [ blogs, setBlogs ] = useState([])
  const [ notification, setNotification ] = useState(null)
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

  const notifyWith = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

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
          blogs={blogs}
          setBlogs={setBlogs}
          notifyWith={notifyWith}
          setNotification={setNotification}
          blogService={blogService}
          blogFormRef={blogFormRef}
        />
      </Togglable>
    )
  }



  const blogInfo = () => {

    const blogStyle = {
      background: 'white',
      border: 'solid',
      borderWidth: 1,
      color: 'black'
    }

    const sortByLikes = (a, b) => {
      return b.likes - a.likes
    }
    const sortedBlogs = blogs.sort(sortByLikes)

    const bloglist = sortedBlogs.map(blog =>
      <div style={blogStyle} key={blog.id}>
        <Blog
          key={blog.id}
          blog={blog}
          setBlogs={setBlogs}
          blogs={blogs}
        />
      </div>
    )
    return(
      bloglist
    )
  }

  if (user === null) {
    return(
      <div>
        <Notification notification={notification}/>

        <LoginForm
          blogService={blogService}
          setUser={setUser}
          notifyWith={notifyWith}
          setNotification={setNotification}
        />
      </div>
    )
  }

  

  return (
    <div>
      <LoggedIn
        user={user}
      />

      <Notification notification={notification} />

      {blogForm()}

      <h2>blogs</h2>

      <BlogList />

    </div>
  )
}

export default App