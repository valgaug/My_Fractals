import React from 'react';
import './style.css';

function Collection({ sources }) {
  return (
    <div className='collection'>
      {sources &&
        sources.map((source, i) => (
          <div className='collec_image' key={i}>
            <img src={source} alt='fractal_pic'></img>
          </div>
        ))}
    </div>
  );
}

export default Collection;
