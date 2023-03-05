import React, { useState, useRef } from 'react';
import Sketch from 'react-p5';
import './style.css';
import canvasToImage from 'canvas-to-image';
import * as ApiService from '../../ApiService';

function Fern({ hideFern, setHideFern, post, setPost }) {
  const [iterations, setIterations] = useState(50000);
  const [param1, setParam1] = useState(0);
  const [param2, setParam2] = useState(0.04);
  // const [param3, setParam3] = useState(1.6);
  // const [param4, setParam4] = useState(0.44);
  const canvasRef = useRef(null);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(730, 520).parent(canvasParentRef);
    p5.frameRate(0.5);
    // p5.noLoop();
    canvasRef.current = p5.canvas;
  };

  const draw = (p5) => {
    console.log('hi');
    let x = 0;
    let y = 0;

    const nextPoint = () => {
      let nextX;
      let nextY;
      let r = p5.random(1);
      if (r < 0.01) {
        //1
        nextX = param1 * x + 0;
        nextY = 0.16 * y;
      } else if (r < 0.86) {
        //2
        nextX = 0.85 * x + param2 * y;
        nextY = -0.04 * x + 0.85 * y + 1.6;
      } else if (r < 0.93) {
        //3
        nextX = 0.2 * x + -0.26 * y;
        nextY = 0.23 * x + 0.22 * y;
        // nextY = 0.23 * x + 0.22 * y + param3;
      } else {
        //4
        nextX = -0.15 * x + 0.28 * y + 0;
        nextY = 0.26 * x + 0.24 * y;
        // nextY = 0.26 * x + 0.24 * y + param4;
      }
      x = nextX;
      y = nextY;
    };

    p5.background(0);
    p5.stroke(255);

    for (let i = 0; i < iterations; i++) {
      let px = p5.map(x, -2.182, 2.6558, 200, p5.width - 200);
      let py = p5.map(y, 0, 9.9983, p5.height - 30, 60);
      p5.point(px, py);
      nextPoint();
    }
  };

  const saveCanvasAsImage = async () => {
    canvasToImage(canvasRef.current);
  };

  const postCanvasAsImage = async () => {
    setHideFern(true);
    await ApiService.postImage(canvasRef.current);
    setPost(!post);
  };

  return (
    <div className='fern' style={{ display: hideFern ? 'none' : 'block' }}>
      <Sketch setup={setup} draw={draw} />
      <form>
        <div className='parameter'>
          <span>Iterations:</span>
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
        </div>
        {/* <div className='parameter'>
          <span>Plucking left leaves:</span>
          <label>{param3}</label>
          <input
            type='range'
            // name='fern'
            id='param3'
            min='-3.5'
            max='3.5'
            step='0.1'
            value={param3}
            onChange={(e) => {
              setParam3(e.target.value);
            }}
          ></input>
        </div> */}
        {/* <div className='parameter'>
          <span>Plucking right leaves:</span>
          <label>{param4}</label>
          <input
            type='range'
            name='fern'
            id='param4'
            min='-0.5'
            max='0.5'
            step='0.1'
            value={param4}
            onChange={(e) => {
              setParam4(e.target.value);
            }}
          ></input>
        </div> */}
      </form>
      <div className='buttons'>
        <button onClick={postCanvasAsImage}>Submit</button>
        <button onClick={saveCanvasAsImage}>Download</button>
      </div>
      <div className='close' onClick={() => setHideFern(true)}>
        X
      </div>
    </div>
  );
}

export default Fern;
