import React, { useState, useRef } from 'react';
import Sketch from 'react-p5';
import './style.css';
import canvasToImage from 'canvas-to-image';
import * as ApiService from '../../ApiService';

function Tree({ hideTree, setHideTree, post, setPost }) {
  const [iteration, setIteration] = useState(6);
  const [rightAngle, setRightAngle] = useState(30);
  const [leftAngle, setLeftAngle] = useState(30);
  const [ratio, setRatio] = useState(0.55);
  const canvasRef = useRef(null);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(730, 520).parent(canvasParentRef);
    canvasRef.current = p5.canvas;
  };

  const draw = (p5) => {
    let rightTheta;
    let leftTheta;
    let recursion = 0;

    //recursive branch function
    const branch = (h) => {
      h *= ratio;
      if (recursion < iteration) {
        recursion++;
        // right branches
        p5.push(); // Save the current state of transformation (i.e. where are we now)
        p5.rotate(rightTheta);
        p5.line(0, 0, 0, -h);
        p5.translate(0, -h);
        branch(h);
        p5.pop(); // Restore the previous matrix state

        // left branches
        p5.push();
        p5.rotate(-leftTheta);
        p5.line(0, 0, 0, -h);
        p5.translate(0, -h);
        branch(h);
        p5.pop();
        recursion--;
      }
    };

    p5.background(0);
    p5.stroke(255);

    rightTheta = p5.radians(rightAngle);
    leftTheta = p5.radians(leftAngle);
    p5.translate(p5.width / 2, p5.height);
    p5.line(0, 0, 0, -120);
    p5.translate(0, -120);
    branch(120);
  };

  const saveCanvasAsImage = async () => {
    canvasToImage(canvasRef.current);
  };

  const postCanvasAsImage = async () => {
    setHideTree(true);
    await ApiService.postImage(canvasRef.current);
    setPost(!post);
  };

  if (hideTree) {
    return null;
  }

  return (
    <div className='tree'>
      <Sketch setup={setup} draw={draw} />
      <form>
        <div className='parameter'>
          <span>Iterations:</span>
          <label>{iteration}</label>
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
          ></input>
        </div>
        <div className='parameter'>
          <span>Right Angle:</span>
          <label>{rightAngle}°</label>
          <input
            type='range'
            name='tree'
            id='angle'
            min='0'
            max='90'
            step='1'
            value={rightAngle}
            onChange={(e) => {
              setRightAngle(e.target.value);
            }}
          ></input>
          <br />
        </div>
        <div className='parameter'>
          <span>Left Angle:</span>
          <label>{leftAngle}°</label>
          <input
            type='range'
            name='tree'
            id='angle'
            min='0'
            max='90'
            step='1'
            value={leftAngle}
            onChange={(e) => {
              setLeftAngle(e.target.value);
            }}
          ></input>
          <br />
        </div>
        <div className='parameter'>
          <span>Branch ratio:</span>
          <label>{ratio}</label>
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
        </div>
      </form>
      <div className='buttons'>
        <button onClick={postCanvasAsImage}>Submit</button>
        <button onClick={saveCanvasAsImage}>Download</button>
      </div>
      <div className='close' onClick={() => setHideTree(true)}>
        X
      </div>
    </div>
  );
}

export default Tree;
