import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  return (
    <tbody>
      <StatisticLine text="good" value ={props.value.good} />
      <StatisticLine text="neutral" value ={props.value.neutral} />
      <StatisticLine text="bad" value ={props.value.bad} />
      <StatisticLine text="all" value ={props.value.all} />
      <StatisticLine text="average" value ={props.value.average} />
      <StatisticLine text="positive" value ={`${props.value.positive}%`} />
    </tbody>
  )
}

const Button = (props) => (
  <button onClick={props.onClick}>{props.text}</button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  const average = total === 0 ? 0 : (good - bad) / total
  const positive = total === 0 ? 0 : (good / total) * 100
  const stats = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: total,
    average: average,
    positive: positive
  }

  return (
    <div>
     <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text = "good" />
      <Button onClick={() => setNeutral(neutral + 1)} text = "neutral" />
      <Button onClick={() => setBad(bad + 1)} text = "bad" />
    <h1>statistics</h1>
    {total === 0 ? (<p>No feedback given</p>) : (
      <table>
       <Statistics value = {stats} />
      </table>
    )}
    </div>
  )
}

export default App