"use client";

import QuestionEditor from "@/Components/Quiz/questionEditor";
import QuizzMainControl from "@/Components/Quiz/quizzmaincontrol";
import SetNameQuizzDialog from "@/Components/Quiz/SetNameQuizz";
import { Button } from "@/components/ui/button";
import instance from "@/http";
import { Plus } from "lucide-react";
import { use, useDebugValue, useEffect, useState } from "react";
import { toast } from "sonner";

export default function QuizSlugPage({ params }) {
  const paramsUrl = use(params);
  const [quizz, setQuizz] = useState();

  const getQuizz = async () => {
    try {
      const response = await instance.get(`/quiz/${paramsUrl.slug}`);

      if (response.status === 200) {
        setQuizz(response.data.quiz);
      }
    } catch (error) {
      toast.error("Erro ao carregar o quizz", {
        description: "Tente novamente",
        duration: 2000,
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    getQuizz();
  }, []);

  return (
    <div className="space-y-6 w-[50rem] ">
      {quizz && quizz.quiz.length > 0 && (
        <div className="space-y-4">
          <QuizzMainControl quizz={quizz} />
        </div>
      )}
    </div>
  );
}
