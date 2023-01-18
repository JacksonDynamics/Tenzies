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
        isHeld: false,
        id: nanoid()  
      })
    }
    return newDice
  }

  const diceElement = dice.map(die => 
      <Die key={die.id} 
           value={die.value} 
           isHeld={die.isHeld} 
           holdDice={(() => holdDice(die.id))}/>)

  function rollDice(){
    setDice(allNewDice())
  }

  function holdDice(id) {
    console.log(id)
  }

  return (
    <main>
      <div className="dice-container">
          {diceElement}
      </div>
        <button className="button"
                onClick={rollDice}>Roll Dice
        </button>
    </main>
  )
}

export default App

