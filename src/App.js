import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import axios from 'axios';

import ChatInput from './ChatInput';
import ChatZone from './ChatZone';
import PopInput from './components/PopInput/PopInput';
import './App.css';
import EmojiSummonButton from './components/EmojiSummonButton/EmojiSummonButton';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

const Url = 'http://45.32.99.213:5000/chatText';
const Url2 = 'http://45.32.99.213:5000/getText';
const UrlRegister = 'http://45.32.99.213:5000/register';
const UrlLogin = 'http://45.32.99.213:5000/login';

class App extends Component {
  constructor() {
    super();
    this.state = {
      chatText: [], //用于存储本地消息条目
      isStartSendingMessage: false,
      loginStatus: 'logout',
      userinfo: {
        nickname: ''
      }
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.chatText !== nextState.chatText) {
      return true;
    }
    if (this.state.isStartSendingMessage !== nextState.isStartSendingMessage) {
      return true;
    }
    if (this.state.loginStatus !== nextState.loginStatus) {
      return true;
    }
    return false;
  }
  componentDidMount() {
    //================================用setInterval()设定每隔500ms钟向服务器发送一次请求更新消息的request(附带本地消息存储状态chatText，用于判断更新客户端没有的新消息。)
    this.interval = setInterval(() => {
      let localText = [...this.state.chatText];
      let localTextLength = localText.length;
      let data = {
        localText: localText
      };
      axios({
        method: 'post',
        url: Url2,
        data: {
          data
        }
      })
        .then(response => {
          response.data.map(each => {
            localText.push({
              textID: each.textID,
              message: each.text,
              address: each.address,
              ipAddress: each.ipAddress,
              datetime: each.datetime,
              nickname: each.nickname
            });
            return undefined;
          });
          if (localTextLength === localText.length) {
            return null;
          } else {
            this.setState({ chatText: localText });
          }
        })
        .catch(err => console.log(err));
    }, 500);
  }
  componentDidUpdate() {
    this.deleteChatItemWhenOverFlow();
  }
  // ==================================================================================================

  // 每当用户按下回车发送消息时，消息将先送到服务器端登记后再被送回来，以'local'的形式出现再屏幕上
  getUserInput = event => {
    if (event.charCode === 13 && event.target.value) {
      this.setState({ isStartSendingMessage: true }); //判断用户处于发送消息状态，此时禁止接受消息。
      let date = new Date();
      let datetime = `${date.getFullYear()}年${date.getMonth() +
        1}月${date.getDate()}日 ${date.getHours()}:${
        date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
      }`;
      let temp = [...this.state.chatText];
      let chatText = {
        text: event.target.value,
        datetime: datetime,
        nickname: this.state.userinfo.nickname
      };
      axios({
        method: 'post',
        url: Url,
        data: {
          chatText
        }
      })
        .then(response => {
          temp.push({
            textID: response.data.textID,
            message: response.data.text,
            address: response.data.address,
            ipAddress: response.data.ipAddress,
            datetime: response.data.datetime,
            nickname: response.data.nickname
          });
          this.setState({ chatText: temp });
          this.setState({ isStartSendingMessage: false }); //判断用户离开发送消息状态，此时重启接受消息。
        })
        .catch(err => console.log(err));

      event.target.value = '';
    }
  };

  //=======限制本地消息条数不超出150条===============================

  deleteChatItemWhenOverFlow() {
    if (this.state.chatText.length > 150) {
      let temp = this.state.chatText;
      temp.shift();
      this.setState({ chatText: temp });
    }
  }
  // 聊天界面
  generateChatPage = () => {
    return (
      <div>
        <div className="chatWindow" onClick={this.dismissInput}>
          <ChatZone
            isStartSendingMessage={this.state.isStartSendingMessage}
            chatText={this.state.chatText}
          />
          <MediaQuery query="(min-width: 500px)">
            <div className="inputPlusEmoji">
              <EmojiSummonButton />
              <ChatInput getUserInput={this.getUserInput} />
            </div>
          </MediaQuery>
        </div>
        <MediaQuery query="(max-width: 500px)">
          <PopInput getUserInput={this.getUserInput} />
        </MediaQuery>
      </div>
    );
  };

  // 登录相关
  goRegister = () => {
    this.setState({ loginStatus: 'register' });
  };
  goLogin = () => {
    this.setState({ loginStatus: 'logout' });
  };
  //=============================================
  loginCheck = () => {
    let username = document.querySelector('#loginUsername').value;
    let password = document.querySelector('#loginPassword').value;
    if (username === '' || password === '') {
      return null;
    }
    const userLogin = {
      username: username,
      password: password
    };
    axios({
      method: 'post',
      url: UrlLogin,
      data: {
        userLogin
      }
    })
      .then(response => {
        if (response.data.loginStatus === 'success') {
          this.setState({
            userinfo: {
              nickname: response.data.nickname
            }
          });
          this.setState({ loginStatus: 'success' });
        } else if (response.data.loginStatus === 'wrongUsername') {
          this.setState({ loginStatus: 'wrongUsername' });
        } else if (response.data.loginStatus === 'wrongPassword') {
          this.setState({ loginStatus: 'wrongPassword' });
        }
      })
      .catch(err => console.log(err));
  };
  register = () => {
    let username = document.querySelector('#registerUsername').value;
    let password = document.querySelector('#registerPassword').value;
    let nickname = document.querySelector('#registerNickname').value;
    if (username === '' || password === '' || nickname === '') {
      return null;
    }
    const userinfo = {
      username: username,
      password: password,
      nickname: nickname
    };
    axios({
      method: 'post',
      url: UrlRegister,
      data: {
        userinfo
      }
    })
      .then(response => {
        if (response.data.nickname === 'userExists') {
          this.setState({ loginStatus: 'userExists' });
        } else {
          this.setState({
            userinfo: {
              nickname: response.data.nickname
            }
          });
          this.setState({ loginStatus: 'success' });
        }
      })
      .catch(err => console.log(err));
  };
  clearWarning = () => {
    this.setState({ loginStatus: 'register' });
  };

  render() {
    const { loginStatus } = this.state;
    if (loginStatus === 'success') {
      return this.generateChatPage();
    } else if (
      loginStatus === 'logout' ||
      loginStatus === 'wrongUsername' ||
      loginStatus === 'wrongPassword'
    ) {
      return (
        <Login
          loginCheck={this.loginCheck}
          goRegister={this.goRegister}
          loginStatus={loginStatus}
        />
      );
    } else if (loginStatus === 'register' || loginStatus === 'userExists') {
      return (
        <Register
          register={this.register}
          goLogin={this.goLogin}
          loginStatus={loginStatus}
          clearWarning={this.clearWarning}
        />
      );
    }
  }
}

export default App;
