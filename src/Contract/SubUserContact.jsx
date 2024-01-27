import React from 'react'
import { useState } from 'react'
import ImageUploader from "./Contract"
import NewContract from './new-contract'
const SubUserContact = () => {
    const [processedImage, setProcessedImage] = useState(null);
    const [userData, setuserData] = useState({})
  return (
    <>
     <NewContract processedImage={processedImage} userData={userData} setuserData={setuserData} />
     {userData.signed===true|| processedImage ? "":<ImageUploader setProcessedImage={setProcessedImage} /> }
    </>
  )
}

export default SubUserContact