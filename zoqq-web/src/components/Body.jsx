import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { useEffect } from 'react';
import { addUser } from '../utilis/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utilis/constants';
import axios from 'axios';
import NavBar from './NavBar';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};
export default Body;