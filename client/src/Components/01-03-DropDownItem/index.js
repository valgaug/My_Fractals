import React from 'react';
import './style.css';

function DropdownMenuItem(props) {
  const handleClickScroll = () => {
    if (props.children === 'Public Collection') {
      var element = document.getElementById('collec-id');
    } else if (props.children === '2D Creation') {
      element = document.getElementById('twoD-creation-id');
    } else if (props.children === '3D Creation') {
      element = document.getElementById('threeD-creation-id');
    } else if (props.children === 'Documentation') {
      element = document.getElementById('doc-id');
    }
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className='drop-items' onClick={handleClickScroll}>
      {props.children}
    </div>
  );
}

export default DropdownMenuItem;
