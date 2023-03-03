import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Components/01-NavBar';
import Title from './Components/02-Title';
import Collection from './Components/03-Collection';
import Creation from './Components/04-Creation';
import Tree from './Components/05-01-Tree';
import * as ApiService from './ApiService';
import homeFractal from './assets/fractal-home.jpeg';

function App() {
  const [hide, setHide] = useState(true);
  const [sources, setSources] = useState([]);
  const [post, setPost] = useState(false);

  useEffect(() => {
    async function fetching() {
      let sources = await ApiService.getSources();
      setSources(sources);
    }
    fetching();
  }, [post]);

  return (
    <div className='App'>
      <Navbar />
      <Title />
      <div className='nav-title'>
        {/* <div className='home-image'> */}
        {/* <img src={homeFractal} alt='' /> */}
        {/* </div> */}
      </div>
      <Collection sources={sources} />
      <Creation setHide={setHide} />
      <Tree hide={hide} setHide={setHide} post={post} setPost={setPost} />
    </div>
  );
}

export default App;
