import axios from "axios";
import React, { useEffect, useState } from "react";

import style from "./ProfilePage.module.css";

export default function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [games, setGames] = useState([]);
  const [top, setTop] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/stat/`, {
        withCredentials: true,
      })
      .then((res) => setGames(res.data))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/stat/top`, {
        withCredentials: true,
      })
      .then((res) => setTop(res.data))
      .catch((e) => console.log(e));
  }, []);



  return (
    <div className={style.profile__container}>
      <div className={style.profile__info}>
        <h1>Привет, {user}</h1>
        <p>Твои результаты</p>
        {games.map((game) => (
          <div className={style.top__player}>
            <p>Количество очков: {game.points}</p>
            <p>Дата игры: {new Date(game.createdAt).toLocaleDateString("ru-RU")}</p>
          </div>
        ))}
      </div>
      <div className={style.profile__info}>
        <h1>Рейтинг 5 лучших игр за сегодня</h1>
        {top.map((player) => (
          <div className={style.top__player}>
            <p>Игрок: {player.User.login}</p>
            <p>Количество очков: {player.points}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
