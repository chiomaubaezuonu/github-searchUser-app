import React, { useEffect, useState } from 'react';
import moon from "./moon.svg"
import search from "./search.svg"
import axios from 'axios'

import './App.css';

interface UserObject {
  name: string,
  created_at: string,
  avatar_url: string,
  login: string,
  html_url: string,
  public_repos: string,
  followers: string,
  following: string
}

function App() {

  const [userDetails, setUserDetails] = useState<UserObject>()
  const [inputValue, setInputValue] = useState<string>('octocat')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const headers = {
      'User-Agent': 'Github-User-App'
    }
    // axios.get("https://api.github.com/users/chiomaubaezuonu", { headers })
    if (inputValue.trim() !== "") {
      axios.get(`https://api.github.com/users/${inputValue}`, { headers })
        .then((response) => {
          console.log(response.data)
          setUserDetails(response.data)
        })
    }

  }, [inputValue]);

  const handleInput = (e: any) => {
    e.preventDefault()
    setInputValue(e.target.value)
  }
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
          <input onChange={handleInput} value={inputValue} className='w-full outline-none' type="text" placeholder='Search Github Username...' required />
          {
            inputValue &&
            <p onClick={() => setInputValue("")} className='text-[#0077ff] cursor-pointer'>x</p>
          }
          <button className='p-3 ml-4 text-base text-white font-extrabold bg-[#0077ff] rounded-[0.625rem]'>Search</button>
        </div>

        {/* user details */}
        {userDetails &&
          <div className='flex gap-8 p-8 rounded-2xl bg-white transition-all ease-in-out duration-500 '>
            <div>
              <img src={userDetails.avatar_url} className='max-h-[7.3125rem] rounded-full' alt='user' />
            </div>

            {/* Users profile data */}
            <div>
              <div className='gap-8 flex w-full'>
                <div className='name flex justify-between w-full'>
                  <div>
                    <p className='text-[#2a3341] font-bold text-2xl'>{userDetails.name}</p>
                    <a href={userDetails.html_url} target='_blank' rel="noopener noreferrer" className='text-[#0077ff] no-underline text-base'> @{userDetails.login}</a>
                  </div>
                  <div className='flex gap-[0.5rem] pt-[0.625rem] text-[#4B699B] text-base'>
                    <p>Joined</p>
                    <p>{userDetails.created_at ? new Date(userDetails.created_at).toDateString() : ""}</p>
                  </div>
                </div>
              </div>

              {/* User work info */}
              <div className='flex justify-between my-8 mx-0 py-[1.125rem] pr-20 pl-8 rounded-2xl bg-[#f5f7ff] transition-all ease-in-out duration-500'>
                <div className='repos'>
                  <p>Repos</p>
                  <p>{userDetails.public_repos}</p>
                </div>
                <div>
                  <p>Followers</p>
                  <p>{userDetails.followers}</p>
                </div>
                <div>
                  <p>Following</p>
                  <p>{userDetails.following}</p>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;