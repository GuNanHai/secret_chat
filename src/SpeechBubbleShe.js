import React from 'react';
import './SpeechBubble.css';


const SpeechBubbleShe = ({chatItem,ipAddress,id,elementHeight,datetime}) => {
	return (
		  <div className="bubble" id={`chatItem${id}`} 
		  style={{height: elementHeight + 'px'}}>
		    <div className="txt">
		      <p className="name">{ipAddress}<span>游客</span></p>
		      <p className="message">{chatItem}</p>
		      <span className="timestamp">{datetime}</span>
		    </div>
		    <div className="bubble-arrow"></div>
		  </div>		
		);
}

export default SpeechBubbleShe;


