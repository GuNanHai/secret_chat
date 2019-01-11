import React from 'react';
import './ChatInput.css';

const ChatInput = ({getUserInput}) => {
	return (

			<input id="input-phone" 
			type='text'  
			onKeyPress={getUserInput}
			autoComplete='off'/>

		);
}

export default ChatInput;
