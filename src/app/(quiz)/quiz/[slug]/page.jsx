"use client";

import QuizMainControl from "@/Components/Quiz/quiz-main-control";
import instance from "@/http";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

export default function QuizSlugPage({ params }) {
  const paramsUrl = use(params);
  const [quiz, setQuiz] = useState();

  const getQuiz = async () => {
    try {
      const response = await instance.get(`/quiz/${paramsUrl.slug}`);

      if (response.status === 200) {
        setQuiz(response.data.quiz);
      }
    } catch (error) {
      toast.error("Erro ao carregar o quiz", {
        description: "Tente novamente",
        duration: 2000,
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    getQuiz();
  }, []);

  return (
    <div className="space-y-6 w-[50rem] ">
      {quiz && quiz.quiz.length > 0 && (
        <div className="space-y-4">
          <QuizMainControl quiz={quiz} />
        </div>
      )}
    </div>
  );
}
