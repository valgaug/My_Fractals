import React, { useState, useRef } from 'react';
import Sketch from 'react-p5';
import './style.css';
import canvasToImage from 'canvas-to-image';
import * as ApiService from '../../ApiService';

function Mandelbrot({ hideMandelbrot, setHideMandelbrot, post, setPost }) {
  const [maxIterations, setMaxIterations] = useState(100);
  const [param1, setParam1] = useState(66);
  const [param2, setParam2] = useState(42);
  const [param3, setParam3] = useState(115);
  const [param4, setParam4] = useState(342);
  const [param5, setParam5] = useState(378);

  const canvasRef = useRef(null);

  // const [slider, setSlider] = useState(100);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(730, 520).parent(canvasParentRef);
    // p5.frameRate(10);
    p5.pixelDensity(1);
    canvasRef.current = p5.canvas;
    // const newSlider = p5.createSlider(0, 200, 100, 1);
    // setSlider(newSlider);
  };

  const draw = (p5) => {
    // const sliderValue = slider.value();
    // p5.noLoop();
    // p5.loop();
    p5.background(0);
    p5.stroke(255);
    p5.colorMode(p5.HSB, param1);

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
    // const maxiterations = iterations;

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
        while (n < maxIterations) {
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

        const hue = p5.map(n, 0, maxIterations, param2, param3); //Hue is expressed in degrees, from red(0), through all the colors around the color wheel, and back to red (360).
        let lig = p5.map(n, 0, maxIterations, param4, param5); //Brighness the amount of light, ranging between 0 and 100. The alpha channel goes from 0 (not visible) to 1 (fully opaque).

        let colorHSB = p5.color(hue, 100, lig); //Saturation is the amount of color, and ranges between 0 and 100.
        let colorRGB = colorHSB.levels;

        if (n === maxIterations) {
          lig = 0;
          // setParam5(0);
        } else {
          // Gosh, we could make fancy colors here if we wanted
          p5.pixels[pix + 0] = colorRGB[0];
          p5.pixels[pix + 1] = colorRGB[1];
          p5.pixels[pix + 2] = colorRGB[2];
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
