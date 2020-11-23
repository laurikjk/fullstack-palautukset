
const reducer = (state = '', action) => {
  console.log('state now: ', state)
  console.log('action', action)

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
  return({
    type: 'SHOW_NOTIFICATION',
    data: message
  })
}


export default reducer