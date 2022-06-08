import {HeartIcon} from '@heroicons/react/outline';
import axios from 'axios';
import { useEffect, useState } from 'react';

const MAX_TWEET_CHAR =140;
function TweetForm(){
  const [text, setText] = useState('');
  return (
    <div className='border-b border-silver p-4 space-y-6'>
      <div className='flex  space-x-5'>
        <img src='/src/avatar.png' className='w-7'></img>
        <h1 className='font-bold text-xl'>Página Inicial</h1>
      </div>
      <form className='pl-12 text-lg flex flex-col'>
        <textarea
          name="text" 
          value={text}
          placeholder="O que está acontecendo?"
          className="bg-transparent outline-none"
          onChange={e => setText(e.target.value)}
        />
        <div className='flex justify-end items-center space-x-4'>
          <span className='text-sm'>
            <span>{text.length}</span> / <span className='text-birdBlue'>{MAX_TWEET_CHAR}</span>
          </span>  
          <button 
            className="bg-birdBlue px-5 py-2 rounded-full disabled:opacity-50" 
            disabled = {text.length > MAX_TWEET_CHAR}
            >Tweet
          </button>
        </div>
      </form>
    </div>
  );
}

function Tweet({name, username, avatar, children}){
  return (
    <div id="tweet" className="flex space-x-3 p-4 border-b border-silver">
      <div id="tweet-avatar">
        <img src={avatar}/>
      </div>
      <div id="tweet-text" className='space-y-1'>
        <span className="font-bold text-sm">{name}</span>{' '}
        <span className="text-sm text-silver">@{username}</span>
        <p>
          {children}
        </p>
        <div className='flex space-x-2 text-silver text-sm items-center'>
          <HeartIcon className="w-6 stroke-1"></HeartIcon>
          <span>1.2k</span>
        </div>
      </div>
    </div>
  );
}

export function Home({loggedInUser}){
  const [data, setData] = useState([]);

  async function getData(){
    const res = await axios.get('http://localhost:9901/tweets', {
      headers: {
        'authorization': `Bearer ${loggedInUser.accessToken}`
      }
    });
    setData(res.data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <TweetForm />
      <div>
        {data.length === '' ? <h1>Nenhum tweet</h1> : data.map(tweet => (
          <Tweet key={tweet.id} name={tweet.user.name} username={tweet.user.username} avatar="/src/avatar.png">
            {tweet.text}
          </Tweet>
        ))}
      </div>
    </>
  );
}
  