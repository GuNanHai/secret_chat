import React from 'react';
import './SpeechBubble.css';


const SpeechBubbleMe = ({chatItem,ipAddress,id,elementHeight,datetime}) => {
	return (
		  <div className="bubble alt" id={`chatItem${id}`} 
		  style={{height:elementHeight+'px'}}>
		    <div className="txt">
		      <p className="name alt">{ipAddress}<span>本地</span></p>
		      <p className="message">{chatItem}</p>
		      <span className="timestamp">{datetime}</span>
		    </div>
		    <div className="bubble-arrow alt"></div>
		  </div>
		);
}

export default SpeechBubbleMe;