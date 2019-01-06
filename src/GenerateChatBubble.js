import React from 'react';
import SpeechBubbleShe from './SpeechBubbleShe';
import SpeechBubbleMe from './SpeechBubbleMe';


const GenerateChatBubble = ({chatText}) => {

			if(chatText){
				return chatText.map((item,i) => {
					let elementHeight = 52+Math.floor(item.message.length/14)*16;
					if(item.address==='local'){
						return <SpeechBubbleMe  key={i} id={i} chatItem={item.message} elementHeight={elementHeight} />
					}else{
						return <SpeechBubbleShe  key={i} id={i} chatItem={item.message} elementHeight={elementHeight} />
					}
					})
			}else{
				return null;
			}

		

}

export default GenerateChatBubble;