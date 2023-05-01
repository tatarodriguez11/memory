export function Card({img, title, handleClick, isFlipped}) {

  return(
    <div className="w-38 h-20 flex cursor-pointer" >
      {
        isFlipped? 
        <img className="bg-center bg-cover bg-no-repeat bg-clip-border w-full h-full max-w-[100%] shadow-lg shadow-white/50" src={img} alt={title} />
        :
        <div 
        onClick={handleClick}
        className="w-full shadow-lg shadow-cyan-500/50 h-full bg-gradient-to-r from-indigo-500 from-5% via-sky-500 via-50% to-emerald-500 to-90% text-4xl text-white flex justify-center items-center font-bold">
        ?
        </div>
      }
    </div>
  )
}

export function NoCards() {
  return(
    <p>No se han encontrado tarjetas para empezar a jugar, por favor regresa mas tarde</p>
  )
}

export function ListOfCards({cards, flippedCards, setFlippedCards}){
  const hasCards = cards?.length > 0;
  return hasCards ? 
  <div className="grid-cols-5 bg-white h-inherit w-inherit grid gap-4 grid-rows-auto mt-12 min-w-[38rem] max-w-sm">
    {
      cards.map(card =>{
        return <Card img={card?.fields?.image?.url} title={card?.fields?.image?.title} id={card?.fields?.image?.uuid} flippedCards={flippedCards} setFlippedCards={setFlippedCards}/>
      })
    }
  </div>
  :
  <NoCards/>
}