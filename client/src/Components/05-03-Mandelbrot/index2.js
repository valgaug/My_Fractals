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
    p5.pixelDensity(1);
    canvasRef.current = p5.canvas;
  };

  const draw = (p5) => {
    p5.background(0);
    p5.stroke(255);

    // Establish a range of values on the complex plane
    // A different range will allow us to "zoom" in or out on the fractal

    // It all starts with the width, try higher or lower values
    const w = 3.5;
    const h = (w * p5.height) / p5.width;

    // Start at negative half the width and height
    const xmin = -w / 1.5;
    const ymin = -h / 2;

    // Make sure we can write to the pixels[] array.
    // Only need to do this once since we don't do any other drawing.
    p5.loadPixels();

    // Maximum number of iterations for each point on the complex plane
    const maxiterations = 1000;

    // x goes from xmin to xmax
    const xmax = xmin + w;
    // y goes from ymin to ymax
    const ymax = ymin + h;

    // Calculate amount we increment x,y for each pixel
    const dx = (xmax - xmin) / p5.width;
    const dy = (ymax - ymin) / p5.height;

    // Start y
    let y = ymin;
    for (let j = 0; j < p5.height; j++) {
      // Start x
      let x = xmin;
      for (let i = 0; i < p5.width; i++) {
        // Now we test, as we iterate z = z^2 + cm does z tend towards infinity?
        let a = x;
        let b = y;
        let n = 0;
        while (n < maxiterations) {
          const aa = a * a;
          const bb = b * b;
          const twoab = 2.0 * a * b;
          a = aa - bb + x;
          b = twoab + y;
          // Infinity in our finite world is simple, let's just consider it 16
          if (p5.dist(aa, bb, 0, 0) > 16) {
            break; // Bail
          }
          n++;
        }

        // We color each pixel based on how long it takes to get to infinity
        // If we never got there, let's pick the color black
        const pix = (i + j * p5.width) * 4;
        const norm = p5.map(n, 0, maxiterations, 0, 1);
        let bright = p5.map(p5.sqrt(norm), 0, 1, 0, 255);
        if (n === maxiterations) {
          bright = 0;
        } else {
          // Gosh, we could make fancy colors here if we wanted
          p5.pixels[pix + 0] = bright;
          p5.pixels[pix + 1] = bright;
          p5.pixels[pix + 2] = bright;
          p5.pixels[pix + 3] = 255;
        }
        x += dx;
      }
      y += dy;
    }
    p5.updatePixels();
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
