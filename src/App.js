import {useState, useEffect} from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

function App(){
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true)
        console.log("You won!")
    }
}, [dice])

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
    if(!tenzies) {
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ? 
                die :
                generateNewDie()
        }))
    } else {
        setTenzies(false)
        setDice(allNewDice())
    }
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} :
      die
    }))
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
          {diceElement}
      </div>
        <button className="button"
                onClick={rollDice}>{tenzies ? "New Game" : "Roll Dice"}
        </button>
    </main>
  )
}

export default App

