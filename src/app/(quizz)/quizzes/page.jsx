"use client";

import ListQuizzesComponent from "@/Components/Quiz/listQuizzes";
import { Button } from "@/components/ui/button";
import instance from "@/http";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Quizzes() {
  const router = useRouter();

  const [quizzes, setQuizzes] = useState([]);

  const getQuizzes = async () => {
    const response = await instance.get("/quizzes");

    if (response.status === 200) {
      return response.data;
    } else {
      toast.error("Erro ao buscar quizzes", {
        duration: 2000,
      });
    }
  };

  const createQuiz = () => {
    router.push("/quiz");
  };

  const quizzDeleted = async () => {
    const response = await getQuizzes();
    setQuizzes(response);
  };

  useEffect(() => {
    getQuizzes()
      .then((res) => {
        setQuizzes(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <div className="flex justify-end p-4 mr-1">
        <Button onClick={createQuiz}>Criar</Button>
      </div>
      <div className="flex justify-center p-4">
        <div className="w-full">
          <ListQuizzesComponent quizzez={quizzes} deletedQuizz={quizzDeleted} />
        </div>
      </div>
    </div>
  );
}
