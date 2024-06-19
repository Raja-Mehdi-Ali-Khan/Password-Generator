import { useState, useCallback, useEffect, useRef } from 'react'
import "./App.css"

function App() {
 const [length, setLength] = useState(8);
 const [numAllow, setNumAllow] = useState(false);
 const [charAllow, setCharAllow] = useState(false);
 const [pswrd, setPswrd] = useState("")
 
 const passRef = useRef(null)
 const copyPass = useCallback(()=>{
  passRef.current?.select();
  window.navigator.clipboard.writeText(pswrd)
 }, [pswrd])

 const pswrdGen = useCallback(() => {
  let pass = "";
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  if(numAllow) str = str + "1234567890";
  if(charAllow) str = str + "-_!&$@#*?:";
  for(let i =1;i<=length;i++){
    let rnInd = Math.ceil(Math.random()*str.length);
    pass=pass+ str.charAt(rnInd);
  }
  setPswrd(pass);
 },[length, setPswrd, numAllow, charAllow]);

 useEffect(()=>{
  pswrdGen()
 },[length, numAllow,charAllow, pswrdGen]);
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
        <h1 className='text-white text-center'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type="text"
          value={pswrd}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passRef}
          />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          onClick={copyPass}
          >Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input 
            type="range"
            max={100}
            min={8}
            value={length}
            className ="cursor-pointer"
            onChange={(event)=>{setLength(event.target.value)}}
            />
            <label htmlFor="lenght">Length: {length} </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked={numAllow}
            id='numberInput'
            className ="cursor-pointer"
            onChange={()=>{setNumAllow((prev)=> !prev)}}
            />
            <label htmlFor="Numbers">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked={charAllow}
            id='charInput'
            className ="cursor-pointer"
            onChange={()=>{setCharAllow((prev)=> !prev)}}
            />
            <label htmlFor="Characers">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
