import React from 'react';
import './PopInput.css'
import boy from './boy.svg';
import ChatInput from '../../ChatInput';

const PopInput = ({togglePopInput,hasPopInput,getUserInput}) => {
	if(hasPopInput){
		return <ChatInput getUserInput={getUserInput}/>;
	}else{
		return <img src={boy} className="boy-logo" alt="logo" onClick={togglePopInput} />;
	}
}

export default PopInput;