import React from 'react';
import SpeechBubbleShe from './SpeechBubbleShe';
import SpeechBubbleMe from './SpeechBubbleMe';


class GenerateChatBubble extends React.Component{


	shouldComponentUpdate(nextProps, nextState) {

		if (this.props.chatText !== nextProps.chatText) {

		  return true;
		}
		return false;
	}	

	render(){
			console.log('GenerateChatBubble更新');
			if(this.props.chatText){
				return this.props.chatText.map((item,i) => {
					let elementHeight = 52+Math.trunc(item.message.length/14)*16;
					if(item.address==='local'){
						return <SpeechBubbleMe  key={`textID-${item.textID}`} id={`textID-${item.textID}`} ipAddress={item.ipAddress} chatItem={item.message}  elementHeight={elementHeight} datetime={item.datetime}/>
					}else{
						return <SpeechBubbleShe  key={`textID-${item.textID}`} id={`textID-${item.textID}`} ipAddress={item.ipAddress} chatItem={item.message}  elementHeight={elementHeight} datetime={item.datetime}/>
					}
					})
			}else{
				return null;
			}
	}









}


export default GenerateChatBubble;