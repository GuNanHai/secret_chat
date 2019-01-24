import React from 'react';
import './Login.css';

//一下两个function用于修改表格的校验信息
const onInvalid = e => {
  e.target.setCustomValidity('请填写内容。');
};
const onInput = e => {
  e.target.setCustomValidity('');
};
const onFormSubmit = e => {
  e.preventDefault();
};
const Login = ({ loginCheck, goRegister, loginStatus }) => {
  return (
    <div className="login">
      <h1>登录</h1>
      <form onSubmit={onFormSubmit} id="loginForm">
        <input
          id="loginUsername"
          type="text"
          name="u"
          placeholder="用户名"
          required="required"
          onInvalid={e => onInvalid(e)}
          onInput={e => onInput(e)}
        />
        <input
          id="loginPassword"
          type="password"
          name="p"
          placeholder="密码"
          required="required"
          onInvalid={e => onInvalid(e)}
          onInput={e => onInput(e)}
        />
        <div id="buttonGroup">
          <button
            type="submit"
            className="btn btn-primary btn-block btn-large"
            onClick={loginCheck}
          >
            登录
          </button>
          <button
            type="button"
            className="btn btn-primary btn-block btn-large"
            onClick={goRegister}
          >
            注册
          </button>
        </div>
      </form>
      {loginStatus === 'wrongUsername' ? (
        <p className="failedLogin">账号不存在!</p>
      ) : null}
      {loginStatus === 'wrongPassword' ? (
        <p className="failedLogin">密码错误@-@</p>
      ) : null}
    </div>
  );
};

export default Login;
