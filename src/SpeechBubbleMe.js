import React from 'react';
import './SpeechBubble.css';

let bubbleStyle = '';
let situation = '';
const SpeechBubbleMe = ({address,chatItem,id,elementHeight,datetime,ipAddress}) => {
	// console.log('SpeechBubbleMe更新');

	if(address === 'local'){
		bubbleStyle = 'odd';
		situation = '本地：';

	}else{
		bubbleStyle = 'even';
		situation = '来自：';
	}
	return (
		  <div className={`bubble ${bubbleStyle}`}
		  id={`chatItem${id}`} 
		  style={{height:elementHeight+'px'}}>
		  	<p><span className="messageSource">{situation}{ipAddress}</span>{chatItem}<span className="timestamp">{datetime}</span></p>
		  </div>
		);
}

export default SpeechBubbleMe;
