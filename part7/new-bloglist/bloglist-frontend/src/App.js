import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

// components
import Notification from './components/Notifcation'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import NavigationMenu from './components/NavigationMenu'

// reducers
import { initBlogs } from './reducers/blogReducer'
import { loggedIn } from './reducers/userReducer'
import { initUsers } from './reducers/usersReducer'



const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(loggedIn(user))
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initUsers())
  }, [dispatch])

  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  const blogFormRef = useRef()

  const userMatch = useRouteMatch('/users/:id')
  const matchedUser = userMatch 
    ? users.find(u =>  u.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const matchedBlog = blogMatch 
    ? blogs.find(b => b.id === blogMatch.params.id)
    : null


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
        <LoginForm />
      </div>
    )
  }

  return (
    <div className="container">
      <NavigationMenu />
      <Switch>
        <Route path="/users/:id">
          <User user={matchedUser} />
        </Route>
        <Route path="/users">
          <div>
            <Users />
          </div>
        </Route>
        <Route path="/blogs/:id">
          <Blog blog={matchedBlog} />
        </Route>
        <Route path="/">
          <div>
            <Notification />
            {blogForm()}
            <h2>blogs</h2>
            <BlogList />
          </div>
        </Route>
      </Switch>
    </div>
  )
}


export default App