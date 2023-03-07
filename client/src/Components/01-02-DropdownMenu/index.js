import React from 'react';
import './style.css';
import DropDownItem from '../01-03-DropDownItem';

function DropdownMenu() {
  return (
    <div className='dropdown'>
      <DropDownItem>Public Collection</DropDownItem>
      <DropDownItem>2D Creation</DropDownItem>
      <DropDownItem>3D Creation</DropDownItem>
      <DropDownItem>Documentation</DropDownItem>
    </div>
  );
}

export default DropdownMenu;
