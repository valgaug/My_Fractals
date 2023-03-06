import React from 'react';
import './style.css';
import ThreeDTreePic from '../../assets/sym-tree-pic.png';

function ThreeDCreation({ setHide3DTree }) {
  return (
    <div className='creation' id='threeD-creation-id'>
      <div className='threeD-creation-title'>3D Creation</div>
      <div className='fractals'>
        <div className='creation-tree' id='sym-tree'>
          <img
            src={ThreeDTreePic}
            alt='Tree pic'
            onClick={() => setHide3DTree(false)}
          ></img>
          <div className='threeD-fractal-title'>3D Tree</div>
        </div>
      </div>
    </div>
  );
}

export default ThreeDCreation;
