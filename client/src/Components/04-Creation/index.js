import React from 'react';
import './style.css';
import symTreePic from '../../assets/sym-tree-pic.png';
import fern from '../../assets/fern.png';

function Creation({ setHideTree, setHideFern }) {
  return (
    <div className='creation'>
      <div className='creation-title'>2D Creation</div>
      <div className='fractals'>
        <div className='creation-tree' id='sym-tree'>
          <img src={symTreePic} alt='Symetric tree'></img>
          <button onClick={() => setHideTree(false)}>Tree</button>
        </div>
        <div className='creation-tree' id='fern'>
          <img src={fern} alt='Symetric tree'></img>
          <button onClick={() => setHideFern(false)}>Fern</button>
        </div>
      </div>
    </div>
  );
}

export default Creation;
