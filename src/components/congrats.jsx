export function Congrats({userName, handleClick}){

  return(
  <div className="w-screen bg-slate-600/80 h-screen flex justify-center items-center fixed top-0">
    <div className="bg-white rounded-xl h-4/5 lg:h-1/2 w-4/5 lg:w-1/2 p-4 lg:p-16 flex flex-col items-center justify-center">
      <h2 className="text-black text-2xl lg:text-3xl font-semibold mb-3 overflow-scroll">Felicidades {userName}! <br/> Has encontrado todas las parejas</h2>
      <p className="text-gray-950 text-md lg:text-lg font-normal mb-10">Para volver a jugar, da click en el botón</p>
      <button id="firstTimeBtn" onClick={handleClick}>Jugar de nuevo!</button>
    </div>
  </div>
  )
}