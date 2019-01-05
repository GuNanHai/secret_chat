import React from 'react';

const ChatZone = (props) => {
	return (
	<div style={{ display:'grid'
	,justifyContent:'center'
	,justifyItems:'center'
	,width:'600px'
	,margin:'auto'
	,marginTop:'20px'
	,gridGap:'20px'
	}} id="ChatZone">
		{props.children}
	</div>);
}

export default ChatZone;


