import React, { useState } from 'react';
import axios from 'axios';

const ImageUploader = ({setProcessedImage}) => {


  const handleImageChange =async  (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image_file', file);

    const response = await axios.post('http://localhost:5000/rm-bg', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'arraybuffer',
    });
    const blob = new Blob([response.data], { type: 'image/png' });
    const objectUrl = URL.createObjectURL(blob);
    setProcessedImage(objectUrl);
  };



  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
    </div>
  );
};

export default ImageUploader;
