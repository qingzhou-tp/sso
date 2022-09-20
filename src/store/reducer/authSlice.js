import { createSlice } from '@reduxjs/toolkit'
export const authSlice = createSlice({
  name: 'auth',
  initialState: () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return {
        isLogged: false,
        token: null,
        user: null,
        expirationTime: 0//登陆状态失效时间
      }
    }
    else {
      return {
        isLogged: true,
        token,
        user: localStorage.getItem('user'),
        expirationTime: +localStorage.getItem('expirationTime')
      }
    }
  },
  reducers: {
    login (state, action) {
      state.isLogged = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      //获取当前时间
      const currentTime = Date.now();
      //设置登录有效时间
      const timeout = 1000 * 60 * 60 * 24 * 7;
      //设置失效日期
      state.expirationTime = currentTime + timeout;
      //将数据同时存储到本地存储中
      localStorage.setItem('token', state.token);
      localStorage.setItem('user', JSON.stringify(state.user));
      localStorage.setItem("expirationTime", state.expirationTime + '')
    }, logout (state, action) {
      state.isLogged = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('expirationTime');
    }
  }
})
export const { login, logout } = authSlice.actions;