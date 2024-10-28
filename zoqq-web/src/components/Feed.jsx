import React, { useEffect } from 'react'
import UserCard from './UserCard'
import axios from 'axios'
import { BASE_URL } from '../../utilis/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../../utilis/feedSlice'

const Feed = () => {

  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try{
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    }catch(err){
      //TODO: handle error
    }
  }

  useEffect(() => {
    getFeed();
  }, []);

  return (
    feed && (
    <div className='flex justify-center my-10'>
      <UserCard user={feed[0]}/>
    </div>
    )
  );
};

export default Feed