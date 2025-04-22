import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import QuestionEditor from "@/components/quiz/question-editor";
import { useEffect, useState } from "react";
import SetNameQuizDialog from "./set-name-quiz";
import instance from "@/http";
import { toast } from "sonner";

export default function QuizMainControl({ quiz }) {
  const [isOpenSave, setIsOpenSave] = useState(false);
  const [questions, setQuestions] = useState(quiz);
  const [lastIdQuestion, setLastIdQuestion] = useState(0);
  const [lockSave, setLockSave] = useState(false);

  const addQuestion = () => {
    const newQuestion = {
      id: lastIdQuestion,
      question: "",
      key: Math.random().toString(36).substring(2, 15),
      answers: [
        { id: 1, option: "", isCorrect: true },
        { id: 2, option: "", isCorrect: false },
        { id: 3, option: "", isCorrect: false },
        { id: 4, option: "", isCorrect: false },
      ],
    };

    const addQuestion = {
      ...questions,
      quiz: [...questions.quiz, newQuestion],
    };

    setQuestions({
      ...addQuestion,
      quiz: [...questions.quiz, newQuestion],
    });
  };

  const updateQuestion = (updatedQuestion) => {
    const updated = questions.quiz.map((q) =>
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    setQuestions((prev) => {
      return {
        ...prev,
        quiz: updated,
      };
    });
  };

  const deleteQuestion = (questionId) => {
    const result = questions.quiz
      .filter((q) => q.id !== questionId)
      .map((q, index) => ({
        ...q,
        id: index + 1,
      }));

    setQuestions((prev) => {
      return {
        ...prev,
        quiz: result,
      };
    });

    setLastIdQuestion((prev) => prev - 1);
  };

  const updateQuiz = async (name) => {
    const toBeUpdated = {
      ...questions,
      name: name,
    };

    const res = await instance.put(`/quiz/${questions.id}`, toBeUpdated);

    if (res.data) {
      toast("Quiz atualizado", {
        description: "Quiz atualizado com sucesso",
        duration: 2000,
        position: "top-right",
      });
    } else {
      toast("Erro ao atualizar quiz", {
        description: "Erro ao atualizar quiz",
        duration: 2000,
        position: "top-right",
      });
    }
  };

  const createQuiz = async (name) => {
    const userId = localStorage.getItem("userId");

    const newQuiz = {
      name: name,
      quiz: questions.quiz,
      userId: userId,
    };

    const res = await instance.post("/quiz", newQuiz);

    if (res.data) {
      setQuestions((prev) => {
        return {
          ...prev,
          id: res.data.id,
          name: name,
          userId: userId,
        };
      });

      toast("Quiz criado", {
        description: "Quiz criado com sucesso",
        duration: 2000,
        position: "top-right",
      });
    } else {
      toast("Erro ao criar quiz", {
        description: "Erro ao criar quiz",
        duration: 2000,
        position: "top-right",
      });
    }
  };

  const saveQuiz = async (name) => {
    if (questions.id) {
      updateQuiz(name);
      return;
    }

    createQuiz(name);
  };

  const onSetName = (name) => {
    setIsOpenSave(false);
    setQuestions((prev) => {
      return {
        ...prev,
        name: name,
      };
    });

    saveQuiz(name);
  };

  useEffect(() => {
    setLastIdQuestion(
      questions.quiz.reduce((acc, question) => {
        const questionId = parseInt(question.id);
        return Math.max(acc, questionId + 1);
      }, 0)
    );
  });

  return (
    <div>
      <div className="flex items-center justify-between p-2">
        <h2 className="text-xl font-semibold">
          Questões do Quiz ({questions.quiz.length})
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
        {questions.quiz.map((question) => (
          <QuestionEditor
            key={question.key}
            questionObject={question}
            onUpdate={updateQuestion}
            onDelete={deleteQuestion}
            setLockSave={(value) => setLockSave(value)}
          />
        ))}
      </div>
      <div className="flex justify-end pt-4">
        <SetNameQuizDialog
          lockButton={lockSave}
          open={isOpenSave}
          nameOnEdit={quiz.name || ""}
          onSetName={onSetName}
        />
      </div>
    </div>
  );
}
