import React from 'react';

import './PopInput.css';
import boy from './boy.svg';
import ChatInput from '../../ChatInput';
import EmojiSummonButton from '../EmojiSummonButton/EmojiSummonButton';

class PopInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPopInput: false,
      hasInfoAppear: false
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ hasInfoAppear: true }), 10000);
  }

  // ============弹出形式的输入框的开关动作
  togglePopInput = event => {
    this.setState({ hasPopInput: true });
    setTimeout(() => document.getElementById('chatInput').focus(), 500);
  };
  dismissInput = event => {
    if (this.state.hasPopInput) {
      this.setState({ hasPopInput: false });
    }
  };

  render() {
    // console.log('PopInput更新');
    if (this.state.hasPopInput) {
      return (
        <div>
          <ChatInput getUserInput={this.props.getUserInput} />
          <div className="frameForOnClickEvent" onClick={this.dismissInput} />
          <EmojiSummonButton />
        </div>
      );
    } else {
      return (
        <div
          className={this.state.hasInfoAppear ? 'popInfoAchieved' : 'popInfo'}
        >
          <div
            className={
              this.state.hasInfoAppear
                ? 'popInfoAchievedPlaceHolder'
                : 'popInfoAchievedPlaceHolderInit'
            }
          />
          <img
            src={boy}
            className="boy-logo"
            alt="logo"
            onClick={this.togglePopInput}
          />
        </div>
      );
    }
  }
}

export default PopInput;
