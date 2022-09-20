import React from "react";
import { Link } from "react-router-dom";
import Login from "../component/login";
import classes from './loginPage.module.css'

const LoginPage = (props) => {
  return (<div className={classes.loginPage}>
    <header><Link className={classes.zuoLink} to={'/'}>首页</Link></header>
    <article>
      <h1>SSO React vision</h1>
      <Login />
    </article>
    <footer></footer>
  </div>);
}

export default LoginPage;