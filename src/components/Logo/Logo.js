import React from 'react';
import Tilt from 'react-tilt';
import logo from './logo.png';

const Logo =() =>{
  return(
<div className='ma4 mt0'>
   <Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 150, width: 150 }} >
 <div className="Tilt-inner pa1">
 <img style={{padding:'3px'}} alt='logo'src={logo}/>
 {'Hi, I am Reogo'}
 </div>
</Tilt>
</div>
  )
}

export default Logo;
