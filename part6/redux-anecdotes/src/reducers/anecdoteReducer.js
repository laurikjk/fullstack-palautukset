
import anecdoteService from '../services/anecdotes'

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
      const list = state.map(anecdote => 
        anecdote.id !== id ? anecdote : changed
      )
      return list.sort((a,b) => b.votes - a.votes)
    case 'CREATE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state 
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes.sort((a, b) => b.votes - a.votes)
    })
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const beforeVote = await anecdoteService.getOne(id)
    console.log(beforeVote)
    const votedAnecdote = { ...beforeVote, votes: beforeVote.votes + 1 }
    await anecdoteService.updateVotes(votedAnecdote)

    dispatch({
      type: 'VOTE',
      data: votedAnecdote
    })
  }
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export default reducer