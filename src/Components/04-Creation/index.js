import React from 'react';
import './style.css';
import symTreePic from '../../assets/sym-tree-pic.png';
import asymTreePic from '../../assets/asym-tree-pic.png';

function Creation({ setHide }) {
  return (
    <div className='creation'>
      <div className='creation-title'>CREATION</div>
      <div className='fractals'>
        <div className='creation-tree' id='sym-tree'>
          <img src={symTreePic} alt='Symetric tree'></img>
          <button onClick={() => setHide(false)}>Symetric tree</button>
        </div>
        <div className='creation-tree' id='asym-tree'>
          <img src={asymTreePic} alt='Symetric tree'></img>
          <button onClick={() => setHide(false)}>Asymetric tree</button>
        </div>
      </div>
    </div>
  );
}

export default Creation;
