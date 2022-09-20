import React, { useRef, useState } from "react";
import classes from './reset.module.css'
import Qs from 'qs'
import { useNavigate } from "react-router-dom";
const Reset = () => {
  const yourEmail = useRef();
  const yourcaptcha = useRef();
  const newpassword = useRef();
  const nav = useNavigate();
  const [checkEmail, setCheckEmail] = useState(false);
  const sendEmailCode = () => {
    fetch(process.env.REACT_APP_ADDRESS + '/email/captcha?' + Qs.stringify({
      type: 'reset',
      email: yourEmail.current.value
    })).then(res => {
      setCheckEmail(true)
      res.json()
    })
      .catch(err => console.log(err))
  }

  const resetButton = () => {
    fetch(process.env.REACT_APP_ADDRESS + '/user/password', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: yourEmail.current.value,
        captcha: yourcaptcha.current.value,
        password: newpassword.current.value
      })
    }).then(res => {
      alert('即将跳转到登录页面');
      nav('/login')
      return res.json()
    })
      .catch(err => console.log(err))
  }

  return <div className={classes.resetBox}>
    <div>输入与您账号绑定的邮箱，我们将会向您发送验证码</div>
    <div><input
      className={classes.resetinput}
      placeholder="请输入邮箱"
      ref={yourEmail} /></div>
    <button
      className={classes.resetButton}
      onClick={sendEmailCode}>发送验证码</button>
    {checkEmail && <div>
      <div>验证码<input className={classes.resetinput}
        ref={yourcaptcha} /></div>
      <div>新密码<input className={classes.resetinput}
        ref={newpassword} /></div>
      <button
        className={classes.resetButton}
        onClick={resetButton}>重置密码</button>
    </div>}

  </div>
}
export default Reset;