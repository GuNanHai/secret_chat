import React from 'react';
import SpeechBubbleMe from './SpeechBubbleMe';

class GenerateChatBubble extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.chatText !== nextProps.chatText) {
      return true;
    }
    return false;
  }

  render() {
    if (this.props.chatText) {
      return this.props.chatText.map((item, i) => {
        let elementHeight = 52 + Math.trunc(item.message.length / 14) * 16;
        return (
          <SpeechBubbleMe
            key={`textID-${item.textID}`}
            address={item.address}
            id={`textID-${item.textID}`}
            ipAddress={item.ipAddress}
            chatItem={item.message}
            elementHeight={elementHeight}
            datetime={item.datetime}
            nickname={item.nickname}
          />
        );
      });
    } else {
      return null;
    }
  }
}

export default GenerateChatBubble;
