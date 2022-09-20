import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/reducer/authSlice";
import classes from "./login.module.css"
const Login = (props) => {

  //获取用于跳转页面的函数
  const nav = useNavigate();
  const dispatch = useDispatch();
  const username = useRef();
  const userpassword = useRef();
  const loginButton = () => {
    fetch(process.env.REACT_APP_ADDRESS + '/user/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        account: username.current.value,
        password: userpassword.current.value
      })
    }).then(res => res.json())
      .then(res => {
        if (res.code === 200) {
          console.log(res)
          dispatch(
            login({
              token: res.data.token,
              user: res.data.name
            })
          )
          alert('登录成功！')
          console.log('登录成功', res);
          nav('/')
        }
        else {
          alert(res.msg);
        }
      })
      .catch(err => console.log(err))
  }
  return (
    <div className={classes.login}>
      <div className={classes.loginForm}>
        <p className={classes.user}>用户名或邮箱地址</p>
        <input
          type={'name'}
          autoComplete="off"
          ref={username} />
        <p className={classes.forgetPasswordBox}>
          <span className={classes.password}>密码</span>
          <span className={classes.forgetPassword}>忘记密码?<Link to={'/reset'} className={classes.resetPassword}>点击找回</Link></span>
        </p>
        <input
          type={'password'}
          autoComplete="off"
          ref={userpassword} />
        <div>
          <button onClick={loginButton}>登录</button>
        </div>
      </div>
      <div className={classes.toRegiste}>
        <div>
          新用户?<Link to={'/register'} className={classes.gotoRegiste}>点击注册</Link>
        </div>
      </div>
    </div>);
}

export default Login;