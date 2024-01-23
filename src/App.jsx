import { useState } from 'react'
import './App.css'
import ImageUploader from './Contract/Contract'
import ConsultingContract from './Contract/ConsultingContract'

function App() {
  const [processedImage, setProcessedImage] = useState(null);
  return (
    <>
    <ConsultingContract processedImage={processedImage} />
      <ImageUploader processedImage={processedImage} setProcessedImage={setProcessedImage} />
    </>
  )
}

export default App
