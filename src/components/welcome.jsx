export function Welcome({handleClick, handleInputChange}){

  return(
  <div className="w-screen bg-slate-600/80 h-screen flex justify-center items-center fixed top-0">
    <div className="bg-white rounded-xl h-1/2 w-1/2 p-16 flex flex-col items-center justify-center">
      <h2 className="text-black text-3xl font-semibold mb-3">Bienvenido a Memory</h2>
      <p className="text-gray-950 text-lg font-normal mb-10">Para continuar, por favor ingresa tu nombre</p>
      <span className="flex justify-center items-center w-full">
        <input onChange={handleInputChange} className="bg-white border-2 border-black text-black rounded-lg w-1/3 mr-3" type="text" required id="welcomeInput"/>
        <button id="firstTimeBtn" onClick={handleClick}>Jugar!</button>
      </span>
    </div>
  </div>
  )
}