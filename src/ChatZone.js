import React from 'react';
import './ChatZone.css';

const ChatZone = (props) => {

	return (

				<div className={props.scrollBarVisibility?`scrollBarV`:`scrollBarHide`}
				 id="ChatZone" 
				 onMouseEnter={props.toggleScrollBar} 
				 onMouseLeave={props.toggleScrollBar} >
					{props.children}
				</div>

		



	);
}

export default ChatZone;


