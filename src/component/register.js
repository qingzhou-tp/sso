import React, { useRef, useState } from "react";
import classes from './register.module.css';
import Qs from 'qs'
import { useNavigate } from "react-router-dom";
const Register = (props) => {
  //打字机效果
  const message1 = `欢迎来到SSO项目react版！`;
  const message2 = `让我们开始这段旅程吧`;
  const [len, setLen] = useState(0);
  const [print1, setPrint1] = useState(``);
  const [print2, setPrint2] = useState(``);
  const [showEmail, setShowEmail] = useState(false);
  const printMess = setTimeout(() => {
    if (len < message1.length)
      setPrint1(message1.slice(0, len) + `_`);
    else if (len === message1.length)
      setPrint1(message1.slice(0, len));
    else if (len - message1.length < message2.length)
      setPrint2(message2.slice(0, len - message1.length) + `_`);
    else if (len - message1.length === message2.length) {
      setPrint2(message2.slice(0, len - message1.length));
    }
    else
      setShowEmail(true);
    setLen(preState => preState + 1);
  }, 100);
  if (len === message1.length + message2.length + 2) {
    clearTimeout(printMess);
  }
  //验证邮箱+注册账号
  const nav = useNavigate();
  const [hasEmail, sethasEmail] = useState({
    emailtext: false,
    text: false
  });
  const [myemail, setmyEmail] = useState('');
  const myname = useRef();
  const mynickname = useRef();
  const s_id = useRef();
  const captcha = useRef();
  const mypassword = useRef();
  const [myInformation, setMyInformation] = useState({
    name: '',
    nickname: '',
    email: '',
    password: '',
    s_id: '',
    captcha: ''
  })
  const emailres = () => {
    if (myemail.indexOf('@') === -1) {
      sethasEmail(preState => {
        return {
          ...preState,
          emailtext: true
        }
      });
      return;
    }
    sethasEmail(preState => {
      return {
        text: true,
        emailtext: false
      }
    });
    fetch(process.env.REACT_APP_ADDRESS + '/email/captcha?' + Qs.stringify({
      type: 'reg',
      email: myemail
    }))
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));;

  }

  const registerButton = () => {
    if (captcha.current.value === '') {
      alert('验证码不能为空！');
      return;
    }
    else if (myname.current.value === '') {
      alert('姓名不能为空！');
      return;
    }
    else if (mynickname.current.value === '') {
      alert('昵称不能为空！');
      return;
    }
    else if (mypassword.current.value.length < 6 || mypassword.current.value.length > 16) {
      alert('密码长度应为6~16位！');
      return;
    }
    else if (s_id.current.value === '') {
      alert('学号不能为空！');
      return;
    }
    setMyInformation({
      name: myname.current.value,
      nickname: mynickname.current.value,
      email: myemail,
      password: mypassword.current.value,
      s_id: s_id.current.value,
      captcha: captcha.current.value
    })
    fetch(process.env.REACT_APP_ADDRESS + '/user/register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myInformation)
    }).then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
    alert('即将跳转到登录页面');
    nav('/login')
  }

  return <div className={classes.Register}>
    <div className={classes.regBox}>
      <div className={classes.welcome} >
        {print1}<br />{print2}
      </div>{showEmail && <>
        <div className={classes.inputEmail}>请输入您的邮箱</div>
        <div className={classes.enterbox} >
          <span>--{'>'}</span> <input
            type={'email'}
            value={myemail}
            onChange={e => {
              setmyEmail(e.target.value);
            }}
            autoComplete="off" />
          <button className={classes.mybutton}
            onClick={emailres}>发送验证码</button>
        </div>
        {hasEmail.emailtext && <div className={classes.hasEmail}>请输入正确的邮箱格式，如xxx@123.com</div>}
        {hasEmail.text && <div className={classes.regInputBox}>
          <div>验证码<br />-{'>'}
            <input
              ref={captcha} /></div>
          <div>姓名<br />-{'>'}
            <input
              ref={myname} /></div>
          <div>昵称<br />-{'>'}
            <input
              ref={mynickname} /></div>
          <div>密码<br />-{'>'}
            <input
              ref={mypassword}
              type={'password'} /></div>
          <div>学号<br />-{'>'}
            <input
              ref={s_id} /></div>
          <div><button className={classes.mybutton}
            onClick={registerButton}>注册</button></div>
        </div>}

      </>}


    </div>
  </div>
}
export default Register;