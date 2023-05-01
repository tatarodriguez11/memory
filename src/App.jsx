import { useCallback, useEffect, useState } from 'react'
import { useCards } from './hooks/useCards'
import './App.css'
import { Welcome } from './components/welcome'
import {Card} from './components/card'

function App() {
  const [errors, setErrors] = useState(0)
  const [hits, setHits] = useState(0)
  const {cards, getCardsToShow, loading} = useCards()
  const [alreadyLoaded, setAlreadyLoaded] = useState(null)
  const [cardsToShow, setCardsToShow] = useState([])
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [twoCardsFlipped, setTwoCardsFlipped] = useState(false);
  const [clickedCard, setClickedCard] = useState(null)

  useEffect(()=>{
    // setAlreadyLoaded(localStorage.getItem("first_time"))
    if (cardsToShow.length === 0) {
      
      getCardsToShow()
    }
    console.log('getCardsToShow');
  },[])
  
  useEffect(()=>{
    console.log('set cards to show');
    if (cardsToShow.length === 0) {
      setCardsToShow(cards)
    }
  }, [cards])

  useEffect(()=>{
    console.log('two cards flipped');
    // Check if the flipped cards have the same image
    const areSame = flippedCards[0]?.url === flippedCards[1]?.url;
    console.log('aresame', areSame);
    if (areSame) {
      // Set the cards as matched
      setHits(hits+1)
      const matchedCards = cardsToShow.map((card) => {
        if (card.id === flippedCards[0].id || card.id === flippedCards[1].id) {
          return { ...card, matched: true, isFlipped: true };
        }
        return { ...card };
      });
      setCardsToShow(matchedCards);
    } else {
      console.log('same', areSame, flippedCards);
      setErrors(errors + 1)
      // Flip the cards back over
      setTimeout(()=>{
        console.log('entra al log');
        const unflippedCards = cardsToShow.map((card) => {
          if (card.id === flippedCards[0]?.id || card.id === flippedCards[1]?.id) {
            return { ...card, isFlipped: false };
          }
          return { ...card };
        });
        setCardsToShow(unflippedCards);
      },1000)
    }
  }, [twoCardsFlipped])
  
  useEffect(()=>{
    console.log('flipped cards', flippedCards);
    if (flippedCards.length === 1) {
      setTwoCardsFlipped(true)
    } else {
      // Flip the clicked card
      const newCards = cardsToShow.map((card) => {
        if (card.id === clickedCard.id) {
          return { ...card, isFlipped: true };
        }
        return { ...card };
      });

      setCardsToShow(newCards);
    }
  }, [flippedCards])

  console.log('volvio a renderizar');
  

  const handleClick = () => {
    setAlreadyLoaded(localStorage.setItem("first_time","1"));
  }

  function handleCardClick(selected) {
    setClickedCard(selected)
    console.log(selected);
    // Ignore clicks on matched cards
    if (matchedCards.includes(selected)) {
      return;
    }

    // Ignore clicks on the same card twice
    if (flippedCards.length === 1 && flippedCards[0].id === selected.id) {
      return;
    }
    
    // console.log('new crds', newCards);
    // Check if two cards are flipped
    setFlippedCards([selected, ...flippedCards]);
    
  }
 

  return (
    <div className='w-full flex justify-center items-center flex-col'>
      <h1>Memory game!</h1>
      <h2>Errores {errors} - Aciertos {hits}</h2>
      {/* {!alreadyLoaded ? 
        <Welcome handleClick={handleClick}/> 
      : */}
      <div className="grid-cols-5 bg-white h-inherit w-inherit grid gap-4 grid-rows-auto mt-12 min-w-[38rem] max-w-sm">
        {
          cardsToShow.map(card =>{
            return <Card 
            img={card?.url} 
            title={card?.title}
            isFlipped={card.isFlipped}
            handleClick={()=>handleCardClick(card)}
            matched={card.matched}
            />
          })
        }
      </div>
      {/* } */}
    </div>
  )
}

export default App
