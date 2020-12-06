import React, { useEffect, useRef } from 'react'
import Notification from './components/Notifcation'
import BlogForm from './components/BlogForm'
import LoggedIn from './components/LoggedIn'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import Users from './components/Users'
import User from './components/User'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { loggedIn } from './reducers/userReducer'
import { initUsers } from './reducers/usersReducer'
import { Route, Switch, useRouteMatch } from 'react-router-dom'


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

  const blogFormRef = useRef()

  const match = useRouteMatch('/users/:id')
  const matchedUser = match 
    ? users.find(u =>  u.id === match.params.id)
    : null


    console.log('matcheduser: ', matchedUser)

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
    <div>
      <LoggedIn />
      <Switch>
        <Route path="/users/:id">
          <User user={matchedUser} />
        </Route>
        <Route path="/users">
          <div>
            <Users />
          </div>
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