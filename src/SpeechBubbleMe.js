import React from 'react';
import './SpeechBubble.css';

const SpeechBubbleMe = ({chatItem,id,elementHeight}) => {
	return (
		  <div className="bubble alt" id={`chatItem${id}`} 
		  style={{height:elementHeight+'px'
		  ,display:'block'
		  ,marginLeft:'auto'
		  ,marginBottom:'15px'}}>
		    <div className="txt">
		      <p className="name alt">+353 87 1234 567<span> ~ John</span></p>
		      <p className="message">{chatItem}</p>
		      <span className="timestamp">10:22 pm</span>
		    </div>
		    <div className="bubble-arrow alt"></div>
		  </div>
		);
}

export default SpeechBubbleMe;