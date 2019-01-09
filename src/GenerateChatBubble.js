import React from 'react';
import SpeechBubbleShe from './SpeechBubbleShe';
import SpeechBubbleMe from './SpeechBubbleMe';


const GenerateChatBubble = ({chatText}) => {

			if(chatText){
				return chatText.map((item,i) => {
					let elementHeight = 52+Math.floor(item.message.length/14)*16;
					if(item.address==='local'){
						return <SpeechBubbleMe  key={i} id={i} chatItem={item.message} ipAddress={item.ipAddress} elementHeight={elementHeight} datetime={item.datetime}/>
					}else{
						return <SpeechBubbleShe  key={i} id={i} chatItem={item.message} ipAddress={item.ipAddress} elementHeight={elementHeight} datetime={item.datetime}/>
					}
					})
			}else{
				return null;
			}

		

}

export default GenerateChatBubble;