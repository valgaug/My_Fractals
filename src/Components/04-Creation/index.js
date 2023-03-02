import React from 'react';
import './style.css';

function Creation({ setHide }) {
  return (
    <div className='creation'>
      <div className='sym-tree'>
        <img src='' alt='Symetric tree'></img>
        <button onClick={() => setHide(false)}>Symetric tree</button>
      </div>
    </div>
  );
}

export default Creation;
