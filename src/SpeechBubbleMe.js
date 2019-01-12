import React from 'react';
import './SpeechBubble.css';


const SpeechBubbleMe = ({chatItem,id,elementHeight,datetime,ipAddress}) => {
	console.log('SpeechBubbleMe更新');
	return (
		  <div className='bubble odd'
		  id={`chatItem${id}`} 
		  style={{height:elementHeight+'px'}}>
		  	<p><span className="messageSource">本地：{ipAddress}</span>{chatItem}<span className="timestamp">{datetime}</span></p>
		  </div>
		);
}

export default SpeechBubbleMe;
