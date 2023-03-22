import React, { useState } from "react";
import { createRoot } from "react-dom/client";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Header = ({ text }) => <h1>{text}</h1>;

const Statistic = ({ text, value }) => (
  <>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  </>
);

const Statistics = ({ statistics, voted }) => {
  if (!voted) {
    return <div>Not feedback given</div>;
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>statistic</th>
            <th>value</th>
          </tr>
        </thead>
        <tbody>
          <Statistic text={"Good"} value={statistics.good} />
          <Statistic text={"Neutral"} value={statistics.neutral} />
          <Statistic text={"Bad"} value={statistics.bad} />
          <Statistic text={"All"} value={statistics.all} />
          <Statistic text={"Average"} value={statistics.average} />
          <Statistic text={"Positive"} value={statistics.positive} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  //save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setToGood = (newValue) => setGood(newValue);
  const setToNeutral = (newValue) => setNeutral(newValue);
  const setToBad = (newValue) => setBad(newValue);

  const totalVotes = (good + neutral + bad) || 0;
  const averageVoteScore = (good - bad) / totalVotes
  const positiveVotes = `${(good * 100) / totalVotes}%`;

  const voted = () => (!good && !neutral && !bad) ? false : true

  const statistics = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: totalVotes,
    average: !totalVotes ? 0 : averageVoteScore,
    positive: !totalVotes ? 0 : positiveVotes,
  }

  return (
    <div>
      <div>
        <Header text={"give feedback"} />
        <div>
          <Button handleClick={() => setToGood(good + 1)} text={"Good"} />
          <Button handleClick={() => setToNeutral(neutral + 1)} text={"Neutral"} />
          <Button handleClick={() => setToBad(bad + 1)} text={"Bad"} />
        </div>
      </div>
      <div>
        <Header text={"statistics"} />
        <div>
          <Statistics statistics={statistics} voted={voted()} />
        </div>
      </div>
    </div>
  );
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);
