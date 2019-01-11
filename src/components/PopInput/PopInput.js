import React from 'react';
import * as $ from 'jquery';

import './PopInput.css'
import boy from './boy.svg';
import ChatInput from '../../ChatInput';

const PopInput = ({togglePopInput,hasPopInput,getUserInput}) => {
	if(hasPopInput){
		return <ChatInput getUserInput={getUserInput}/>;
	}else{
		return (
			<div className="popInfo">
				<img src={boy} 
					className="boy-logo" 
					alt="logo" 
					onClick={togglePopInput} />
			</div>
			)
	}
}

export default PopInput;