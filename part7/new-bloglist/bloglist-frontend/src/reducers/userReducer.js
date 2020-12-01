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

export const logoutUser = () => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default reducer