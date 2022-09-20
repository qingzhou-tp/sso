
import { Route, Routes } from "react-router-dom";
import FirstPage from "./pages/firstPage";
import LoginPage from "./pages/loginPage";
import classes from "./app.module.css";
import RegisterPage from "./pages/registerPage";
import ResetPage from "./pages/resetPage";
import useAutoLogout from "./hooks/useAutoLogout";
import UserPage from "./pages/UserPage";
function App (props) {
  useAutoLogout();
  return (
    <div className={classes.app}>
      <Routes>
        <Route path={'/'} element={<FirstPage />} />
        <Route path={'/login'} element={<LoginPage />} />
        <Route path={'/register'} element={<RegisterPage />} />
        <Route path={'/reset'} element={<ResetPage />} />
        <Route path={'/user'} element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;
