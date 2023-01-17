import {useState} from "react"
import Die from "./Die"
import {nanoid} from "nanoid"

function App(){
  const [dice, setDice] = useState(allNewDice())

  function allNewDice() {
    const newDice = []
    for(let i = 0; i < 10; i++) {
      newDice.push({
        value:Math.ceil(Math.random() * 6),
        isHeld: true,
        id: nanoid()  
      })
    }
    return newDice
  }

  const diceElement = dice.map(die => 
      <Die key={die.id} value={die.value} isHeld={die.isHeld} />)

  function handleClick(){
    setDice(allNewDice())
  }
  return (
    <main>
      <div className="dice-container">
          {diceElement}
      </div>
        <button className="button"
                onClick={handleClick}>Roll Dice
        </button>
    </main>
  )
}

export default App