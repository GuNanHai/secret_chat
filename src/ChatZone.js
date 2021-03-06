import React from 'react';
import * as $ from 'jquery';

import './ChatZone.css';
import GenerateChatBubble from './GenerateChatBubble';

let delayOffChatZoneTouched;

class ChatZone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChatZoneMouseEnter: false,
      isChatZoneTouched: false
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.isChatZoneMouseEnter !== nextState.isChatZoneMouseEnter) {
      return true;
    }
    if (this.state.isChatZoneTouched !== nextState.isChatZoneTouched) {
      return true;
    }
    if (this.props.isStartSendingMessage !== nextProps.isStartSendingMessage) {
      return true;
    }
    if (this.props.chatText !== nextProps.chatText) {
      return true;
    }
    return false;
  }

  componentDidMount() {
    this.chatZoneBarToBottom();
  }
  componentDidUpdate() {
    this.chatZoneBarToBottom();
    if (this.props.isStartSendingMessage === true) {
      this.setState({ isChatZoneTouched: false });
    }
  }
  // 聊天窗口是否活动的相关Function================================

  toggleMouseEnterJudgeOn = event => {
    this.setState({ isChatZoneMouseEnter: true });
  };
  toggleMouseEnterJudgeOff = event => {
    this.setState({ isChatZoneMouseEnter: false });
  };
  toggleTouchMoveJudge = event => {
    if (delayOffChatZoneTouched) {
      clearTimeout(delayOffChatZoneTouched);
    }
    this.setState({ isChatZoneTouched: true });
    delayOffChatZoneTouched = setTimeout(
      () => this.setState({ isChatZoneTouched: false }),
      5000
    );
  };

  // 使聊天窗口在每次更新后始终处于最底部，当鼠标进入chatZone时不会执行此功能,手机环境时当手指滑动聊天区域后停止执行此功能，若手指不再滑动10秒后重启此功能。
  chatZoneBarToBottom = () => {
    if (!this.state.isChatZoneMouseEnter && !this.state.isChatZoneTouched) {
      $('#ChatZone').scrollTop($('#ChatZone')[0].scrollHeight);
    }
  };

  render() {
    // console.log('ChatZone更新');
    return (
      <div
        className={
          this.state.isChatZoneMouseEnter ? `scrollBarV` : `scrollBarHide`
        }
        id="ChatZone"
        onMouseEnter={this.toggleMouseEnterJudgeOn}
        onMouseLeave={this.toggleMouseEnterJudgeOff}
        onTouchMove={this.toggleTouchMoveJudge}
      >
        <GenerateChatBubble chatText={this.props.chatText} />
      </div>
    );
  }
}

export default ChatZone;
