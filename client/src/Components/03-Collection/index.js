import React, { useEffect, useState } from 'react';
import './style.css';
import * as ApiService from '../../ApiService';

function Collection() {
  const [sources, setSources] = useState([]);

  useEffect(() => {
    async function fetching() {
      let sources = await ApiService.getSources();
      setSources(sources);
    }
    fetching();
  }, []);

  return (
    <div className='collection'>
      Collection
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
