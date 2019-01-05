import React,{Component} from 'react';
import ChatInput from './ChatInput';

import ChatZone from './ChatZone';
import Grid from '@material-ui/core/Grid'

import GenerateChatBubble from './GenerateChatBubble'


class App extends Component{
	constructor(){
		super();
		this.state={
			chatText:[]
		}
	}

	getUserInput=(event)=>{

		if(event.charCode === 13){

		let temp = this.state.chatText
		temp.push(event.target.value);
		this.setState({chatText:temp});
		event.target.value='';
		}
		
	}
	deleteChatItemWhenOverFlow(chatZoneHeight){
		if(chatZoneHeight>556){
			let temp = this.state.chatText;
			temp.shift();
			this.setState({chatText:temp});
		}		
	}
	componentDidUpdate(){
		let chatZoneHeight=document.getElementById("ChatZone").clientHeight;
		this.deleteChatItemWhenOverFlow(chatZoneHeight);
	}
	render(){
		return (
			<div>
				
				<Grid container justify = "center">	
					<ChatZone>
						<GenerateChatBubble chatText={this.state.chatText}/>
					</ChatZone>
					<ChatInput getUserInput={this.getUserInput}/>
				</Grid>
			</div>

			);
	}
} 

export default App;