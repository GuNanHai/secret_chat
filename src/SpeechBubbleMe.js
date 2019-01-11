import React from 'react';
import './SpeechBubble.css';


const SpeechBubbleMe = ({chatItem,id,elementHeight,datetime}) => {
	return (
		  <div className='bubble odd'
		  id={`chatItem${id}`} 
		  style={{height:elementHeight+'px'}}>
		  	<p>{chatItem}<span className="timestamp">{datetime}</span></p>
		  </div>
		);
}

export default SpeechBubbleMe;
