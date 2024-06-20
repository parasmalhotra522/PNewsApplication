import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pageSize=10;
  country='in';
  apiKey = process.env.REACT_APP_API_KEY
  
  state = {
    progress:10
  }
  setProgress = (progress) => {
    this.setState({progress:progress})
  }
  

  render() {
   
    return (
      <div>
        <LoadingBar
        color='#f11946'
        height={3}
        progress={this.state.progress}
        />

        <Navbar/>
        <Routes>
          <Route path='' element={<News setProgress={this.setProgress} exact apiKey={this.apiKey} country={this.country} category='general' key='general' pageSize={this.pageSize}/>}></Route>
          <Route path='business' element={<News setProgress={this.setProgress} exact apiKey={this.apiKey} country={this.country} category='business' key='business' pageSize={this.pageSize}/>}></Route>
          <Route path='general' element={<News setProgress={this.setProgress} exact apiKey={this.apiKey} country={this.country}  category='general' key='general' pageSize={this.pageSize}/>}></Route>
          <Route path='health' element={<News setProgress={this.setProgress} exact apiKey={this.apiKey} country={this.country} category='health'  key='health' pageSize={this.pageSize}/>}></Route>
          <Route path='science' element={<News setProgress={this.setProgress} exact apiKey={this.apiKey} country={this.country} category='science' key='science' pageSize={this.pageSize}/>}></Route>
          <Route path='sports' element={<News setProgress={this.setProgress} exact apiKey={this.apiKey} country={this.country} category='sports' key='sports' pageSize={this.pageSize}/>}></Route>
          <Route path='technology' element={<News setProgress={this.setProgress} exact apiKey={this.apiKey} country={this.country} category='technology' key='technology' pageSize={this.pageSize}/>}></Route>
          <Route path='**' element={<>Not found</>}/>
        </Routes>
        
       </div>
    )
  }
}

