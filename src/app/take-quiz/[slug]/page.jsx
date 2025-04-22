"use client";

import AuthenticationQuiz from "@/components/quiz/authentication-quiz";
import QuizTaker from "@/components/quiz/quiz-taker";
import instance from "@/http";
import { use, useEffect, useState } from "react";

export default function TakeQuizPage({ params }) {
  const paramsUrl = use(params);

  const [quiz, setQuiz] = useState();
  const [questions, setQuestions] = useState([]);
  const [email, setEmail] = useState("");

  const getQuiz = async () => {
    const response = await instance.get(`/quiz/${paramsUrl.slug}`);

    if (response.status === 200) {
      setQuiz(response.data.quiz);
      setQuestions(response.data.quiz.quiz);
    }
  };

  useEffect(() => {
    getQuiz();
  }, []);

  return (
       
    <div className="flex justify-center items-center h-screen "> 
      <AuthenticationQuiz open={true} onSetEmail={setEmail}/>
      {quiz && email && <QuizTaker quizTaker={quiz} email={email} />}
    </div>
  );
}
