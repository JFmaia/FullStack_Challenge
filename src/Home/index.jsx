import {HeartIcon} from '@heroicons/react/outline';
import axios from 'axios';
import {useFormik} from 'formik';
import { useEffect, useState } from 'react';

const MAX_TWEET_CHAR =140;
// Fazendo tweet 
function TweetForm({loggedInUser, onSuccess}){
  const formik = useFormik({
    onSubmit: async (valeus, form) => {
      await axios({
        method: 'post',
        url: `${import.meta.env.VITE_API_HOST}/tweets`,
        headers:{
            'authorization': `Bearer ${loggedInUser.accessToken}`
        },
        data: {
          text: valeus.text
        }, 
      })
      form.setFieldValue("text", "");
      onSuccess();
    },
    initialValues:{
      text: ''
    }
  });

  return (
    <div className='border-b border-silver p-4 space-y-6'>
      <div className='flex  space-x-5'>
        <img src='/src/avatar.png' className='w-7'></img>
        <h1 className='font-bold text-xl'>Página Inicial</h1>
      </div>
      <form className='pl-12 text-lg flex flex-col' onSubmit={formik.handleSubmit}>
        <textarea
          name="text" 
          value={formik.values.text}
          placeholder="O que está acontecendo?"
          className="bg-transparent outline-none"
          onChange={formik.handleChange}
          onBlur = {formik.handleBlur}
          disabled = {formik.isSubmitting}
        />
        <div className='flex justify-end items-center space-x-4'>
          <span className='text-sm'>
            <span>{formik.values.text.length}</span> / <span className='text-birdBlue'>{MAX_TWEET_CHAR}</span>
          </span>  
          <button 
            type='submit'
            className="bg-birdBlue px-5 py-2 rounded-full disabled:opacity-50" 
            disabled = {formik.values.text.length > MAX_TWEET_CHAR || formik.isSubmitting}
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

// Carregando a lista de tweets
export function Home({loggedInUser}){
  const [data, setData] = useState([]);

  async function getData(){
    const res = await axios.get(`${import.meta.env.VITE_API_HOST}/tweets`, {
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
      <TweetForm loggedInUser= {loggedInUser} onSuccess= {getData} />
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
  