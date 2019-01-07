import React,{Component} from 'react';
import ChatInput from './ChatInput';
import * as $ from 'jquery';


import ChatZone from './ChatZone';
import Grid from '@material-ui/core/Grid'


import GenerateChatBubble from './GenerateChatBubble'

let addressTemp = 'local';
let delayOffChatZoneTouched;

class App extends Component{
	constructor(){
		super();
		this.state={
			chatText:[],
			isChatZoneMouseEnter:false,
			isChatZoneTouched:false
		}
	}
	componentDidUpdate(){
		this.deleteChatItemWhenOverFlow();
		this.chatZoneBarToBottom();
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
	// 聊天窗口是否活动的相关Function================================
	toggleMouseEnterJudge=(event)=>{
		this.state.isChatZoneMouseEnter?this.setState({isChatZoneMouseEnter:false}):this.setState({isChatZoneMouseEnter:true});
	}
	toggleTouchMoveJudge=(event)=>{
		if(delayOffChatZoneTouched){
			clearTimeout(delayOffChatZoneTouched);
		}
		this.setState({isChatZoneTouched:true});
		delayOffChatZoneTouched = setTimeout(()=>this.setState({isChatZoneTouched:false}),10000);
	}
	// 使聊天窗口在每次更新后始终处于最底部，当鼠标进入chatZone时不会执行此功能,手机环境时当手指滑动聊天区域后停止执行此功能，若手指不再滑动10秒后重启此功能。
	chatZoneBarToBottom = () => {
		if(!this.state.isChatZoneMouseEnter && !this.state.isChatZoneTouched){
			$('#ChatZone').scrollTop($('#ChatZone')[0].scrollHeight);
		}
	}
	//======================================================

	deleteChatItemWhenOverFlow(){
		if(this.state.chatText.length>50){
			let temp = this.state.chatText;
			temp.shift();
			this.setState({chatText:temp});
		}		
	}



	render(){
		const {chatText,isChatZoneMouseEnter,} = this.state

		return (
			<Grid container justify = "center">	
				<ChatZone isChatZoneMouseEnter={isChatZoneMouseEnter}
				 toggleMouseEnterJudge={this.toggleMouseEnterJudge} 
				 toggleTouchMoveJudge={this.toggleTouchMoveJudge}>
					<GenerateChatBubble chatText={chatText} />
				</ChatZone>
				<ChatInput getUserInput={this.getUserInput}/>
			</Grid>
			);
	}
} 

export default App;