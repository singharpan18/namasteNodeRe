import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux';

const Profile = () => {
  console.log("testingredux")
  const user = useSelector((store) => store.user);
  console.log(user);
  return (
    user && (
      <div>
        <EditProfile user={user}/>
      </div>
    )
  );
};

export default Profile;