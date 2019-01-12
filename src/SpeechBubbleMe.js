import React from 'react';
import './SpeechBubble.css';

let bubbleStyle = '';

const SpeechBubbleMe = ({address,chatItem,id,elementHeight,datetime,ipAddress}) => {
	// console.log('SpeechBubbleMe更新');

	if(address === 'local'){
		bubbleStyle = 'odd';
	}else{
		bubbleStyle = 'even';
	}
	return (
		  <div className={`bubble ${bubbleStyle}`}
		  id={`chatItem${id}`} 
		  style={{height:elementHeight+'px'}}>
		  	<p><span className="messageSource">本地：{ipAddress}</span>{chatItem}<span className="timestamp">{datetime}</span></p>
		  </div>
		);
}

export default SpeechBubbleMe;
