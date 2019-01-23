import React from 'react';
import './Register.css';

//一下两个function用于修改表格的校验信息
const onInvalid = e => {
  e.target.setCustomValidity('请填写内容。');
};
const onInput = e => {
  e.target.setCustomValidity('');
};

const Register = ({ register, goLogin, loginStatus, clearWarning }) => {
  return (
    <div className="login">
      <h1>注册</h1>
      <div id="registerForm">
        <input
          id="registerNickname"
          type="text"
          name="nickName"
          placeholder="昵称"
          required="required"
          onInvalid={e => onInvalid(e)}
          onInput={e => onInput(e)}
        />
        <input
          id="registerUsername"
          type="text"
          name="u"
          placeholder="用户名"
          required="required"
          onFocus={clearWarning}
          onInvalid={e => onInvalid(e)}
          onInput={e => onInput(e)}
        />
        <input
          id="registerPassword"
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
            onClick={register}
          >
            注册
          </button>
          <button
            type="submit"
            className="btn btn-primary btn-block btn-large"
            onClick={goLogin}
          >
            我有账号
          </button>
        </div>
      </div>
      {loginStatus === 'userExists' ? (
        <p className="failedLogin">账户已存在@-@</p>
      ) : null}
    </div>
  );
};

export default Register;
