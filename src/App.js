import React,{Component} from 'react';
import MediaQuery from 'react-responsive';
import axios from 'axios'


import ChatInput from './ChatInput';
import ChatZone from './ChatZone';
import PopInput from './components/PopInput/PopInput';
import './App.css';
import EmojiSummonButton from './components/EmojiSummonButton/EmojiSummonButton';




const Url='http://45.32.227.181:5000/chatText';
const Url2='http://45.32.227.181:5000/getText';


class App extends Component{
	constructor(){
		super();
		this.state={
			chatText:[],	//用于存储本地消息条目
			isStartSendingMessage:false,
		}
	}
	shouldComponentUpdate(nextProps,nextState){
		if(this.state.chatText !== nextState.chatText){
			return true;
		}
		if(this.state.isStartSendingMessage !== nextState.isStartSendingMessage){
			return true;
		}
		return false;
	}
	componentDidMount(){
		//================================用setInterval()设定每隔一秒钟向服务器发送一次请求更新消息的request(附带本地消息存储状态chatText，用于判断更新客户端没有的新消息。)
		this.interval = setInterval(()=>{
			if(!this.state.isStartSendingMessage){ //用isStartSendingMessage判断来避免‘请求更新’动作在没有装载‘发送动作’的内容时就紧跟着这个发送动作发出，导致服务器回复了相同内容两遍（异常的一遍是服务器以为本地缺失这条消息）。
				let localText = [...this.state.chatText];//然而还是无法完全避免‘请求更新’与‘发送消息’产生的冲突。
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
								return null;
							}else{
								this.setState({chatText:localText});
							}				
					})
				.catch(err=>console.log(err));
			}
			
		}, 1000);
	}
	componentDidUpdate(){
		this.deleteChatItemWhenOverFlow();
	}
	// ==================================================================================================


// 每当用户按下回车发送消息时，消息将先送到服务器端登记后再被送回来，以'local'的形式出现再屏幕上
	getUserInput=(event)=>{

		if(event.charCode === 13 && event.target.value){
			this.setState({isStartSendingMessage:true}); //判断用户处于发送消息状态，此时禁止接受消息。
			let date = new Date();
			let datetime = `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()>9?date.getMinutes():'0'+date.getMinutes()}`
			let temp = [...this.state.chatText];
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
		// console.log('App更新');
		return (
			<div>
				<div className='chatWindow' 
	      			onClick={this.dismissInput}>	
					<ChatZone isStartSendingMessage={this.state.isStartSendingMessage} 
							  chatText={this.state.chatText}/>
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