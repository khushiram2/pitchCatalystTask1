import React, { useEffect } from 'react';
import { Box, Drawer } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Api } from '../../GlobalApi';
import { useAppContext } from '../../contextApi/useContextHook';
import "./Dashboard.css"

const Dashboard = ({ children }) => {
  const navigate = useNavigate();
  const {login,setLogin,setAdmindetails, contracts, setContracts,setMySelectedContract } = useAppContext();
  const token=window.sessionStorage.getItem("token")

  useEffect(() => {
    axios
      .get(`${Api}/admin/all-contracts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status) {
          setContracts(res.data.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching contracts:', error);
      });
  }, []);

useEffect(()=>{
if(!login){
  if(token){
    axios.get(`${Api}/admin/get-details`,{headers:{Authorization:`Bearer ${token}`}})
    .then((res)=>{
      if(res.data.status){
        setLogin(true)
        setAdmindetails(res.data.user)
      }else{
        navigate("/login")
      }
    })
  }else{
    navigate("/login")
  }
}
    },[])


  const handleClickOnContract = (pr) => { 
    setMySelectedContract(pr)
   navigate(`/contract/${pr._id}`)
   }

  return (
    <Box display={'flex'} height={"100vh"} >
      <div className='sidebar_container'  >
        <div>sidebar</div>
        <Link to="/new-conract" >new contract</Link>
        {contracts?.map((ele) => (
          <div className='Sidebar_items' key={ele._id} onClick={()=>handleClickOnContract(ele)}>
            {ele.name}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, marginLeft: '200px' }}>{children}</div>
    </Box>
  );
};

export default Dashboard;
