
const reducer = (state = {message: '', timer: null}, action) => {
  console.log('notification state now: ', state)
  console.log('notification action', action)

  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      if (state.timer !== null) {
        clearTimeout(state.timer)
      }
      return {
        message: action.data.message,
        timer: action.data.timer
      }
    case 'HIDE_NOTIFICATION':
      return {
        message: '',
        timer: null
      }
    default: 
      return state
  }
}

export const showNotification = (message, durationInSec) => {
  return async dispatch => {
    const milliseconds = durationInSec * 1000
    const timer = setTimeout(() => {
        dispatch(hideNotification())
    }, milliseconds)
    dispatch({
        type: 'SHOW_NOTIFICATION',
        data: {
            message,
            timer
        }
    })
}
}

export const hideNotification = () => {
  return{
    type: 'HIDE_NOTIFICATION'
  }
}


export default reducer