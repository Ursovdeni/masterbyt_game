import React, { useEffect, useState } from "react";
import axios from "axios";
import { memo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addPointsAC } from "../../store/actions";

import style from "./Modal.module.css";

export default memo(function Modal({ visible, onClose, question }) {
  const [input, setInput] = useState({ answer: "" });
  const [timer, setTimer] = useState(12);

  const points = useAppSelector((store) => store.pointsReducer.points);

  const dispatch = useAppDispatch();

  useEffect(() => {
    let interval;
    if (visible) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
        console.log(timer);
        if (timer === 0) {
          setTimer(12);
          clearInterval(interval);
          axios.patch(`http://localhost:3000/api/questions/${question.id}`, {status: true})
          dispatch(addPointsAC(points - question.points));
          onClose();
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [timer, visible]);

  if (!visible) return null;

  const changeHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const checkHandler = () => {
    if (input.answer.toLowerCase() === question.answer.toLowerCase()) {
      console.log("correct");
      dispatch(addPointsAC(points + question.points));
      setTimer(12);
      onClose();
    } else {
      dispatch(addPointsAC(points - question.points));
      onClose();
      setTimer(12);
      console.log("пшел вон");
    }
    axios.patch(`http://localhost:3001/api/questions/${question.id}`, {status: true})
  };

  console.log("очкиэ", points);

  return (
    <div className={style.modal}>
      <div className="modal-content">
        {/* <span className="close" >&times;</span> */}
        <p>{question.questionText}</p>
        <label>Ответ</label>
        <input className={style.input} name="answer" type="text" onChange={changeHandler}></input>
        <button className={style.btn} type="button" onClick={checkHandler}>
          Отправить
        </button>
        <div className={style.timer}>Таймер: {timer}</div>
      </div>
    </div>
  );
});
