import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { BASE_URL } from '../../utilis/constants';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../../utilis/createSlice';

const Login = () => {

  const [emailId, setEmailId] = useState("johndoe2@example.com");
  const [password, setPassword] = useState("W@llet1232");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("button clicked!!");
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/")
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email ID:</span>
              </div>
              <input type="text" value={emailId} className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input type="text" value={password} className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary"
              onClick={handleLogin}
            >Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login