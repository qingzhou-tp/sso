import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from './userInformation.module.css';
const UserInformation = () => {
  const auth = useSelector(state => state.auth);
  const [isFirstTime, setIsFirstTime] = useState(1);
  const [isSet, setIsSet] = useState(false);
  const [myInformation, setMyInformation] = useState({
    email: "",
    gender: "",
    grade: '',
    name: "",
    nickname: "",
    s_id: ""
  });
  const [inputData, setInputData] = useState({
    email: "",
    gender: "",
    grade: '',
    name: "",
    nickname: "",
    s_id: ""
  });


  const gradeChange = (e) => {
    setInputData(preState => ({ ...preState, grade: e.target.value }))
  };
  const nameChange = (e) => {
    setInputData(preState => ({ ...preState, name: e.target.value }))
  };
  const nicknameChange = (e) => {
    setInputData(preState => ({ ...preState, nickname: e.target.value }))
  };
  useEffect(() => {
    fetch(process.env.REACT_APP_ADDRESS + '/user/info', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth.token
      }
    }).then(res => res.json())
      .then(res => {
        setMyInformation({ ...res.data });
        setIsFirstTime(2);
      })
      .catch(err => console.log(err))
  }, [isFirstTime, auth.token])


  const changeMyMessage = () => {
    const check = window.confirm('确定更改信息吗？');
    if (inputData.name === '') {
      alert('姓名不能为空！');
      return;
    }
    else if (inputData.nickname === '') {
      alert('昵称不能为空！');
      return;
    }
    if (check) {
      fetch(process.env.REACT_APP_ADDRESS + '/user', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth.token
        },
        body: JSON.stringify(inputData)
      }).then(res => res.json())
        .then(res => {
          alert(res.msg);
          console.log(inputData.grade);
        })
        .catch(err => console.log(err))
      setIsFirstTime(1);
      setIsSet(false);
    }

  }

  return <div className={classes.userInformation}>
    {!isSet ?
      <div>
        <div>邮箱：{myInformation.email}</div>
        <div>性别：{myInformation.gender === 'male' ? '男' : '女'}</div>
        <div>年级：{myInformation.grade}</div>
        <div>姓名：{myInformation.name}</div>
        <div>昵称：{myInformation.nickname}</div>
        <div>学号：{myInformation.s_id}</div>
        <div>
          <button onClick={() => {
            setIsSet(true);
            setInputData({
              ...myInformation
            });
          }}>更改个人信息设置</button>
        </div>
      </div> :
      <div>
        <div>邮箱：{myInformation.email}</div>
        <div>性别：{myInformation.gender === 'male' ? '男' : '女'}</div>
        <div>年级：<select
          value={inputData.grade}
          onChange={gradeChange}>
          <option value=''></option>
          <option value='大一'>大一</option>
          <option value='大二'>大二</option>
          <option value='大三'>大三</option>
          <option value='大四'>大四</option>
          <option value='大五'>大五</option>
          <option value='研一'>研一</option>
          <option value='研二'>研二</option>
          <option value='研三'>研三</option>
        </select></div>
        <div>姓名：<input
          value={inputData.name}
          onChange={nameChange} />
        </div>
        <div>昵称：<input
          value={inputData.nickname}
          onChange={nicknameChange} />
        </div>
        <div>学号：{myInformation.s_id}</div>
        <div>
          <button onClick={changeMyMessage}>提交个人信息更改</button>
          <button onClick={() => {
            setIsSet(false);
          }}>返回个人信息页面</button>
        </div>
      </div>}

  </div>
}
export default UserInformation;