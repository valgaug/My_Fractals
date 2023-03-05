import React, { useState, useRef } from 'react';
import Sketch from 'react-p5';
import './style.css';
import canvasToImage from 'canvas-to-image';
import * as ApiService from '../../ApiService';

function Fern({ hideMandelbrot, setHideMandelbrot, post, setPost }) {
  // const [iterations, setIterations] = useState(50000);
  const canvasRef = useRef(null);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(730, 520).parent(canvasParentRef);
    // p5.noLoop();
    canvasRef.current = p5.canvas;
  };

  const draw = (p5) => {
    p5.background(0);
    p5.stroke(255);
  };

  const saveCanvasAsImage = async () => {
    canvasToImage(canvasRef.current);
  };

  const postCanvasAsImage = async () => {
    setHideMandelbrot(true);
    await ApiService.postImage(canvasRef.current);
    setPost(!post);
  };

  return (
    <div
      className='fern'
      style={{
        display: hideMandelbrot ? 'none' : 'block',
      }}
    >
      <Sketch setup={setup} draw={draw} />
      <form>
        {/*       <div className='parameter'>
          <span>Iterations (=nb of points):</span>
          <label>{iterations}</label>
          <input
            type='range'
            name='fern'
            id='iteration'
            min='0'
            max='40000'
            step='100'
            value={iterations}
            onChange={(e) => {
              setIterations(e.target.value);
            }}
          ></input>
        </div>
        <div className='parameter'>
          <span>Turning stems to leaves:</span>
          <label>{param1}</label>
          <input
            type='range'
            name='fern'
            id='param1'
            min='-0.5'
            max='0.5'
            step='0.01'
            value={param1}
            onChange={(e) => {
              setParam1(e.target.value);
            }}
          ></input>
          <br />
        </div>
        <div className='parameter'>
          <span>Changing fern tilt:</span>
          <label>{param2}</label>
          <input
            type='range'
            name='fern'
            id='param2'
            min='-0.1'
            max='0.1'
            step='0.005'
            value={param2}
            onChange={(e) => {
              setParam2(e.target.value);
            }}
          ></input>
          <br />
        </div> */}
      </form>
      <div className='buttons'>
        <button onClick={postCanvasAsImage}>Submit</button>
        <button onClick={saveCanvasAsImage}>Download</button>
      </div>
      <div className='close' onClick={() => setHideMandelbrot(true)}>
        X
      </div>
    </div>
  );
}

export default Fern;
