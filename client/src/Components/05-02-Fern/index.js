import React, { useState, useRef } from 'react';
import Sketch from 'react-p5';
import './style.css';
import canvasToImage from 'canvas-to-image';
import * as ApiService from '../../ApiService';

function Fern({ hideFern, setHideFern, post, setPost }) {
  const [iterations, setIterations] = useState(5000);
  const canvasRef = useRef(null);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(730, 520).parent(canvasParentRef);
    // p5.noLoop();
    canvasRef.current = p5.canvas;
  };

  const draw = (p5) => {
    let x = 0;
    let y = 0;

    const nextPoint = () => {
      let nextX;
      let nextY;
      let r = p5.random(1);
      if (r < 0.01) {
        //1
        nextX = 0;
        nextY = 0.16 * y;
      } else if (r < 0.86) {
        //2
        nextX = 0.85 * x + 0.04 * y;
        nextY = -0.04 * x + 0.85 * y + 1.6;
      } else if (r < 0.93) {
        //3
        nextX = 0.2 * x + -0.26 * y;
        nextY = 0.23 * x + 0.22 * y + 1.6;
      } else {
        //4
        nextX = -0.15 * x + 0.28 * y;
        nextY = 0.26 * x + 0.24 * y + 0.44;
      }
      x = nextX;
      y = nextY;
    };

    p5.background(0);
    p5.stroke(255);

    for (let i = 0; i < iterations; i++) {
      let px = p5.map(x, -2.182, 2.6558, 30, p5.width - 30);
      let py = p5.map(y, 0, 9.9983, p5.height - 20, 20);
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
          <span>Right Angle:</span>
          {/* <label>{rightAngle}°</label> */}
          <input
            type='range'
            name='fern'
            id='angle'
            min='0'
            max='90'
            step='1'
            // value={rightAngle}
            onChange={(e) => {
              // setRightAngle(e.target.value);
            }}
          ></input>
          <br />
        </div>
        <div className='parameter'>
          <span>Left Angle:</span>
          {/* <label>{rightAngle}°</label> */}
          <input
            type='range'
            name='fern'
            id='angle'
            min='0'
            max='90'
            step='1'
            // value={leftAngle}
            onChange={(e) => {
              // setLeftAngle(e.target.value);
            }}
          ></input>
          <br />
        </div>
        <div className='parameter'>
          <span>Branch ratio:</span>
          {/* <label>{ratio}</label> */}
          <input
            type='range'
            name='fern'
            id='ratio'
            min='0.5'
            max='0.79'
            step='0.01'
            // value={ratio}
            onChange={(e) => {
              // setRatio(e.target.value);
            }}
          ></input>
        </div>
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
