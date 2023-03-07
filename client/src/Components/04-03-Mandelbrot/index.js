import React, { useState, useRef } from 'react';
import Sketch from 'react-p5';
import './style.css';
import canvasToImage from 'canvas-to-image';
import * as ApiService from '../../ApiService';

function Mandelbrot({ hideMandelbrot, setHideMandelbrot, post, setPost }) {
  // const [maxIterations, setMaxIterations] = useState(100);
  // const [param1, setParam1] = useState(66);
  // const [param2, setParam2] = useState(42);
  // const [param3, setParam3] = useState(115);
  // const [param4, setParam4] = useState(342);
  // const [param5, setParam5] = useState(378);

  const canvasRef = useRef(null);

  // const [slider, setSlider] = useState(100);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(730, 520).parent(canvasParentRef);
    // p5.pixelDensity(1);
    p5.noStroke();
    canvasRef.current = p5.canvas;
  };

  const draw = (p5) => {
    let cenX = 0;
    let cenY = 0;
    let scale = 1;

    p5.background(0);
    p5.stroke(255);
    p5.colorMode(p5.HSB);

    const pixelToPoint = (x, y) => {
      let p = p5.createVector(
        (x - p5.width / 2) * (4 / p5.width) * (73 / (52 * scale)) + cenX,
        (y - p5.height / 2) * (4 / p5.height) * (1 / scale) + cenY
      );
      return p;
    };

    const calculatePoint = (c) => {
      let z0 = p5.createVector(0, 0);
      let i = 0;
      let bounds = 2;
      let isIn = true;
      while (i < 50 && isIn) {
        z0 = p5.createVector(
          z0.x * z0.x - z0.y * z0.y + c.x,
          2 * z0.x * z0.y + c.y
        );
        i++;
        if (z0.mag() > bounds) {
          isIn = false;
        }
      }
      return {
        i: i,
        isIn: isIn,
      };
    };

    const drawBrot = () => {
      for (let x = 0; x < p5.width; x++) {
        for (let y = 0; y < p5.height; y++) {
          let c = pixelToPoint(x, y);
          let result = calculatePoint(c);
          if (result.isIn) {
            p5.set(x, y, p5.color(0));
          } else if (result.i > 1) {
            p5.set(
              x,
              y,
              p5.color(
                150 + 200 - ((p5.pow(result.i / 50, 0.5) * 200) % 255),
                80,
                100
              )
            );
          } else {
            p5.set(x, y, p5.color(50));
          }
        }
      }
      p5.updatePixels();
    };
    drawBrot();
  };

  const saveCanvasAsImage = async () => {
    canvasToImage(canvasRef.current);
  };

  const postCanvasAsImage = async () => {
    setHideMandelbrot(true);
    await ApiService.postImage(canvasRef.current);
    setPost(!post);
  };

  if (hideMandelbrot) {
    return null;
  }

  return (
    <div className='mandelbrot'>
      <Sketch setup={setup} draw={draw} />
      {/* <form>
        <div className='parameter'>
          <span>Iterations:</span>
          <label>{maxIterations}</label>
          <input
            type='range'
            name='mandelbrot'
            id='iteration'
            min='0'
            max='200'
            step='5'
            value={maxIterations}
            onChange={(e) => {
              setMaxIterations(e.target.value);
            }}
          ></input>
        </div>
        <div className='parameter'>
          <span>HSB range:</span>
          <label>{param1}</label>
          <input
            type='range'
            name='mandelbrot'
            id='HSB_range'
            min='0'
            max='100'
            step='1'
            value={param1}
            onChange={(e) => {
              setParam1(e.target.value);
            }}
          ></input>
          <br />
        </div>
        <div className='parameter'>
          <span>Hue start:</span>
          <label>{param2}</label>
          <input
            type='range'
            name='mandelbrot'
            id='param1'
            min='0'
            max='200'
            step='1'
            value={param2}
            onChange={(e) => {
              setParam2(e.target.value);
            }}
          ></input>
          <br />
        </div>
        <div className='parameter'>
          <span>Hue end:</span>
          <label>{param3}</label>
          <input
            type='range'
            name='mandelbrot'
            id='param1'
            min='0'
            max='200'
            step='1'
            value={param3}
            onChange={(e) => {
              setParam3(e.target.value);
            }}
          ></input>
          <br />
        </div>
        <div className='parameter'>
          <span>Brightness start:</span>
          <label>{param4}</label>
          <input
            type='range'
            name='mandlebrot'
            id='param1'
            min='0'
            max='800'
            step='1'
            value={param4}
            onChange={(e) => {
              setParam4(e.target.value);
            }}
          ></input>
          <br />
        </div>
        <div className='parameter'>
          <span>Brightness end:</span>
          <label>{param5}</label>
          <input
            type='range'
            name='mandelbrot'
            id='param1'
            min='0'
            max='800'
            step='1'
            value={param5}
            onChange={(e) => {
              setParam5(e.target.value);
            }}
          ></input>
          <br />
        </div>
      </form> */}
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

export default Mandelbrot;
