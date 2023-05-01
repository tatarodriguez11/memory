import { useState, useCallback } from "react";
import {getCards} from '../services/cards'


function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
export function useCards(){
  const [cards,setCards]= useState([]);
  const [loading, setLoading] = useState(false);
  const [error,setError]= useState(null);

  const getCardsToShow = async() => {
    try {
      setLoading(true);
      setError(null);
      const cards = await getCards();
      setCards(cards);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
    const secondCardsArray = [...cards]
    // to avoid many cards with the same id
    const secondArrayWithIdUpdated = secondCardsArray.map((card,index)=>({...card, id : `${index}${card.id}`}))
    const repeatedCards = cards.concat(secondArrayWithIdUpdated)
    const shuffledCards = shuffle(repeatedCards)

  return { cards: shuffledCards,getCardsToShow, loading }
}