import React from 'react';
import './ChatZone.css';


// class ChatZone extends React.Component{
// 	constructor(props){
// 		super(props);

// 	}





// 	render(){
// 	console.log('ChatZone更新');
// 	return (
// 				<div className={props.isChatZoneMouseEnter?`scrollBarV`:`scrollBarHide`}
// 				 id="ChatZone" 
// 				 onMouseEnter={props.toggleMouseEnterJudge} 
// 				 onMouseLeave={props.toggleMouseEnterJudge} 
// 				 onTouchMove={props.toggleTouchMoveJudge} >
// 					{props.children}
// 				</div>
// 	);
		
// 	}
// }



const ChatZone = (props) => {
	console.log('ChatZone更新');
	return (
				<div className={props.isChatZoneMouseEnter?`scrollBarV`:`scrollBarHide`}
				 id="ChatZone" 
				 onMouseEnter={props.toggleMouseEnterJudge} 
				 onMouseLeave={props.toggleMouseEnterJudge} 
				 onTouchMove={props.toggleTouchMoveJudge} >
					{props.children}
				</div>
	);
}

export default ChatZone;


