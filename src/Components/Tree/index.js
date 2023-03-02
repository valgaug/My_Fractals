import React, { useState } from 'react';
import Sketch from 'react-p5';
import './style.css';

function Tree() {
  const [angle, setAngle] = useState(45);
  const [iteration, setIteration] = useState(6);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(500, 500).parent(canvasParentRef);
  };

  const draw = (p5) => {
    let theta;
    let recursion = 0;

    const branch = (h) => {
      // Each branch will be 2/3rds the size of the previous one
      h *= 0.66;
      // All recursive functions must have an exit condition!!!!
      // Here, ours is when the length of the branch is 2 pixels or less
      if (recursion < iteration) {
        recursion++;
        p5.push(); // Save the current state of transformation (i.e. where are we now)
        p5.rotate(theta); // Rotate by theta
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

    p5.background(0);
    p5.frameRate(30);
    p5.stroke(255);
    // Let's pick an angle 0 to 90 degrees based on the mouse position
    // let a = (p5.mouseX / p5.width) * 90;
    let a = angle;
    // Convert it to radians
    theta = p5.radians(a);
    // Start the tree from the bottom of the screen
    p5.translate(p5.width / 2, p5.height);
    // Draw a line 120 pixels
    p5.line(0, 0, 0, -120);
    // Move to the end of that line
    p5.translate(0, -120);
    // Start the recursive branching!
    branch(120);
  };

  return (
    <div className='Tree'>
      <Sketch setup={setup} draw={draw} />

      <form>
        <label for='iteration'>Iteration: {iteration}</label>
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

        <label for='angle'>Angle: {angle}°</label>
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
      </form>
    </div>
  );
}

export default Tree;
