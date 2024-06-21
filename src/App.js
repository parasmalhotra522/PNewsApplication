import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

const App = () => {

  const pageSize=10;
  const country='us';
  const apiKey = process.env.REACT_APP_API_KEY
  const [progress, setProgress] = useState(10);
  
    return (
      <div>
        <LoadingBar
        color='#f11946'
        height={3}
        progress={progress}
        />

        <Navbar/>
        <Routes>
          <Route path='' element={<News setProgress={setProgress} exact apiKey={apiKey} country={country} category='general' key='general' pageSize={pageSize}/>}></Route>
          <Route path='business' element={<News setProgress={setProgress} exact apiKey={apiKey} country={country} category='business' key='business' pageSize={pageSize}/>}></Route>
          <Route path='general' element={<News setProgress={setProgress} exact apiKey={apiKey} country={country}  category='general' key='general' pageSize={pageSize}/>}></Route>
          <Route path='health' element={<News setProgress={setProgress} exact apiKey={apiKey} country={country} category='health'  key='health' pageSize={pageSize}/>}></Route>
          <Route path='science' element={<News setProgress={setProgress} exact apiKey={apiKey} country={country} category='science' key='science' pageSize={pageSize}/>}></Route>
          <Route path='sports' element={<News setProgress={setProgress} exact apiKey={apiKey} country={country} category='sports' key='sports' pageSize={pageSize}/>}></Route>
          <Route path='technology' element={<News setProgress={setProgress} exact apiKey={apiKey} country={country} category='technology' key='technology' pageSize={pageSize}/>}></Route>
         
        </Routes>
        
       </div>
    )
}

export default App;

