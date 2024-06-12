import React from 'react';
import moon from "./moon.svg"
import search from "./search.svg"

import './App.css';

function App() {
  return (
    <div className="App bg-[#f5f7ff] py-12">
      <div className="flex-col gap-4 relative w-1/2 mx-auto">
        <header className='flex justify-between transition-all ease-in-out duration-500'>
          <h1 className='text-[#4B699B] text-[2.2rem] font-bold'>  devfinder</h1>
          <div className='flex items-center gap-4'>
            <p className='text-[#4B699B] text-base'>DARK</p>
            <img src={moon} alt='moon icon' className='w-5 h-5' />
          </div>
        </header>
       
      </div>
    </div>
  );
}

export default App;
// --box-shadow: 0px 16px 30px -10px hsla(227, 46%, 50%, 0.2);