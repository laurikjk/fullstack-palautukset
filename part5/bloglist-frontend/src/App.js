import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notifcation'
import BlogForm from './components/BlogForm'
import LoggedIn from './components/LoggedIn'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [ notification, setNotification ] = useState(null)
  const [user, setUser] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

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

  const blogForm = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }
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
      
      <BlogForm
        blogs={blogs}
        setBlogs={setBlogs}
        notifyWith={notifyWith}
        setNotification={setNotification}
        blogService={blogService}
      />

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App