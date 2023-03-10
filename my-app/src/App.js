import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/card/Card.js'

const initialCards = [
  { "src": "/images/bulbasaur.png", matched: false },
  { "src": "/images/butterfree.png", matched: false },
  { "src": "/images/charmander.png", matched: false },
  { "src": "/images/pidgeotto.png", matched: false },
  { "src": "/images/pikachu.png", matched: false },
  { "src": "/images/squirtle.png", matched: false },
  { "src": "/images/pokemon-35.png", matched: false },
  { "src": "/images/pure.png", matched: false },
  { "src": "/images/jirachi.png", matched: false },
  { "src": "/images/lapras.png", matched: false },
  
];

function App() {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [turn, setTurn] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(true);
  const [startFlip, setStartFlip] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStartFlip(false)
    }, 1000);
    shuffleCards();
  }, []);

  function shuffleCards() {
    //setCards(null)
    const shuffledCards = [...initialCards, ...initialCards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards);
    setScore(0);
    setTurn(0);
    setDisabled(false)
    setStartFlip(true)
    setTimeout(() => {
      setStartFlip(false)
    }, 1000);
  }


  function handleChoice(card) {
    choiceOne ? (
      choiceOne.id !== card.id &&
      setChoiceTwo(card))
      : setChoiceOne(card)
  }

  function resetTurn() {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurn(prevTurn => prevTurn + 1)
    setDisabled(false)
  }
  function handleNewGameClick(){
    resetTurn();
    setTurn(0);
    setScore(0);
    shuffleCards()
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        setScore(prevCards => prevCards + 1);
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  return (
    <div className='container'>
      <button onClick={() => handleNewGameClick()}>New Game</button>
      <div className="grid">
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched || startFlip}
            disabled={disabled}
            matched={card.matched}
          />
        ))}
      </div>
      <p>Turns: {turn}</p>
      <p>Total Score: {score}</p>
    </div>
  );
}

export default App;