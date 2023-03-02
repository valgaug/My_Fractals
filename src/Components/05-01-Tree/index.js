import React, { useState, useRef } from 'react';
import Sketch from 'react-p5';
import './style.css';
import canvasToImage from 'canvas-to-image';

function Tree({ hide, setHide }) {
  const [iteration, setIteration] = useState(6);
  const [angle, setAngle] = useState(45);
  const [ratio, setRatio] = useState(0.55);
  const canvasRef = useRef(null);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(730, 550).parent(canvasParentRef);
    canvasRef.current = p5.canvas;
  };

  const draw = (p5) => {
    let theta;
    let recursion = 0;

    //recursive branch function
    const branch = (h) => {
      h *= ratio;
      if (recursion < iteration) {
        recursion++;
        p5.push(); // Save the current state of transformation (i.e. where are we now)
        p5.rotate(theta);
        p5.line(0, 0, 0, -h); // Draw the branch
        p5.translate(0, -h); // Move to the end of the branch
        branch(h); // Ok, now call myself to draw two new branches!!
        p5.pop(); // Whenever we get back here, we "pop" in order to restore the previous matrix state

        // Repeat the same thing, only branch off to the "left" this time!
        p5.push();
        p5.rotate(-theta);
        p5.line(0, 0, 0, -h);
        p5.translate(0, -h);
        branch(h);
        p5.pop();
        recursion--;
      }
    };

    p5.background(255);
    p5.stroke(0);
    let a = angle;
    theta = p5.radians(a);
    p5.translate(p5.width / 2, p5.height);
    p5.line(0, 0, 0, -120);
    p5.translate(0, -120);
    branch(120);
  };

  const saveCanvasAsImage = async () => {
    canvasToImage(canvasRef.current);
    setHide(false);
  };

  return (
    <div className='tree' style={{ display: hide ? 'none' : 'block' }}>
      <Sketch setup={setup} draw={draw} />

      <form>
        <label>Iterations: {iteration}</label>
        <br />
        <input
          type='range'
          name='tree'
          id='iteration'
          min='0'
          max='12'
          step='1'
          value={iteration}
          onChange={(e) => {
            setIteration(e.target.value);
          }}
        ></input>{' '}
        <br />
        <label>Angle: {angle}°</label>
        <br />
        <input
          type='range'
          name='tree'
          id='angle'
          min='0'
          max='90'
          step='1'
          value={angle}
          onChange={(e) => {
            setAngle(e.target.value);
          }}
        ></input>
        <br />
        <label>Branch ratio: {ratio}</label>
        <br />
        <input
          type='range'
          name='tree'
          id='ratio'
          min='0.5'
          max='0.79'
          step='0.01'
          value={ratio}
          onChange={(e) => {
            setRatio(e.target.value);
          }}
        ></input>
        <br />
        <div className='buttons'>
          <button>Submit</button>
          <button onClick={saveCanvasAsImage}>Download</button>
        </div>
      </form>
      <div className='close' onClick={() => setHide(true)}>
        X
      </div>
    </div>
  );
}

export default Tree;
