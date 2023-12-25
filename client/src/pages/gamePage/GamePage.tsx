import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../../components/modal/Modal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { resetPointsAC } from "../../store/actions";
import { useNavigate } from "react-router-dom";
import style from "./GamePage.module.css";

export default function GamePage() {
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const points = useAppSelector((store) => store.pointsReducer.points);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/questions", { withCredentials: true })
      .then((res) => {
        console.log("que", res.data);
        setQuestions(res.data);
      });
  }, [selectedQuestion]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/questions/categories", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("cat", res.data);
        setCategories(res.data);
      });
  }, []);

  const handleQuestionClick = async (e) => {
    if (user) {
      try {
        const id = e.target.dataset.id;
        const response = await axios.get(
          `http://localhost:3001/api/questions/${id}`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          setSelectedQuestion(response.data);
          setVisible(true);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/auth");
    }
  };

  const nandleCloseModal = () => {
    setVisible(false);
    setSelectedQuestion(null);
  };

  const finisheHandler = async () => {
    try {
      axios.put(`http://localhost:3001/api/questions/all`);
      const response = await axios.post(
        "http://localhost:3000/api/stat",
        { points },
        { withCredentials: true }
      );
      if (response.status === 200) {
        dispatch(resetPointsAC());
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.game__container}>
      <div className={style.game__points}>Points: {points}</div>
      <table className={style.game__table}>
        <tbody>
          {categories &&
            categories.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
                {questions &&
                  questions
                    .filter((question) => question.categoryId === category.id)
                    .sort((a, b) => a.id - b.id)
                    .map(
                      (question) =>
                        (
                          <td
                            data-id={question.id}
                            key={`question-${question.id}`}
                            onClick={
                              question.status ? null : handleQuestionClick
                            }
                            className={question.status ? `${style.done}` : "undone"}
                          >
                            {question.points}
                          </td>
                        ) || <td />
                    )}
              </tr>
            ))}
        </tbody>
      </table>
      <button onClick={finisheHandler}>Завершить игру</button>
      <Modal
        visible={visible}
        onClose={nandleCloseModal}
        question={selectedQuestion}
      >
        <div> Question: {selectedQuestion?.questionText}</div>
      </Modal>
    </div>
  );
}
