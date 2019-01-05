import React from 'react';
import SpeechBubbleShe from './SpeechBubbleShe';
import SpeechBubbleMe from './SpeechBubbleMe';


const GenerateChatBubble = ({chatText}) => {

			if(chatText){
				return chatText.map((item,i) => <SpeechBubbleMe  key={i} id={i} chatItem={item} />);
			}else{
				return null;
			}

		

}

export default GenerateChatBubble;