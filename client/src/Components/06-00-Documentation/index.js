import React from 'react';
import './style.css';
import branchingPic from '../../assets/DrainageMalamud.jpg';
import cyclone from '../../assets/cyclon.jpeg';
import triangle from '../../assets/sierpinski_triangle.webp';
import koch from '../../assets/koch.jpeg';
import mandelbrotPic from '../../assets/mandelbrot2.jpeg';

function Doc() {
  return (
    <div className='doc' id='doc-id'>
      <div className='doc-title'>Documentation</div>
      <h1 className='firstHeading'>
        <span>What is a fractal?</span>
      </h1>
      <div className='info'>
        <p>
          A fractal is a never ending pattern that repeats itself at different
          scales. This property is called “Self-Similarity.” Fractals are
          extremely complex, sometimes infinitely complex - meaning you can zoom
          in and find the same shapes forever. Amazingly, fractals are extremely
          simple to make. A fractal is made by repeating a simple process again
          and again. You can find fractals in Nature, in Geometry and in
          Algebra.
        </p>
      </div>
      <h1 className='secondHeading'>
        <span>Natural Fractal</span>
      </h1>
      <h2>
        <span>Branching</span>
      </h2>
      <div className='info'>
        <p>
          Fractals are found all over nature, spanning a huge range of scales.
          We find the same patterns again and again, from the tiny branching of
          our blood vessels and neurons to the branching of trees, lightning
          bolts, and river networks. Regardless of scale, these patterns are all
          formed by repeating a simple branching process. A fractal is a picture
          that tells the story of the process that created it.
          <br />
          <img src={branchingPic} alt=''></img>
          <br />
          <div className='comment'>
            River network in China, formed by erosion from repeated rainfall
            flowing downhill for millions of years.
          </div>
        </p>
      </div>

      <h2>
        <span>Spiral</span>
      </h2>
      <div className='info'>
        <p>
          The spiral is another extremely common fractal in nature, found over a
          huge range of scales. Biological spirals are found in the plant and
          animal kingdoms, and non-living spirals are found in the turbulent
          swirling of fluids and in the pattern of star formation in galaxies.
          All fractals are formed by simple repetition, and combining expansion
          and rotation is enough to generate the ubiquitous spiral.
          <img src={cyclone} alt=''></img>
          <br />
          <div className='comment'>
            A hurricane is a self-organizing spiral in the atmosphere, driven by
            the evaporation and condensation of sea water.
          </div>
        </p>
      </div>
      <h1 className='secondHeading'>
        <span>Geometric Fractal</span>
      </h1>
      <div className='info'>
        <p>
          Purely geometric fractals can be made by repeating a simple process.
          The Sierpinski Triangle is made by repeatedly removing the middle
          triangle from the prior generation. The number of colored triangles
          increases by a factor of 3 each step, 1,3,9,27,81,243,729, etc.
          <img src={triangle} alt=''></img> <br />
          <div className='comment'>The Sierpinski Triangle</div>
          <br />
          The Koch Curve is made by repeatedly replacing each segment of a
          generator shape with a smaller copy of the generator. At each step, or
          iteration, the total length of the curve gets longer, eventually
          approaching infinity. Much like a coastline, the length of the curve
          increases the more closely you measure it.
          <img src={koch} alt=''></img>
          <br />
          <div className='comment'>The Koch Curve</div>
        </p>
      </div>
      <br />

      <h1 className='secondHeading'>
        <span>Algebraic Fractals</span>
      </h1>
      <div className='info'>
        <p>
          We can also create fractals by repeatedly calculating a simple
          equation over and over. Because the equations must be calculated
          thousands or millions of times, we need computers to explore them. Not
          coincidentally, the Mandelbrot Set was discovered in 1980, shortly
          after the invention of the personal computer.
          <h2>
            <span>How does the Mandelbrot set work?</span>
          </h2>
          We start by plugging a value for the variable ‘C’ into the simple
          equation below. Each complex number is actually a point in a
          2-dimensional plane. The equation gives an answer, ‘Znew’ . We plug
          this back into the equation, as ‘Zold’ and calculate it again. We are
          interested in what happens for different starting values of ‘C’.
          Generally, when you square a number, it gets bigger, and then if you
          square the answer, it gets bigger still. Eventually, it goes to
          infinity. This is the fate of most starting values of ‘C’. However,
          some values of ‘C’ do not get bigger, but instead get smaller, or
          alternate between a set of fixed values. These are the points inside
          the Mandelbrot Set, which we color black. Outside the Set, all the
          values of ‘C’ cause the equation to go to infinity, and the colors are
          proportional to the speed at which they expand.
          <img src={mandelbrotPic} alt=''></img>
          The interesting places in ths fractal are all on the edge. We can zoom
          in forever, and never find a clear edge. The deeper we explore, the
          longer the numbers become, and the slower the calculations are. Deep
          fractal exploration takes patience!
        </p>
      </div>
      <h1 className='secondHeading'>
        <span>Code in Javascript</span>
      </h1>
      <h2>
        <span>Tree</span>
      </h2>
      <svg viewBox='0 0 100 100'>
        <script>if (a=0) {}</script>
      </svg>
    </div>
  );
}

export default Doc;
