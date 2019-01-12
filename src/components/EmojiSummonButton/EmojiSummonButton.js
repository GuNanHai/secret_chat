import React from 'react';
import './EmojiSummonButton.css';
import happyFace from './happyFace.svg';



class EmojiSummonButton extends React.Component{
	constructor(props){
		super(props);
		this.state={
			emojiCalled:false
		}
	}

	shouldComponentUpdate(nextProps, nextState) {

		if (this.state.emojiCalled !== nextState.emojiCalled) {

		  return true;
		}
		return false;
	}	
	turnOnEmoji = (event) => {
		this.setState({emojiCalled:true});
	}
	turnOffEmoji = (event) => {
		this.setState({emojiCalled:false});
	}
	getEmoji = (event) => {
		let inputField = document.getElementById('input-phone');
		inputField.value = inputField.value + event.target.innerHTML;
		inputField.focus();
		this.setState({emojiCalled:false});
	}
	render(){
		console.log('EmojiSummonButton更新');
		if(this.state.emojiCalled){
			return (
					<div className="EmojiSummon">
						<img src={happyFace} alt='callEmojiSelector'/>
						<ul className="emojiList" id='emojiPanel'>
								<li onClick={this.getEmoji} key='emoji-1'><span role='img' aria-labelledby='#emojiPanel'>😀</span></li>
								<li onClick={this.getEmoji} key='emoji-2'><span role='img' aria-labelledby='#emojiPanel'>😁</span></li>
								<li onClick={this.getEmoji} key='emoji-3'><span role='img' aria-labelledby='#emojiPanel'>😂</span></li>
								<li onClick={this.getEmoji} key='emoji-4'><span role='img' aria-labelledby='#emojiPanel'>🤣</span></li>
								<li onClick={this.getEmoji} key='emoji-5'><span role='img' aria-labelledby='#emojiPanel'>😃</span></li>
								<li onClick={this.getEmoji} key='emoji-6'><span role='img' aria-labelledby='#emojiPanel'>😄</span></li>
								<li onClick={this.getEmoji} key='emoji-7'><span role='img' aria-labelledby='#emojiPanel'>😅</span></li>
								<li onClick={this.getEmoji} key='emoji-8'><span role='img' aria-labelledby='#emojiPanel'>😆</span></li>
								<li onClick={this.getEmoji} key='emoji-9'><span role='img' aria-labelledby='#emojiPanel'>😉</span></li>
								<li onClick={this.getEmoji} key='emoji-10'><span role='img' aria-labelledby='#emojiPanel'>😊</span></li>
								<li onClick={this.getEmoji} key='emoji-11'><span role='img' aria-labelledby='#emojiPanel'>😋</span></li>
								<li onClick={this.getEmoji} key='emoji-12'><span role='img' aria-labelledby='#emojiPanel'>😎</span></li>
								<li onClick={this.getEmoji} key='emoji-13'><span role='img' aria-labelledby='#emojiPanel'>😍</span></li>
								<li onClick={this.getEmoji} key='emoji-14'><span role='img' aria-labelledby='#emojiPanel'>🙄</span></li>
								<li onClick={this.getEmoji} key='emoji-15'><span role='img' aria-labelledby='#emojiPanel'>😏</span></li>
								<li onClick={this.getEmoji} key='emoji-16'><span role='img' aria-labelledby='#emojiPanel'>😣</span></li>
								<li onClick={this.getEmoji} key='emoji-17'><span role='img' aria-labelledby='#emojiPanel'>😥</span></li>
								<li onClick={this.getEmoji} key='emoji-18'><span role='img' aria-labelledby='#emojiPanel'>😪</span></li>
								<li onClick={this.getEmoji} key='emoji-19'><span role='img' aria-labelledby='#emojiPanel'>😜</span></li>
								<li onClick={this.getEmoji} key='emoji-20'><span role='img' aria-labelledby='#emojiPanel'>😒</span></li>
								<li onClick={this.getEmoji} key='emoji-21'><span role='img' aria-labelledby='#emojiPanel'>😭</span></li>
						</ul>
						<div className="dismissBGforEmoji" onClick={this.turnOffEmoji}></div>
					</div>
				);
		}else{
			return (
					<div className="EmojiSummon emojiAnimated emojiRollIn">
						<img src={happyFace} onClick={this.turnOnEmoji} alt='callEmojiSelector' />
					</div>					
				);
		}

	}
}



export default EmojiSummonButton;