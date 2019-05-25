import React from 'react';
import './ImgLinkForm.css';


const ImgLinkForm =({onInputChange, onButtonSubmit}) =>{
  return(
<div className='fa3'>
<h3>{'This app will detect faces in your pictures'} </h3>
<div className='center' >
<div className='form center pa4 br3 shadow-3'>
<input type='text' onChange={onInputChange} placeholder='Paste image link and hit detect' className='f4 pa2 w-70 center'/>
<button onClick={onButtonSubmit} className='w-30 grow f4 link ph3 pv2 dib white bg-black'>Detect </button>
</div>
</div>
</div>
  )
}

export default ImgLinkForm;
