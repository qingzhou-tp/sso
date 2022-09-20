import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import UserInformation from "../component/userInformation";
import { logout } from "../store/reducer/authSlice";
import classes from './firstPage.module.css'
const UserPage = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const logoutFn = () => {
    const checkout = window.confirm('确定要登出吗？');
    if (checkout) dispatch(logout())
    nav('/');
  }
  return <div className={classes.FirstPage}>
    <header>
      <div className={classes.leftLink}>
        <Link to={'/'} className={classes.zuoLink}>
          首页
        </Link>
      </div>
      <div className={classes.right2Link}>
        <button className={classes.youButton}
          onClick={logoutFn}>登出</button>
      </div>
    </header>
    <UserInformation />
  </div>
}
export default UserPage;