import React from "react";
import { Link } from "react-router-dom";
import Reset from "../component/reset";
import classes from './loginPage.module.css'

const ResetPage = () => {
  return (<div className={classes.loginPage}>
    <header>
      <Link className={classes.zuoLink} to={'/'}>首页</Link><br />
    </header>
    <article>
      <h1>重置您的密码</h1>
      <Reset />
    </article>
    <footer></footer>
  </div>);
}

export default ResetPage;