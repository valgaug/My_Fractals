import React from 'react';
import './style.css';
import treePic from '../../assets/sym-tree-pic.png';
import fernPic from '../../assets/fern.png';
import mandelbrotPic from '../../assets/mandelbrot.png';

function Creation({ setHideTree, setHideFern, setHideMandelbrot }) {
  return (
    <div className='creation' id='2D-creation-id'>
      <div className='creation-title'>2D Creation</div>
      <div className='fractals'>
        <div className='creation-tree' id='sym-tree'>
          <img
            src={treePic}
            alt='Tree pic'
            onClick={() => setHideTree(false)}
          ></img>
          <div className='fractal-title'>Tree</div>
        </div>
        <div className='creation-tree' id='fern'>
          <img
            src={fernPic}
            alt='Fern pic'
            onClick={() => setHideFern(false)}
          ></img>
          <div className='fractal-title'>Fern</div>
        </div>
        <div className='creation-tree' id='mandelbrot'>
          <img
            src={mandelbrotPic}
            alt='Mandelbrot pic'
            onClick={() => setHideMandelbrot(false)}
          ></img>
          <div className='fractal-title'>Mandelbrot</div>
        </div>
      </div>
    </div>
  );
}

export default Creation;
