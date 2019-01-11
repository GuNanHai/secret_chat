import React,{Component} from 'react';
import * as $ from 'jquery';
import MediaQuery from 'react-responsive';
import axios from 'axios'


import GenerateChatBubble from './GenerateChatBubble'
import ChatInput from './ChatInput';
import ChatZone from './ChatZone';
import PopInput from './components/PopInput/PopInput';
import './App.css';
import EmojiSummonButton from './components/EmojiSummonButton/EmojiSummonButton';




const Url='http://45.32.227.181:5000/chatText';
const Url2='http://45.32.227.181:5000/getText';

let delayOffChatZoneTouched;

class App extends Component{
	constructor(){
		super();
		this.state={
			chatText:[],	//用于存储本地消息条目
			isChatZoneMouseEnter:false,
			isChatZoneTouched:false,
			
			isStartSendingMessage:false
		}
	}
	componentDidMount(){
		//================================用setInterval()设定每隔一秒钟向服务器发送一次请求更新消息的request(附带本地消息存储状态chatText，用于判断更新客户端没有的新消息。)
		this.interval = setInterval(()=>{
			if(!this.state.isStartSendingMessage){ //用isStartSendingMessage判断来避免‘请求更新’动作在没有装载‘发送动作’的内容时就紧跟着这个发送动作发出，导致服务器回复了相同内容两遍（异常的一遍是服务器以为本地缺失这条消息）。
				let localText = this.state.chatText;//然而还是无法完全避免‘请求更新’与‘发送消息’产生的冲突。
				let localTextLength = localText.length;
				let data = {
					localText:localText
				}
				axios({
					method: 'post',
					url: Url2,
					data:{
						data
					}
				})
				.then(response=>{
					response.data.map(each=>{
							localText.push({
							textID:each.textID,
							message:each.text,
							address:each.address,
							ipAddress:each.ipAddress,
							datetime:each.datetime
						})
						return undefined;
					})
							if(localTextLength===localText.length){
								return ;
							}else{
								this.setState({chatText:localText});
								this.chatZoneBarToBottom();
							}				
					})
				.catch(err=>console.log(err));
			}
			
		}, 1000);
	}
	componentDidUpdate(){
		this.chatZoneBarToBottom();
		this.deleteChatItemWhenOverFlow();
	}
	// ==================================================================================================


// 每当用户按下回车发送消息时，消息将先送到服务器端登记后再被送回来，以'local'的形式出现再屏幕上
	getUserInput=(event)=>{

		if(event.charCode === 13 && event.target.value){
			this.setState({isStartSendingMessage:true}); //判断用户处于发送消息状态，此时禁止接受消息。
			let date = new Date();
			let datetime = `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()>9?date.getMinutes():'0'+date.getMinutes()}`
			let temp = this.state.chatText;
			let chatText = {
				text:event.target.value,
				datetime:datetime
			}
			axios({
				method: 'post',
				url: Url,
				data:{
					chatText
				}
			})
			.then(response=>{
					temp.push({
					textID:response.data.textID,
					message:response.data.text,
					address:response.data.address,
					ipAddress:response.data.ipAddress,
					datetime:response.data.datetime
				})
					this.setState({chatText:temp});
					this.setState({isStartSendingMessage:false}) //判断用户离开发送消息状态，此时重启接受消息。
			})
			.catch(err=>console.log(err))



			
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
		delayOffChatZoneTouched = setTimeout(()=>this.setState({isChatZoneTouched:false}),5000);
	}

	// 使聊天窗口在每次更新后始终处于最底部，当鼠标进入chatZone时不会执行此功能,手机环境时当手指滑动聊天区域后停止执行此功能，若手指不再滑动10秒后重启此功能。
	chatZoneBarToBottom = () => {

		if(!this.state.isChatZoneMouseEnter && !this.state.isChatZoneTouched){
			$('#ChatZone').scrollTop($('#ChatZone')[0].scrollHeight);
		}
	}
	//=======限制本地消息条数不超出150条===============================

	deleteChatItemWhenOverFlow(){
		if(this.state.chatText.length>150){
			let temp = this.state.chatText;
			temp.shift();
			this.setState({chatText:temp});
		}		
	}




	render(){
		const {chatText,isChatZoneMouseEnter,} = this.state;
		return (
			<div>
				<div className='chatWindow' 
	      			onClick={this.dismissInput}>	
					<ChatZone isChatZoneMouseEnter={isChatZoneMouseEnter}
					 toggleMouseEnterJudge={this.toggleMouseEnterJudge} 
					 toggleTouchMoveJudge={this.toggleTouchMoveJudge} >
						<GenerateChatBubble chatText={chatText} />
					</ChatZone>
					
					<MediaQuery query="(min-width: 500px)">
						<div className='inputPlusEmoji'>
							<ChatInput getUserInput={this.getUserInput} />
							<EmojiSummonButton />							
						</div>
					</MediaQuery>
				</div>
				<MediaQuery query="(max-width: 500px)">
	      			<PopInput getUserInput={this.getUserInput}/>
				</MediaQuery>				
			</div>

			);

	}
} 

export default App;