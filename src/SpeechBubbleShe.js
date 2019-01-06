import React from 'react';
import './SpeechBubble.css';

const SpeechBubbleShe = ({chatItem,id,elementHeight}) => {
	return (
		  <div className="bubble" id={`chatItem${id}`} 
		  style={{height: elementHeight + 'px'
		  ,display:'block'
		  ,justifyContent:'start'
		  ,marginBottom:'15px'}}>
		    <div className="txt">
		      <p className="name">Benni</p>
		      <p className="message">{chatItem}</p>
		      <span className="timestamp">10:20 pm</span>
		    </div>
		    <div className="bubble-arrow"></div>
		  </div>		
		);
}

export default SpeechBubbleShe;


