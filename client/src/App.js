import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Components/01-NavBar';
import Title from './Components/02-Title';
import Collection from './Components/03-Collection';
import Creation from './Components/04-Creation';
import Tree from './Components/05-01-Tree';
import Fern from './Components/05-02-Fern';
import Mandelbrot from './Components/05-03-Mandelbrot';
import * as ApiService from './ApiService';
import './fonts/ClimateCrisis-Regular.ttf';

function App() {
  const [hideTree, setHideTree] = useState(true);
  const [hideFern, setHideFern] = useState(true);
  const [hideMandelbrot, setHideMandelbrot] = useState(true);
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
      <div className='nav-title'></div>
      <Collection sources={sources} />
      <Creation
        setHideTree={setHideTree}
        setHideFern={setHideFern}
        setHideMandelbrot={setHideMandelbrot}
      />
      <Tree
        hideTree={hideTree}
        setHideTree={setHideTree}
        post={post}
        setPost={setPost}
      />
      <Fern
        hideFern={hideFern}
        setHideFern={setHideFern}
        post={post}
        setPost={setPost}
      />
      <Mandelbrot
        hideMandelbrot={hideMandelbrot}
        setHideMandelbrot={setHideMandelbrot}
        post={post}
        setPost={setPost}
      />
    </div>
  );
}

export default App;
