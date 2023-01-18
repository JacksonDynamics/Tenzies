import {useState} from "react"
import Die from "./Die"
import {nanoid} from "nanoid"

function App(){
  const [dice, setDice] = useState(allNewDice())

  function allNewDice() {
    const newDice = []
    for(let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function generateNewDie() {
    return {
      value:Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()  
    }
  }

  const diceElement = dice.map(die => 
      <Die key={die.id} 
           value={die.value} 
           isHeld={die.isHeld} 
           holdDice={(() => holdDice(die.id))}/>)

  function rollDice() {
    setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? 
            die :
            generateNewDie()
    }))
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} :
      die
    }))
  }

  return (
    <main>
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
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

