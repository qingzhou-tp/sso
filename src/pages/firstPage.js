import React from "react";
import classes from './firstPage.module.css'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/reducer/authSlice";

const FirstPage = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const logoutFn = () => {
    const checkout = window.confirm('确定要登出吗？');
    if (checkout) dispatch(logout())
  }
  return (<div className={classes.FirstPage}>
    <header>
      <div className={classes.leftLink}><Link to={'/'} className={classes.zuoLink}>首页</Link></div>
      {auth.isLogged ?
        <div>
          <div className={classes.userLinkBox}>
            <Link to={'/user'} className={classes.userLink}>{auth.user}的个人资料</Link>
          </div>
          <div className={classes.right2Link}>
            <button className={classes.youButton}
              onClick={logoutFn}>登出</button>
          </div>
        </div> :
        <div>
          <div className={classes.right1Link}>
            <Link to={'/login'} className={classes.you1Link}>登录</Link>
          </div>
          <div className={classes.right2Link}>
            <Link to={'/register'} className={classes.you2Link}>注册</Link>
          </div>
        </div>}

    </header>
    {!auth.isLogged ? <h1>请登录！</h1> : <h1>你好！{auth.user}</h1>}
  </div>);
}

export default FirstPage;