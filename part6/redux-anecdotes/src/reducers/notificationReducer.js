
const reducer = (state = {message: '', timer: null}, action) => {
  console.log('notification state now: ', state)
  console.log('notification action', action)

  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return {
        message: action.data.message
      }
    case 'HIDE_NOTIFICATION':
      return {
        message: ''
      }
    default: 
      return state
  }
}

export const showNotification = (message) => {
  return{
    type: 'SHOW_NOTIFICATION',
    data: { 
      message: message}
  }
}

export const hideNotification = () => {
  return{
    type: 'HIDE_NOTIFICATION'
  }
}


export default reducer