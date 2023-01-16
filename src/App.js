import {useState} from "react"
import Die from "./Die"

function App(){
  const [dice, setDice] = useState(allNewDice())

  function allNewDice() {
    const newDice = []
    for(let i = 0; i < 10; i++) {
      newDice.push(Math.ceil(Math.random() * 6))
    }
    return newDice
  }

  const diceElement = dice.map(die => <Die value={die} />)
  
  return (
    <main>
    <div className="dice-container">
        {diceElement}
    </div>
</main>
  )
}

export default App