import React from 'react';
import moon from "./moon.svg"
import search from "./search.svg"

import './App.css';

function App() {
  return (
    <div className="App bg-[#f5f7ff] py-16">
      <div className="flex-col gap-4 relative w-1/2 mx-auto">
        <header className='flex justify-between transition-all ease-in-out duration-500'>
          <h1 className='text-[#4B699B] text-[2.2rem] font-bold'>  devfinder</h1>
          <div className='flex items-center gap-4'>
            <p className='text-[#4B699B] text-base'>DARK</p>
            <img src={moon} alt='moon icon' className='w-5 h-5' />
          </div>
        </header>
        {/* <p className='absolute text-red-500 right-0 top-[2.1rem] font-bold'>User not found</p> */}
        <div className='search-bar-div my-5 flex items-center p-2 rounded-2xl bg-white transition-all ease-in-out duration-500'>
          <div className='my-0 mx-6'>
            <img className='w-8 h-6' src={search} alt='search icon' />
          </div>
          <input className='w-full' type="text" placeholder='Search Github Username...' required />
          <button className='p-3 ml-4 text-base text-white font-extrabold bg-[#0077ff] rounded-[0.625rem]'>Search</button>
        </div>

        {/* user details */}
        
      </div>
    </div>
  );
}

export default App;