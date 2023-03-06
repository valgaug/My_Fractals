import React, { useState } from 'react';
import './style.css';

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <div className='nav-item'>
      <a href='#' className='icon-button' onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </div>
  );
}

export default NavItem;
