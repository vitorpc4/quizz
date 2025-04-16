"use client";

import QuestionEditor from "@/components/Quiz/questionEditor";
import SetNameQuizzDialog from "@/components/Quiz/setNameQuizz";
import { Button } from "@/components/ui/button";
import instance from "@/http";
import { Plus } from "lucide-react";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

export default function QuizSlugPage({ params }) {
  const paramsUrl = use(params);

  const [quizz, setQuizz] = useState();
  const [questions, setQuestions] = useState([]);
  const [isOpenSave, setIsOpenSave] = useState(false);

  const getQuizz = async () => {
    const response = await instance.get(`/quiz/${paramsUrl.slug}`);

    if (response.status === 200) {
      setQuizz(response.data.quiz);
      setQuestions(response.data.quiz.quiz);
    }
  };

  const addQuestion = () => {
    const newQuestion = {
      id: `q${Date.now()}`,
      text: "",
      answers: [
        { id: `a${Date.now()}-1`, text: "", isCorrect: true },
        { id: `a${Date.now()}-2`, text: "", isCorrect: false },
        { id: `a${Date.now()}-3`, text: "", isCorrect: false },
        { id: `a${Date.now()}-4`, text: "", isCorrect: false },
      ],
    };

    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (updatedQuestion) => {
    setQuestions(
      questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
  };

  const deleteQuestion = (questionId) => {
    setQuestions(questions.filter((q) => q.id !== questionId));
  };

  const updateQuizz = async (name) => {
    const updatedQuizz = {
      name: name,
      quiz: questions,
    };

    const res = await instance.put(`/quiz/${quizz.id}`, updatedQuizz);

    if (res.data) {
      setQuizz({ ...quizz, name: name });
      setQuestions(questions);

      toast("Quizz Atualizado", {
        description: "Quizz atualizado com sucesso",
        duration: 2000,
        position: "top-right",
      });
    } else {
      toast("Erro ao atualizar quizz", {
        description: "Erro ao atualizar quizz",
        duration: 2000,
        position: "top-right",
      });
    }
  };

  const saveQuizz = async (name) => {
    if (quizz.id) {
      updateQuizz(name);
      return;
    }
  };

  const onSetName = (name) => {
    setIsOpenSave(false);
    saveQuizz(name);
  };

  useEffect(() => {
    getQuizz();
  }, []);

  return (
    <div className="space-y-6 w-[50rem] ">
      {questions.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Questões do Quiz ({questions.length})
            </h2>
            <Button
              onClick={addQuestion}
              variant="outline"
              size="sm"
              className="gap-1"
            >
              <Plus className="h-4 w-4" /> Adicionar questão
            </Button>
          </div>
          <div className="space-y-4">
            {questions.map((question) => (
              <QuestionEditor
                key={question.id}
                question={question}
                onUpdate={updateQuestion}
                onDelete={deleteQuestion}
              />
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <SetNameQuizzDialog
              open={isOpenSave}
              nameOnEdit={quizz.name}
              onSetName={onSetName}
            />
          </div>
        </div>
      )}
    </div>
  );
}
