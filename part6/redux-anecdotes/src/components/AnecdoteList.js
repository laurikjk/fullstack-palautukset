import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    const list = state.anecdotes.sort((a,b) => b.votes - a.votes)
    return list
  })

  const dispatch = useDispatch()

  const vote = (id, anecdote) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
    dispatch(showNotification(`you voted '${anecdote}'`, 10))
  }

  return(
    <div>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}

export default AnecdoteList