import React,{Component} from 'react';
import ChatInput from './ChatInput';
import * as $ from 'jquery';
import './App.css';
import Particles from 'react-particles-js';


import ChatZone from './ChatZone';
import Grid from '@material-ui/core/Grid'


import GenerateChatBubble from './GenerateChatBubble'

let addressTemp = 'local';

const particlesOptions = {
  particles: {
    number: {
      value:200,
      density: {
        enable:true,
        value_area: 800
      }
    }
  }
}

class App extends Component{
	constructor(){
		super();
		this.state={
			chatText:[],
			scrollBarVisibility:false
		}
	}

	getUserInput=(event)=>{

		if(event.charCode === 13){

		let temp = this.state.chatText;
		addressTemp==='local'?addressTemp='remote':addressTemp='local';
		temp.push({
			message:event.target.value,
			address:addressTemp          /*未来用于判断消息是否本地发出*/
		});
		this.setState({chatText:temp});
		event.target.value='';
		}

	}

	toggleScrollBar=(event)=>{
		this.state.scrollBarVisibility?this.setState({scrollBarVisibility:false}):this.setState({scrollBarVisibility:true});
	}



	deleteChatItemWhenOverFlow(){
		if(this.state.chatText.length>50){
			let temp = this.state.chatText;
			temp.shift();
			this.setState({chatText:temp});
		}		
	}
	componentDidUpdate(){
		this.deleteChatItemWhenOverFlow();
		$('#ChatZone').scrollTop($('#ChatZone')[0].scrollHeight);

		// 使聊天窗口在每次更新后始终处于最底部
		
	}
	render(){
		const {chatText,scrollBarVisibility,} = this.state

		return (
			<div>
				<Particles className='particles' params={particlesOptions}/>
				<Grid container justify = "center">	
					<ChatZone scrollBarVisibility={scrollBarVisibility} toggleScrollBar={this.toggleScrollBar}>
						<GenerateChatBubble chatText={chatText} />
					</ChatZone>
					<ChatInput getUserInput={this.getUserInput}/>
				</Grid>
			</div>

			);
	}
} 

export default App;