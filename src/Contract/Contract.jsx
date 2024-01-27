import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./Consulting.css"
const ImageUploader = ({setProcessedImage}) => {

const {token}=useParams()
  const handleImageChange =async  (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image_file', file);

    const response = await axios.post(`http://localhost:5000/sub-user/submit-sign/${token}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'arraybuffer',
    });
    const blob = new Blob([response.data], { type: 'image/png' });
    const objectUrl = URL.createObjectURL(blob);
    setProcessedImage(objectUrl);
    await axios.get(`http://localhost:5000/sub-user/send-mail/${token}`).then((res)=>{
    if(res.data.status){
      alert(res.data.message)
    }
    })
  };



  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
    </div>
  );
};

export default ImageUploader;
