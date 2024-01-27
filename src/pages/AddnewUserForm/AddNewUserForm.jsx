import React, { useState } from 'react';
import { Modal, TextField, Button } from '@mui/material';
import { useAppContext } from '../../contextApi/useContextHook';

const AddNewUserForm = ({open, onClose, onAddUser }) => {
  const {mySelectedContract}=useAppContext()
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(mySelectedContract);
    console.log(newUserData);
    newUserData["contractId"]=mySelectedContract._id
    newUserData["adminId"]=mySelectedContract.adminId
    onAddUser(newUserData);
    setNewUserData({
      name: '',
      email: '',
      contractId:"",
      adminId:"",
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="new-user-form" style={{ padding: '16px', background: '#fff', width: '300px', margin: 'auto', marginTop: '100px' }}>
        <h2>Add New User to contract : {mySelectedContract.name} </h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="name"
            value={newUserData.name}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={newUserData.email}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
            Add User
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default AddNewUserForm;
