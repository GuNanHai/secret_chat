import React,{Component} from 'react';
import * as $ from 'jquery';
import MediaQuery from 'react-responsive';



import GenerateChatBubble from './GenerateChatBubble'
import ChatInput from './ChatInput';
import ChatZone from './ChatZone';
import PopInput from './components/PopInput/PopInput';
import './App.css';




let addressTemp = 'local';
let delayOffChatZoneTouched;

class App extends Component{
	constructor(){
		super();
		this.state={
			chatText:[],
			isChatZoneMouseEnter:false,
			isChatZoneTouched:false,
			hasPopInput:false
		}
	}
	componentDidUpdate(){
		this.deleteChatItemWhenOverFlow();
		this.chatZoneBarToBottom();
	}

	getUserInput=(event)=>{

		if(event.charCode === 13 && event.target.value){
			let temp = this.state.chatText;
			addressTemp==='local'?addressTemp='remote':addressTemp='local';
			temp.push({
				message:event.target.value,
				address:addressTemp          /*未来用于判断消息是否本地发出*/
			});
			this.setState({chatText:temp});
			event.target.value='';
			this.setState({isChatZoneTouched:false})
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

	togglePopInput=(event)=>{
		this.setState({hasPopInput:true});
	}
	dismissInput=(event)=>{
		if(this.state.hasPopInput){
			this.setState({hasPopInput:false});
		}
	}


	render(){
		const {chatText,isChatZoneMouseEnter,} = this.state

		return (
			<div>
				<div className='chatWindow' onClick={this.dismissInput}>	
					<ChatZone isChatZoneMouseEnter={isChatZoneMouseEnter}
					 toggleMouseEnterJudge={this.toggleMouseEnterJudge} 
					 toggleTouchMoveJudge={this.toggleTouchMoveJudge}>
						<GenerateChatBubble chatText={chatText} />
					</ChatZone>
					
					<MediaQuery query="(min-width: 500px)">
						<ChatInput getUserInput={this.getUserInput} />
					</MediaQuery>
				</div>
				<MediaQuery query="(max-width: 500px)">
	      			<PopInput togglePopInput={this.togglePopInput} 
	      			hasPopInput={this.state.hasPopInput} 
	      			getUserInput={this.getUserInput} />
				</MediaQuery>				
			</div>

			);
	}
} 

export default App;