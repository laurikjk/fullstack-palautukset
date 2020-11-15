import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notifcation'
import BlogForm from './components/BlogForm'
import LoggedIn from './components/LoggedIn'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import Togglable from './components/Togglable'


const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ notification, setNotification ] = useState(null)
  const [ user, setUser ] = useState(null)

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

  const blogFormRef = useRef()

  const blogForm = () => {
    return(
      <Togglable 
        showButtonLabel="new blog" 
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

  const blogInfoRef = useRef()

  const blogInfo = () => {

    const blogStyle = {
      paddingBottom:2,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const bloglist = blogs.map(blog =>
      <div style={blogStyle}>
      <Togglable showButtonLabel="info" 
                 hideButtonLabel="hide" 
                 beforeVisible={blog.title}
                 ref={blogInfoRef}>
        <Blog key={blog.id} blog={blog} blogInfoRef={blogInfoRef} />
      </Togglable>
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
      {blogInfo()}
    </div>
  )
}

export default App