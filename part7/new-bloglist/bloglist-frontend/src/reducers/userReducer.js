import loginService from '../services/login'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

const reducer = (state=null, action) => {
  switch (action.type){
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const loginUser = ({ username, password }) => {
  return async dispatch => {
    try {
      const response = await loginService.login({ username, password })
      const user = JSON.stringify(response)
      console.log(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogListUser', user
      )
      dispatch({
        type: 'LOGIN',
        data: user
      })
    } catch (exception) {
      showNotification('wrong credentials', 5)
    }
    
  }
}

export const loggedIn = (user) => {
  return async dispatch => {
    blogService.setToken(user.token)
    console.log('loggedinn user: ',user)
    dispatch({
      type: 'LOGIN',
      data: user
    })
    
  }
}

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.clear()
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default reducer