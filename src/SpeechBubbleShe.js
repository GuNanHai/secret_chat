import React from 'react';
import './SpeechBubble.css';



const SpeechBubbleShe = ({chatItem,id,elementHeight,datetime}) => {
	return (
		  <div className='bubble even'
		  id={`chatItem${id}`} 
		  style={{height:elementHeight+'px'}}>
		  	<p>{chatItem}<span className="timestamp">{datetime}</span></p>
		  </div>	
		);
}

export default SpeechBubbleShe;


