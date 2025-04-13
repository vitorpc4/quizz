"use client";

import ListQuizzesComponent from "@/Components/Quiz/listQuizzes";
import { Button } from "@/Components/ui/button";
import instance from "@/http";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function Quizzes() {
  const router = useRouter();

  const [quizzes, setQuizzes] = useState([]);

  const getQuizzes = async () => {
    const response = await instance.get("/quizzes");

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Erro ao buscar quizzes");
    }
  };

  const createQuiz = () => {
    router.push("/quiz");
  };

  useEffect(() => {
    const result = getQuizzes()
      .then((res) => {
        setQuizzes(res);
        console.log(res);
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
          <ListQuizzesComponent quizzez={quizzes} />
        </div>
      </div>
    </div>
  );
}
