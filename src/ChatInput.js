import React from 'react';
import './ChatInput.css';

class ChatInput extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.getUserInput !== nextProps.getUserInput) {
      return true;
    }
    return false;
  }
  render() {
    // console.log('ChatInput更新');
    return (
      <input
        id="chatInput"
        type="text"
        onKeyPress={this.props.getUserInput}
        autoComplete="off"
        className="animated rollIn   "
      />
    );
  }
}

export default ChatInput;
