import React, {useState} from 'react';
import ReactDOM from 'react-dom'
import './App.css';

const Button = ({ handleClick, text }) => {
  return(
  <button onClick={handleClick}>
    {text}
  </button>
  )
}

const Votes = (props) => {
  return(
  <p>
    has {props.votes} votes
  </p>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const randomState = () => setSelected(Math.floor(Math.random() * 6))
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  
  const addVote = (arr) => {
    
    const copy = [...arr]
    copy[selected]+=1
    setVotes(copy)
    
    console.log(selected)
    console.log('l', copy)
    
  }

  return (
    <div>
      <p>
        {anecdotes[selected]}
        <Votes votes ={votes[selected]}/>
      </p>
      <p>
        <Button handleClick = {randomState} text = {'next anecdote'}/>
        <Button handleClick = {() => addVote(votes)} text = {'vote'}/>
      </p>
      
    </div>
  )
}


ReactDOM.render(<App />, 
  document.getElementById('root')
)
export default App;
