import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../contextApi/useContextHook'
import Dashboard from '../Dashboard/Dashboard'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Api } from '../../GlobalApi'
import AddNewUserForm from '../AddnewUserForm/AddNewUserForm'

const AllUserDetailsForOneContract = () => {
  const {id}=useParams()
  const {setMySelectedContract}=useAppContext()
  const [isModalOpen, setModalOpen] = useState(false);
  const [usersArray, setusersArray] = useState([])
  const token=window.sessionStorage.getItem("token")
  const handleAddUser = (userData) => {
    axios.post(`${Api}/admin/add-subuser`,userData,{headers:{Authorization:`Bearer ${token}`}}).then((res)=>{
      if(res.data.status){
        setusersArray([...usersArray,res.data.user._doc])
      }else{
        alert(res.data.message)
      }
    })
    setModalOpen(false);
  };
  useEffect(() => {
    axios.get(`${Api}/admin/single-contract/${id}`,{headers:{Authorization:`Bearer ${token}`}}).then((res)=>{
      setMySelectedContract(res.data.data)
      setusersArray(res.data.data.subUsers)
    })
  }, [id])
  
  return (
    <Dashboard>
    <div>
      <button onClick={()=>setModalOpen(true)} > Adduser </button>
      {usersArray.length>0?
       (
        usersArray.map((e)=>{
        return(
          <UserCard key={e._id} usersArray={usersArray} setusersArray={setusersArray} data={e} />
        )
      })):(
        <div>
          <p>
          No user yet in this contract. Addusers?
          </p> 
            </div>
      )}
    </div>
    <AddNewUserForm  open={isModalOpen} onClose={() => setModalOpen(false)} onAddUser={handleAddUser} />
    </Dashboard>
    
  )
}


const UserCard=({data,usersArray,setusersArray})=>{
  const token=window.sessionStorage.getItem("token")
  const {mySelectedContract}=useAppContext()
  const requestNewLink = () => { 
axios.put(`${Api}/admin/gen-new-link/${data._id}`,{},{headers:{Authorization:`Bearer ${token}`}}).then((res)=>{
  if(res.data.status){
    const changedArray=usersArray.map((e)=>{
      if(e._id.toString()===res.data.user._doc._id.toString()){
        e.link=res.data.user._doc.link
      }
      return e
    })
    setusersArray(changedArray)
  }
})
}




const changeSignedStatus = () => { 
axios.put(`${Api}/admin/change-signed-status`,{userId:data._id,contractId:data.contractId},{headers:{Authorization:`Bearer ${token}`}}).then((res)=>{
    alert(res.data.message)
    if(res.data.status){
      const changedArray=usersArray.map((e)=>{
        if(e._id.toString()===res.data.user._id.toString()){
          e.signed=res.data.user.signed
        }
        return e
      })
      setusersArray(changedArray)
    }
})
 }
    return(
      <div key={data._id} className='user_card' >
     <h2>name : {data.name} </h2>
     <h3> Email : {data.email} </h3>
        <p>Contract name : {mySelectedContract.name}  </p>
        <p>Link : {data.link} </p>
        <p>signed status : {data.signed? "signed":"pending"}</p>
        <button onClick={requestNewLink} >generate new Link</button>
        <button onClick={changeSignedStatus} >change signed Status</button>
      </div>
    )
}

export default AllUserDetailsForOneContract