import React from 'react';
import './style.css';

function DropdownMenuItem(props) {
  return (
    <a href='#' className='a-tag'>
      {props.children}
    </a>
  );
}

export default DropdownMenuItem;
