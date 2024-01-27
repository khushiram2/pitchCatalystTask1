import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom"
import { useAppContext } from '../../contextApi/useContextHook';
import axios from 'axios';
import { Api } from '../../GlobalApi';
const Login = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const {setLogin,setAdmindetails}=useAppContext()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${Api}/admin/login`,formData).
    then((res)=>{
    if(res.data.status){
     alert(res.data.message)
     setAdmindetails(res.data.user)
     window.sessionStorage.setItem("token",res.data.token)
     setLogin(true)
     navigate("/new-conract")
    }else{
     alert(res.data.message)
    } 
    })
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <p>don't have an account </p>  <Link to="/register">register </Link>
    </div>
  );
};

export default Login;
