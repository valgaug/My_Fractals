import React from 'react';
import Sketch from 'react-p5';
import './style.css';

function Tree() {
  let theta;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(500, 500).parent(canvasParentRef);
  };

  const draw = (p5) => {
    const branch = (h) => {
      // Each branch will be 2/3rds the size of the previous one
      h *= 0.66;

      // All recursive functions must have an exit condition!!!!
      // Here, ours is when the length of the branch is 2 pixels or less
      if (h > 2) {
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
      }
    };

    p5.background(0);
    p5.frameRate(30);
    p5.stroke(255);
    // Let's pick an angle 0 to 90 degrees based on the mouse position
    let a = (p5.mouseX / p5.width) * 90;
    // let a = 45;
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
    </div>
  );
}

export default Tree;
