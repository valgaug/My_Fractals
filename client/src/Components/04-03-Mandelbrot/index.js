import React, { useState, useRef } from 'react';
import Sketch from 'react-p5';
import './style.css';
import canvasToImage from 'canvas-to-image';
import * as ApiService from '../../ApiService';
// import xpic from '../../assets/keyboard_key_x.png';
// import zpic from '../../assets/keyboard_key_z.png';
// import arrowpic from '../../assets/arrows_keys.png';

function Mandelbrot({ hideMandelbrot, setHideMandelbrot, post, setPost }) {
  const [maxIterations, setMaxIterations] = useState(30);
  const [param1, setParam1] = useState(0.5);
  const [param2, setParam2] = useState(166);
  const [param3, setParam3] = useState(11);
  const canvasRef = useRef(null);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(730, 520).parent(canvasParentRef);
    canvasRef.current = p5.canvas;
  };

  let cenX = 0;
  let cenY = 0;
  let scale = 1;

  const draw = (p5) => {
    p5.background(0);
    p5.stroke(255);
    p5.colorMode(p5.HSB);

    const pixelToPoint = (x, y) => {
      let p = p5.createVector(
        (x - p5.width / 1.53) * (2.5 / p5.width) * (73 / (52 * scale)) + cenX,
        (y - p5.height / 2) * (2.5 / p5.height) * (1 / scale) + cenY
      );
      return p;
    };

    const calculatePoint = (c) => {
      let z0 = p5.createVector(0, 0);
      let i = 0;
      let bounds = 2;
      let isIn = true;
      while (i < maxIterations && isIn) {
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
          } else if (result.i > param3) {
            p5.set(
              x,
              y,
              p5.color(
                param2 - ((p5.pow(result.i / 50, param1) * 200) % 255),
                80,
                100
              )
            );
          } else {
            p5.set(x, y, p5.color(0));
          }
        }
      }
      p5.updatePixels();
    };
    drawBrot();

    let redraw = false;
    if (p5.keyIsDown(p5.LEFT_ARROW)) {
      cenX -= (0.5 * 1) / scale;
      redraw = true;
    }
    if (p5.keyIsDown(p5.RIGHT_ARROW)) {
      cenX += (0.5 * 1) / scale;
      redraw = true;
    }
    if (p5.keyIsDown(p5.UP_ARROW)) {
      cenY -= (0.5 * 1) / scale;
      redraw = true;
    }
    if (p5.keyIsDown(p5.DOWN_ARROW)) {
      cenY += (0.5 * 1) / scale;
      redraw = true;
    }

    if (p5.keyIsDown(90)) {
      scale += scale * 0.5;
      redraw = true;
    }
    if (p5.keyIsDown(88)) {
      scale -= scale * 0.5;
      redraw = true;
    }

    if (redraw) {
      drawBrot();
    }
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
      <form>
        <div className='parameter'>
          <span>Iterations:</span>
          <label>{maxIterations}</label>
          <input
            type='range'
            name='mandelbrot'
            id='iteration'
            min='0'
            max='100'
            step='1'
            value={maxIterations}
            onChange={(e) => {
              setMaxIterations(e.target.value);
            }}
          ></input>
        </div>
        <div className='parameter'>
          <span>HSB color:</span>
          <label>{param1}</label>
          <input
            type='range'
            name='mandelbrot'
            id='HSB_range'
            min='0'
            max='1'
            step='0.01'
            value={param1}
            onChange={(e) => {
              setParam1(e.target.value);
            }}
          ></input>
          <br />
        </div>
        <div className='parameter'>
          <span>Hue:</span>
          <label>{param2}</label>
          <input
            type='range'
            name='mandelbrot'
            id='param2'
            min='0'
            max='360'
            step='1'
            value={param2}
            onChange={(e) => {
              setParam2(e.target.value);
            }}
          ></input>
          <br />
        </div>
        <div className='parameter'>
          <span>Off limit:</span>
          <label>{param3}</label>
          <input
            type='range'
            name='mandlebrot'
            id='param1'
            min='0'
            max='17'
            step='0.1'
            value={param3}
            onChange={(e) => {
              setParam3(e.target.value);
            }}
          ></input>
          <br />
        </div>
        <div className='keys'>
          <div className='parameter'>
            <span>Zoom in:</span>
            <label>Z key</label>
            <br />
          </div>
          <div className='parameter'>
            <span>Zoom out:</span>
            <label>X key</label>
            <br />
          </div>
          <div className='parameter'>
            <span>Move:</span>
            <label>Arrow keys</label>
            <br />
          </div>
        </div>
        {/* <div className='parameter'>
          <span>Zoom in:</span>
          <label>
            Z key
            <img className='keypic' src={zpic} alt=''></img>
          </label>
          <br />
        </div>
        <div className='key'>
          <span>Zoom out:</span>
          <label>
            <img src={xpic} alt=''></img>
          </label>
          <br />
        </div>
        <div className='key'>
          <span>Move:</span>
          <label>
            <img src={arrowpic} alt=''></img>
          </label>
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

export default Mandelbrot;
