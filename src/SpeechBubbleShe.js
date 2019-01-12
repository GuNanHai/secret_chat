import React from 'react';
import './SpeechBubble.css';



const SpeechBubbleShe = ({chatItem,id,elementHeight,datetime,ipAddress}) => {
	console.log('SpeechBubbleShe更新');
	return (
		  <div className='bubble even'
		  id={`chatItem${id}`} 
		  style={{height:elementHeight+'px'}}>
		  	<p><span className="messageSource">来自：{ipAddress}</span>{chatItem}<span className="timestamp">{datetime}</span></p>
		  </div>	
		);
}

export default SpeechBubbleShe;


