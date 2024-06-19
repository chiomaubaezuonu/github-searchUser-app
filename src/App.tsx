import React, { useEffect, useState } from 'react';
import moon from "./moon.svg"
import search from "./search.svg"
import axios from 'axios'
import locaction from "./location.svg"
import website from "./website.svg"
import twitter from "./twitter.svg"
import company from "./company.svg"
import './App.css';
import sun from './sun.svg'
import { response } from 'express';
// import { error } from 'console';

interface User {
  name: string,
  created_at: string,
  avatar_url: string,
  login: string,
  html_url: string,
  public_repos: string,
  followers: string,
  following: string,
  location: string,
  blog: string,
  company: string,
  twitter_username: string,
  bio: string,
}
function App() {
  const [userDetails, setUserDetails] = useState<User | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [dark, setDark] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)


  // useEffect(() => {
  // const headers = {
  //   'User-Agent': 'Dancyangelo102'
  // }
  // axios.get("https://api.github.com/users/chiomaubaezuonu", { headers })

  useEffect(() => {
  axios.get('https://api.github.com/users/chiomaubaezuonu')
  .then((response) => {
   setUserDetails(response.data)
  })
  }, [])

  const fetchUserProfile = async () => {
    if (inputValue.trim() !== "") {
      setLoading(true)
      await axios.get(`https://api.github.com/users/${inputValue}`)
        .then((response) => {
          console.log(response.data)
          setUserDetails(response.data)
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            setErrorMsg("User not found")
          } else {
            console.error("Fetching user profile failed:", error)
          }

        })
        .finally(() => setLoading(false))
    } else {
      setInputValue("")
    }
  }

  // }, [inputValue]);


  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setInputValue(e.target.value)
  }
  const handleTheme = () => {
    setDark(!dark)
  }
  return (
    <div className={`App ${dark ? 'bg-[#141d2e]' : 'bg-[#f5f7ff]'} sm:w-full py-5 md:py-9 h-screen transition-all ease-in-out duration-500`}>
      <div className="flex-col gap-4 relative px-4 md:px-0 w-full md:w-1/2 mx-auto">
        <header className='flex justify-between transition-all ease-in-out duration-500'>
          <h1 className='text-[#4B699B] text-[2.2rem] font-bold'> devfinder</h1>
          <div className='flex items-center gap-4'>
            <p onClick={handleTheme} className='text-[#4B699B] text-base font-normal cursor-pointer'>{dark ? 'LIGHT' : 'DARK'}</p>
            {dark ?
              <img onClick={handleTheme} src={sun} alt='sun icon' className='w-5 h-5 cursor-pointer' /> :
              <img onClick={handleTheme} src={moon} alt='moon icon' className='w-5 h-5 cursor-pointer' />
            }
          </div>
        </header>
        {errorMsg &&
          <p className='absolute text-red-500 right-0 top-[2.1rem] font-bold'>User not found</p>
        }
        <div className={`search-bar-div my-4 flex items-center p-2 rounded-2xl ${dark ? 'bg-[#1E2B48]' : 'bg-white'} transition-all ease-in-out duration-500`}>
          <div className='my-0 mx-6'>
            <img className='w-8 h-8 object-contain' src={search} alt='search icon' />
          </div>
          <input onChange={handleInput} value={inputValue} className={`w-full text-lg outline-none ${dark ? 'bg-[#1E2B48] text-white' : 'bg-white'} transition-all ease-in-out duration-500`} type="text" placeholder='Search Github Username...' required />
          {
            inputValue &&
            <p onClick={() => {
              setInputValue("");
              setErrorMsg("")
            }}
              className='text-[#0077ff] cursor-pointer font-bold'>x</p>
          }
          <button onClick={() => fetchUserProfile()} className='p-3 ml-4 text-base text-white font-extrabold bg-[#0077ff] hover:bg-[#61abff] rounded-[0.625rem]'>Search</button>
        </div>

        {/* user details */}
        {/* {userDetails ? */}
        {loading ?
          <p className={` ${dark ? 'text-white' : 'text-[#4b699b]'}  text-base`}>Loading...</p>
          :
          userDetails &&
          <div className={`user-details-div flex p-4 pr-0 mr-0 md:gap-8 w-full md:p-8 rounded-2xl ${dark ? 'bg-[#1E2B48]' : 'bg-white'} transition-all ease-in-out duration-500`}>
            <div className='hidden md:block'>
              <img src={userDetails.avatar_url} className='max-h-[7.3125rem] w-[9.69rem] rounded-full' alt='user' />
            </div>
            {/* mobile user's image */}
            {/* <div className='block md:hidden max-h-[4.3125rem] px-12 w-[4.69rem] rounded-full'>
            <img src={userDetails.avatar_url} className=' w-[4.69rem] rounded-full' alt='user' />
            </div> */}

            {/* Users profile data */}
            <div className='w-full'>
              <div className='flex gap-4 md:gap-8'>
                {/* mobile user's image */}
                <div className='block md:hidden'>
                  <img src={userDetails.avatar_url} className=' w-[4.69rem] max-h-[4.3125rem] rounded-full' alt='user' />
                </div>
                <div className='username-container sm:block w-full md:flex justify-between'>
                  <div>
                    <p className={`${dark ? 'text-white' : 'text-[#2a3341]'} text-lg font-bold md:text-2xl`}>{userDetails.name}</p>
                    <a href={userDetails.html_url} target='_blank' rel="noopener noreferrer" className='text-[#0077ff] no-underline text-base'> @{userDetails.login}</a>
                  </div>
                  <div className={`flex gap-1 md:gap-[0.5rem] text-[13px] md:pt-[0.625rem] ${dark ? 'text-white' : 'text-[#4B699B]'} md:text-base`}>
                    <p>Joined</p>
                    <p>{userDetails.created_at ? new Date(userDetails.created_at).toDateString() : ""}</p>
                  </div>
                </div>
              </div>
              <p className={`hidden md:block mt-6 ${dark ? 'text-white' : 'text-[#4b699b]'} text-base opacity-[0.75]`}> {userDetails?.bio ? userDetails.bio : 'This profile has no bio'}</p>
              {/* User work info */}

              <div className={`flex justify-around w-full p-4 md:justify-between my-8 pl-0 md:py-[1.125rem] md:pr-20 md:pl-8 rounded-2xl ${dark ? 'bg-[#141B2E]' : 'bg-[#f5f7ff]'} transition-all ease-in-out duration-500`}>
                <div className='repos'>
                  <p className={`${dark ? 'text-white' : 'text-[#4b699b]'} text-[0.813rem]  md:text-base`}>Repos</p>
                  <p className={`mt-[0.635rem] font-bold text-[1.125rem] md:text-[1.375rem] ${dark ? 'text-white' : 'text-[1.125rem]'} `}>{userDetails.public_repos}</p>
                </div>
                <div>
                  <p className={`${dark ? 'text-white' : 'text-[#4b699b]'} text-[0.813rem]  md:text-base`}>Followers</p>
                  <p className={`mt-[0.635rem] font-bold ${dark ? 'text-white' : 'text-[#2a3341]'} md:text-[1.375rem] `}>{userDetails.followers}</p>
                </div>
                <div>
                  <p className={`${dark ? 'text-white' : 'text-[#4b699b]'} text-[0.813rem]  md:text-base`}>Following</p>
                  <p className={`mt-[0.635rem] font-bold text-[1.125rem] md:text-[1.375rem] ${dark ? 'text-white' : 'text-[1.125rem]'}`}>{userDetails.following}</p>
                </div>
              </div>

              {/* User Links */}
              <div className='flex flex-col md:flex md:flex-row sm:gap-4 md:justify-between w-full'>
                <div className={`w-full md:w-[48%] cursor-pointer ${dark ? 'text-white' : 'text-[#4B699B]'} text-base`}>
                  <div className='user-loc mb-4 flex items-start gap-4 break-all '>
                    <img src={locaction} alt='location icon' />
                    <p>{userDetails.location ? userDetails.location : 'Not available'}</p>
                  </div>
                  <div className='user-loc mb-4 flex items-start gap-4 break-all'>
                    <img src={website} alt='website icon' />
                    <p>github.blog</p>
                  </div>
                </div>
                <div className={`md: w-full md:w-[48%] cursor-pointer ${dark ? 'text-white' : 'text-[#4B699B]'} text-base`}>
                  <div className='user-loc mb-4 flex items-start gap-4 break-all'>
                    <img src={twitter} alt='twitter icon' />
                    <p>{userDetails.twitter_username ? userDetails.twitter_username : 'Not available'}</p>
                  </div>
                  <div className='user-loc mb-4 flex items-start gap-4 break-all'>
                    <img src={company} alt='company icon' />
                    <p>{userDetails.company ? userDetails.company : 'Not available'}</p>
                  </div>
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