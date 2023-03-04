import React from 'react';
import './style.css';
import symTreePic from '../../assets/sym-tree-pic.png';
import asymTreePic from '../../assets/asym-tree-pic.png';

function Creation({ setHideTree, setHideFern }) {
  return (
    <div className='creation'>
      <div className='creation-title'>2D Creation</div>
      <div className='fractals'>
        <div className='creation-tree' id='sym-tree'>
          <img src={symTreePic} alt='Symetric tree'></img>
          <button onClick={() => setHideTree(false)}>Symetric tree</button>
        </div>
        <div className='creation-tree' id='fern'>
          <img src={asymTreePic} alt='Symetric tree'></img>
          <button onClick={() => setHideFern(false)}>Fern</button>
        </div>
      </div>
    </div>
  );
}

export default Creation;
