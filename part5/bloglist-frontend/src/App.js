import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notifcation'
import BlogForm from './components/BlogForm'
import LoggedIn from './components/LoggedIn'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [ notification, setNotification ] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
  
  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.clear()
  }

  const handleCreate = event => {
    event.preventDefault()
    const newBlog = 
      {
        title: title,
        author: author,
        url: url,
      }
    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
        notifyWith(`a new blog "${returnedBlog.title}" by ${returnedBlog.author} added`)
        setTimeout(() =>{
          setNotification(null)
        }, 5000)
      })
  }

  

  if (user === null) {
    return(
      <div>
        <Notification notification={notification}/>

        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
    )
  }
  return (
    <div>
      <LoggedIn 
        user={user}
        handleLogout={handleLogout}
      />

      <Notification notification={notification} />
      
      <BlogForm
        title={title}
        author={author}
        url={url}
        setTitle={setTitle}
        setAuthor={setAuthor}
        setUrl={setUrl}
        handleCreate={handleCreate}
      />

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App