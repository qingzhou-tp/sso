import React from "react";
import { Link } from "react-router-dom";
import Register from "../component/register";
import classes from './registerPage.module.css';
const RegisterPage = () => {
  return (
    <div className={classes.RegisterPage}>
      <header>
        <div className={classes.leftLink}>
          <Link className={classes.zuoLink} to={'/'}>首页</Link>
        </div>
        <div className={classes.rightLink}>
          已有账号?<Link className={classes.youLink} to={'/login'}>点击登录-{`>`}</Link >
        </div>
      </header>
      <article>
        <Register />
      </article>
      <footer></footer>
    </div>
  )
}
export default RegisterPage;