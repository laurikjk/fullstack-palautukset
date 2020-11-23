const getId = () => (100000 * Math.random()).toFixed(0)

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const voted = state.find(n => n.id === id)
      const changed = {
        ...voted,
        votes: voted.votes+1
      }
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : changed
      )
    case 'CREATE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state 
  }
}

export const initAnecdotes = (anecdotes) => {
  return{
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'CREATE',
    data: { 
      content: anecdote,
      id: getId(),
      votes: 0
     }
  }
}

export default reducer