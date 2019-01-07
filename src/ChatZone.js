import React from 'react';
import './ChatZone.css';

const ChatZone = (props) => {

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


