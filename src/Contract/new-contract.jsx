import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Api } from '../GlobalApi';
import { useParams } from 'react-router-dom';

const NewContract = ({ processedImage, setuserData, userData }) => {
  const divRef = useRef();
  const [date, setdate] = useState();
  const { token } = useParams();

  useEffect(() => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    setdate(new Date().toLocaleDateString(undefined, options));
  }, []);

  useEffect(() => {
    axios.get(`${Api}/sub-user/detail/${token}`).then((res) => {
      setuserData(res.data.user);
      divRef.current.innerHTML = res.data.html;
  
      const details = document.getElementById("details");
      details.innerHTML = `
        <div>
          <strong>Consultant:</strong>
          <p>${res.data.user?.adminId.name} <br />
          [Consultant's Address]<br />
          [City, State, Zip Code]<br />
          [Email Address]<br />
          [Phone Number]</p>
        </div>
  
        <div>
          <strong>Client:</strong>
          <p>${res.data.user?.name}<br />
          [Client's Address]<br />
          [City, State, Zip Code]<br />
          [Email Address]<br />
          [Phone Number]</p>
        </div>`;
        if (res.data.user.image) {
            const imageTag = document.getElementById("image");
            imageTag.setAttribute("src", `data:image/png;base64,${res.data.user.image}`);
        }
    });
}, [token]);



useEffect(()=>{
      if (processedImage) {
          const imageTag = document.getElementById("image");
        imageTag.setAttribute("src", processedImage);
      }
  },[processedImage])
  

  return (
    <div>
      <div ref={divRef}></div>
    </div>
  );
};

export default NewContract;
