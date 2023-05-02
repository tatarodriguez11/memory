import { useCallback, useEffect, useState } from 'react'
import { useCards } from './hooks/useCards'
import './App.css'
import { Welcome } from './components/welcome'
import {Card, ListOfCards} from './components/card'
import { Congrats } from './components/congrats'

function App() {
  const [errors, setErrors] = useState(0)
  const [hits, setHits] = useState(0)
  const {cards, getCardsToShow, loading} = useCards()
  const [alreadyLoaded, setAlreadyLoaded] = useState(null)
  const [cardsToShow, setCardsToShow] = useState([])
  const [flippedCards, setFlippedCards] = useState([]);
  const [twoCardsFlipped, setTwoCardsFlipped] = useState(false);
  const [clickedCard, setClickedCard] = useState(null)
  const [userName, setUserName] = useState('');

  useEffect(()=>{
    setAlreadyLoaded(localStorage.getItem("first_time"))
    if (cardsToShow.length === 0) {
      
      getCardsToShow()
    }
  },[alreadyLoaded])
  
  useEffect(()=>{
    if (cardsToShow.length === 0) {
      setCardsToShow(cards)
    }
  }, [cards])

  useEffect(()=>{
    // Check if the flipped cards have the same image
    if (!!twoCardsFlipped) {
      const areSame = flippedCards[0]?.url === flippedCards[1]?.url;
      if (!areSame) {
        setErrors(errors + 1)
        setTimeout(()=>{
  
          const unflippedCards = cardsToShow.map((card) => {
            if (card.id === flippedCards[0]?.id || card.id === flippedCards[1]?.id) {
              return { ...card, isFlipped: false };
            }
            return { ...card };
          });
          setCardsToShow(unflippedCards);
          clearFlippedCardsArr();
          setTwoCardsFlipped(false);
        }, 1000)
      } else {
        setHits(hits + 1)
        const newCardsWithMatchedOnes = cardsToShow.map((card) => {
          if (card.id === flippedCards[0].id || card.id === flippedCards[1].id) {
            return { ...card, matched: true, isFlipped: true };
          }
          return { ...card };
        });
        setCardsToShow(newCardsWithMatchedOnes);
        clearFlippedCardsArr();
        setTwoCardsFlipped(false);
      }
    }
  }, [twoCardsFlipped])

  const clearFlippedCardsArr = () => {
    setFlippedCards([]);
  }
  
  useEffect(()=>{
    if (flippedCards.length > 0) {
      // Flip the clicked card
      const newCards = cardsToShow.map((card) => {
        if (card?.id === clickedCard?.id) {
          return { ...card, isFlipped: true };
        }
        return { ...card };
      });
  
      setCardsToShow(newCards);
  
      if (flippedCards.length === 2) {
        setTwoCardsFlipped(true)
      }
    }
  }, [flippedCards])
  

  

  function handleCardClick(selected) {
    setClickedCard({...selected, isFlipped: true})
    // Ignore clicks on the same card twice
    if (flippedCards.length === 1 && flippedCards[0].id === selected.id) {
      return;
    }
    // Check if two cards are flipped
    setFlippedCards([{...selected, isFlipped: true}, ...flippedCards]);
    
  }

  const handleInputChange = (event) =>{
    setUserName(event.target.value)
  }

  const handleWelcomeClick = () => {
    if (userName.length > 0) {
      setAlreadyLoaded(localStorage.setItem("first_time","1"));
      localStorage.setItem("user_name", userName)
    }
  }
 
  const handleRestartClick = () => {
    localStorage.clear();
    location.reload()
  }

  return (
    <div className='main w-full flex justify-center items-center flex-col'>
      <h1 className='main__title drop-shadow-lg shadow-white text-7xl font-bold text-white'>Memory game!</h1>
      <h2 className='main__counter mt-4 text-lg'>Errores {errors} - Aciertos {hits}</h2>
      {!alreadyLoaded ? 
        <Welcome handleClick={handleWelcomeClick} handleInputChange={handleInputChange}/> 
      :
        <ListOfCards cards={cardsToShow} handleClick={handleCardClick}/>
      }
      {
        hits === 20 && <Congrats userName={userName} handleClick={handleRestartClick} />
      }
    </div>
  )
}

export default App
