import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navBar/NavBar";
import StartPage from "./pages/startPage/StartPage";
import AuthPage from "./pages/authPage/AuthPage";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { useEffect } from "react";
import axios from "axios";
import { initUserAC } from "./store/actions";
import GamePage from "./pages/gamePage/GamePage";
import ProfilePage from "./pages/profilePage/ProfilePage";

function App() {
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   axios.get(`http://localhost:3000/api/users`, {
  //           withCredentials: true
  //       })
  //   .then((res) => dispatch({type: 'SET_USER', payload: res.data}))
  //   .catch((e) => console.log(e));
  // }, [dispatch]);

  // const storedUser = JSON.parse(localStorage.getItem('user'));
  // console.log('********', storedUser)

  return (
    <>
      <NavBar />
      <Routes>
        <Route index element={<StartPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<StartPage />} />
      </Routes>
    </>
  );
}

export default App;
