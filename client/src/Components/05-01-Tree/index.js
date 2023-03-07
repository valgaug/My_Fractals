import React, { useState, useRef } from 'react';
import Sketch from 'react-p5';
import './style.css';
import canvasToImage from 'canvas-to-image';
import * as ApiService from '../../ApiService';

function ThreeDTree({ hide3DTree, setHide3DTree, post, setPost }) {
  // const [rotateSlider, setRotateSlider] = useState(0);
  const [iteration, setIteration] = useState(4);
  const [yAngle, setYAngle] = useState(100);
  const [zAngle, setZAngle] = useState(30);
  const [ratio, setRatio] = useState(0.55);
  const [red, setRed] = useState(80);
  const [green, setGreen] = useState(120);
  const [blue, setBlue] = useState(40);

  const canvasRef = useRef(null);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(730, 520, p5.WEBGL).parent(canvasParentRef);
    canvasRef.current = p5.canvas;
    p5.angleMode(p5.DEGREES);
  };

  const draw = (p5) => {
    p5.background(255);
    p5.translate(0, p5.height / 2 - 20, 0);
    p5.rotateY(p5.frameCount);
    // p5.rotateY(rotateSlider);
    let recursion = 0;

    const branch = (len) => {
      p5.strokeWeight(p5.map(len, 10, 100, 0.5, 5));
      p5.stroke(70, 40, 20);

      p5.line(0, 0, 0, 0, -len - 2, 0);
      p5.translate(0, -len, 0);
      if (recursion < iteration) {
        for (let i = 0; i < 3; i++) {
          recursion++;
          p5.rotateY(yAngle); // Y angle between 100 and 140
          p5.push();
          p5.rotateZ(zAngle);
          branch(len * ratio); // between 20 and 50
          p5.pop();
          recursion--;
        }
      } else {
        p5.fill(red, green, blue, 200);
        p5.translate(5, 0, 0);
        p5.rotateZ(5, 0, 0);
        p5.beginShape();
        for (let i = 45; i < 135; i++) {
          let rad = 7;
          let x = rad * p5.cos(i);
          let y = rad * p5.sin(i);
          p5.vertex(x, y);
        }
        for (let i = 135; i > 45; i--) {
          let rad = 7;
          let x = rad * p5.cos(i);
          let y = rad * p5.sin(-i) + 10;
          p5.vertex(x, y);
        }
        p5.endShape(p5.CLOSE);
      }
    };

    branch(130);
  };

  const saveCanvasAsImage = async () => {
    canvasToImage(canvasRef.current);
  };

  const postCanvasAsImage = async () => {
    setHide3DTree(true);
    await ApiService.postImage(canvasRef.current);
    setPost(!post);
  };

  if (hide3DTree) {
    return null;
  }

  return (
    <div className='tree'>
      <Sketch setup={setup} draw={draw}></Sketch>
      <form>
        <div className='parameter'>
          <span>Iterations:</span>
          <label>{iteration}</label>
          <input
            type='range'
            name='tree'
            id='iteration'
            min='0'
            max='8'
            step='1'
            value={iteration}
            onChange={(e) => {
              setIteration(e.target.value);
            }}
          ></input>
        </div>
        <div className='parameter'>
          <span>Angle Y:</span>
          <label>{yAngle}°</label>
          <input
            type='range'
            name='tree'
            id='angle'
            min='100'
            max='140'
            step='1'
            value={yAngle}
            onChange={(e) => {
              setYAngle(e.target.value);
            }}
          ></input>
        </div>
        <div className='parameter'>
          <span>Angle Z:</span>
          <label>{zAngle}°</label>
          <input
            type='range'
            name='tree'
            id='angle'
            min='20'
            max='50'
            step='1'
            value={zAngle}
            onChange={(e) => {
              setZAngle(e.target.value);
            }}
          ></input>
        </div>
        <div className='parameter'>
          <span>Branch ratio:</span>
          <label>{ratio}</label>
          <input
            type='range'
            name='tree'
            id='ratio'
            min='0'
            max='0.7'
            step='0.01'
            value={ratio}
            onChange={(e) => {
              setRatio(e.target.value);
            }}
          ></input>
        </div>
        <div className='parameter'>
          <span>Red:</span>
          <label>{red}</label>
          <input
            type='range'
            name='tree'
            id='ratio'
            min='0'
            max='255'
            step='1'
            value={red}
            onChange={(e) => {
              setRed(e.target.value);
            }}
          ></input>
        </div>
        <div className='parameter'>
          <span>Green:</span>
          <label>{green}</label>
          <input
            type='range'
            name='tree'
            id='ratio'
            min='0'
            max='255'
            step='1'
            value={green}
            onChange={(e) => {
              setGreen(e.target.value);
            }}
          ></input>
        </div>
        <div className='parameter'>
          <span>Blue:</span>
          <label>{blue}</label>
          <input
            type='range'
            name='tree'
            id='ratio'
            min='0'
            max='255'
            step='1'
            value={blue}
            onChange={(e) => {
              setBlue(e.target.value);
            }}
          ></input>
        </div>
        {/* <div className='parameter'>
          <span>Rotate:</span>
          <label>{rotateSlider}°</label>
          <input
            type='range'
            name='3Dtree'
            id='slider-rotate'
            min='0'
            max='360'
            step='1'
            value={rotateSlider}
            onChange={(e) => {
              setRotateSlider(e.target.value);
            }}
          ></input>
        </div> */}
      </form>
      <div className='buttons'>
        <button onClick={postCanvasAsImage}>Submit</button>
        <button onClick={saveCanvasAsImage}>Download</button>
      </div>
      <div className='close' onClick={() => setHide3DTree(true)}>
        X
      </div>
    </div>
  );
}

export default ThreeDTree;
