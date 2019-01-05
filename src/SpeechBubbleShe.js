import React from 'react';
import './SpeechBubble.css';

const SpeechBubbleMe = () => {
	return (
		  <div class="bubble">
		    <div class="txt">
		      <p class="name">Benni</p>
		      <p class="message">Hey, check out this Pure CSS speech bubble...</p>
		      <span class="timestamp">10:20 pm</span>
		    </div>
		    <div class="bubble-arrow"></div>
		  </div>		
		);
}

export default SpeechBubbleMe;