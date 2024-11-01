import React, { useEffect } from 'react'
import UserCard from './UserCard'
import axios from 'axios'
import { BASE_URL } from '../utilis/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utilis/feedSlice'

const Feed = () => {
  const [showButton, setShowButton] = useState(true);
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

  if (!feed) return;

  if (feed.length <= 0)
    return <h1 className="flex justify-center my-10">No new users founds!</h1>;

  return (
    feed && (
    <div className='flex justify-center my-10'>
      <UserCard user={feed[0]}
      button = {showButton}
      />
    </div>
    )
  );
};

export default Feed