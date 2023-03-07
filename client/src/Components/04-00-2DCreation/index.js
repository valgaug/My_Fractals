import React from 'react';
import './style.css';
import treePic from '../../assets/sym-tree-pic.png';
import fernPic from '../../assets/fern.png';
import mandelbrotPic from '../../assets/mandelbrot.png';

function Creation({ setHideTree, setHideFern, setHideMandelbrot }) {
  return (
    <div className='creation' id='twoD-creation-id'>
      <div className='twoD-creation-title'>2D Creation</div>
      <div className='fractals'>
        <div className='creation-tree' id='sym-tree'>
          <img
            src={treePic}
            alt='Tree pic'
            className='img-creation'
            onClick={() => setHideTree(false)}
          ></img>
          <div className='twoD-fractal-title'>Tree</div>
        </div>
        <div className='creation-tree' id='fern'>
          <img
            src={fernPic}
            alt='Fern pic'
            className='img-creation'
            onClick={() => setHideFern(false)}
          ></img>
          <div className='twoD-fractal-title'>Fern</div>
        </div>
        <div className='creation-tree' id='mandelbrot'>
          <img
            src={mandelbrotPic}
            alt='Mandelbrot pic'
            className='img-creation'
            onClick={() => setHideMandelbrot(false)}
          ></img>
          <div className='twoD-fractal-title'>Mandelbrot</div>
        </div>
      </div>
    </div>
  );
}

export default Creation;
