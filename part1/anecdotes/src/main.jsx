import React, { useState } from "react";
import { createRoot } from "react-dom/client";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Header = ({ text }) => <h1>{text}</h1>;

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  const maxVotes = Math.max(...points)
  const mostVotedAnecdote = points.indexOf(maxVotes);

  const handleNextClick = (anecdotesLength) => setSelected(Math.floor(Math.random() * anecdotesLength));
  const handleVoteClick = () => {
    const previousPoints = [...points];
    previousPoints[selected] += 1;
    setPoints(previousPoints);
  };

  return (
    <div>
      <div>
        <div>
          <Header text={"Anecdote of the day"} />
          <div>
            <p>
              Anecdote N° {selected + 1},<br />
              {props.anecdotes[selected]}
            </p>
          </div>
        </div>
        <Button handleClick={() => handleNextClick(anecdotes.length)} text={"Next anecdote"} />
        <Button handleClick={() => handleVoteClick()} text={"Vote"} />
      </div>
      <div>
        <Header text={"Anecdote with most votes"} />
        <div>
          <p>
            Anecdote N° {mostVotedAnecdote + 1} with {maxVotes} votes,<br />
            {props.anecdotes[mostVotedAnecdote]},
          </p>
        </div>
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App anecdotes={anecdotes} />);
