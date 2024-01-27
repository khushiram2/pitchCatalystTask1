import axios from 'axios';
import React, { useState } from 'react';
import { Api } from '../../GlobalApi';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../contextApi/useContextHook';

const Register = () => {
    const navigate=useNavigate()
  const [formData, setFormData] = useState({
    name: '',
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
   axios.post(`${Api}/admin/register`,formData).
   then((res)=>{
   if(res.data.status){
    alert(res.data.message)
    setLogin(true)
    setAdmindetails(res.data.user)
    window.sessionStorage.setItem("token",res.data.token)
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
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />
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
        <button type="submit">Register</button>
      </form>
      <p>already have an account </p>  <Link to="/login">login </Link>
    </div>
  );
};

export default Register;
