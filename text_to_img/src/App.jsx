import { useState } from 'react'
import './App.css'

function App() {
  const [searchImg, setSearchImg] = useState("");
  const [generatedImg, setGeneratedImg] = useState("");

  const API_TOKEN = "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";

  async function query(){
    try{
      const response = await fetch (
        "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
        {
          headers: { Authorization: `Bearer ${API_TOKEN}` },
        method: "POST",
        body: JSON.stringify({inputs: searchImg}),
        }
      );
      const result = await response.blob();
      console.log(result);

      const imgSrc = URL.createObjectURL(result)
      setGeneratedImg(imgSrc);
    }
     catch(error){
     console.log(error);
    }
  }
  const showImage = () => {
    query();
    setSearchImg("");
  };


  return (
    <>
    <div className='container'>
    <div className='searchCnt'>
    <input className='seachBox' type="text" value={searchImg} onChange={(e) => setSearchImg(e.target.value)} />
     <button className='searchBtn'
      onClick={showImage}
     >Search</button>

    </div>
      
    <img className='imgDsply' src={generatedImg} alt="Image to be Dispalyed" style={{ width: "400px", height: "400px"}} />
   
    </div>
    
    </>
  )
}

export default App
