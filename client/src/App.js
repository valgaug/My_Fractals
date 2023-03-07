import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from './Components/01-00-NavBar';
import NavItem from './Components/01-01-NavItem';
import DropdownMenu from './Components/01-02-DropdownMenu';
import Title from './Components/02-Title';
import Collection from './Components/03-Collection';
import TwoDCreation from './Components/04-00-2DCreation';
import Tree from './Components/04-01-Tree';
import Fern from './Components/04-02-Fern';
import Mandelbrot from './Components/04-03-Mandelbrot';
import ThreeDCreation from './Components/05-00-3DCreation';
import ThreeDTree from './Components/05-01-Tree';
import Doc from './Components/06-00-Documentation';
import * as ApiService from './ApiService';
import './fonts/ClimateCrisis-Regular.ttf';
import { ReactComponent as Menu } from './icons/menu.svg';

function App() {
  const [hideTree, setHideTree] = useState(true);
  const [hideFern, setHideFern] = useState(true);
  const [hideMandelbrot, setHideMandelbrot] = useState(true);
  const [hide3DTree, setHide3DTree] = useState(true);
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
      <NavBar>
        <NavItem icon={<Menu />}>
          <DropdownMenu />
        </NavItem>
      </NavBar>
      <Title />
      <div className='nav-title'></div>
      <Collection sources={sources} />
      <TwoDCreation
        setHideTree={setHideTree}
        setHideFern={setHideFern}
        setHideMandelbrot={setHideMandelbrot}
      />{' '}
      <ThreeDCreation setHide3DTree={setHide3DTree} />
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
      <ThreeDTree
        hide3DTree={hide3DTree}
        setHide3DTree={setHide3DTree}
        post={post}
        setPost={setPost}
      />
      <Doc />
    </div>
  );
}

export default App;
