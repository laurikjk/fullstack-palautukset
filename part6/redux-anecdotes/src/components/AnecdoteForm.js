import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(anecdote)
    props.createAnecdote(newAnecdote.content)
  }

  return(
    <div>
      <h2>create anecdote</h2>
      <form onSubmit={addAnecdote}>
          <div><input name="anecdote" /></div>
          <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapStateToProps = () =>{
  return {}
}

const mapDispatchToProps = {
  createAnecdote
}

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm