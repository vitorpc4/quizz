"use client";

import QuizTaker from "@/Components/Quiz/quizTaker";
import instance from "@/http";
import { use, useEffect, useState } from "react";

export default function TakeQuizzPage({ params }) {
  const paramsUrl = use(params);

  const [quizz, setQuizz] = useState();
  const [questions, setQuestions] = useState([]);

  const getQuizz = async () => {
    const response = await instance.get(`/quiz/${paramsUrl.slug}`);

    if (response.status === 200) {
      setQuizz(response.data.quiz);
      setQuestions(response.data.quiz.quiz);
    }
  };

  useEffect(() => {
    getQuizz();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen ">
      {quizz && <QuizTaker quizz={quizz} />}
    </div>
  );
}
