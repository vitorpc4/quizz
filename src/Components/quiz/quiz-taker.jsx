"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import instance from "@/http";

export default function QuizTaker({ quizTaker, email }) {
  const [quiz, setQuiz] = useState(quizTaker.quiz);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = quiz[currentQuestionIndex];
  const totalQuestions = quiz.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleAnswerSelect = (answerId) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: answerId,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateScore();
      saveEvaluation();
      setIsCompleted(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;

    quiz.forEach((question) => {
      const selectedAnswerId = selectedAnswers[question.id];
      if (selectedAnswerId) {
        const selectedAnswer = question.answers.find(
          (a) => a.id === selectedAnswerId
        );
        if (selectedAnswer && selectedAnswer.isCorrect) {
          correctAnswers++;
        }
      }
    });

    setScore(correctAnswers);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsCompleted(false);
    setScore(0);
  };

  const saveEvaluation = async () => {
    try {
      if (!email) {
        console.error("E-mail é obrigatório");
        return;
      }
  
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        console.error("Formato do e-mail inválido!");
        return;
      }

      const evaluation = {
        email: email,
        answers: selectedAnswers,
        quizId: quizTaker.id,
      };
      const res = await instance.post("/evaluation", evaluation);

      if (res.data) {
        console.log(res);
      } else {
        console.log("Erro ao salvar avaliação");
      }
    } catch (error) {
      console.error("Um erro ocorreu ao salvar a avaliação:", error);
    }
  };

  if (!quiz) {
    return <div className="text-center py-8">Carregando quiz...</div>;
  }

  return (
    <div className="w-xl mx-auto">
      {!isCompleted ? (
        <Card className="shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Questão {currentQuestionIndex + 1} de {totalQuestions}
              </span>
              <span className="text-sm font-medium">{quiz.title}</span>
            </div>
            <Progress value={progress} className="h-2" />
            <CardTitle className="mt-4 text-xl">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedAnswers[currentQuestion.id] || ""}
              onValueChange={handleAnswerSelect}
              className="space-y-3"
            >
              {currentQuestion.answers.map((answer) => (
                <div
                  key={answer.id}
                  className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                >
                  <RadioGroupItem value={answer.id} id={answer.id} />
                  <Label
                    htmlFor={answer.id}
                    className="flex-grow cursor-pointer"
                  >
                    {answer.option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="gap-1"
            >
              <ArrowLeft className="h-4 w-4" /> Anterior
            </Button>
            <Button
              onClick={handleNextQuestion}
              disabled={!selectedAnswers[currentQuestion.id]}
              className="gap-1"
            >
              {currentQuestionIndex === totalQuestions - 1 ? "Finalizar" : "Próximo"}{" "}
              {currentQuestionIndex === totalQuestions - 1 ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="shadow-lg text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Quiz realizado!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-7xl font-bold my-6">
              {score}/{totalQuestions}
            </div>
            <p className="text-xl">
              Você acertou {score} de {totalQuestions} questões!
            </p>
            <div className="text-muted-foreground">
              {score === totalQuestions
                ? "Pontuação perfeita! Excelente trabalho! 🎉"
                : score >= totalQuestions / 2
                ? "Bom trabalho! Você superou o quiz. 👍"
                : "Continue estudando para melhorar sua pontuação. 💪"}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Button variant="outline" onClick={handleRestartQuiz}>
              Refazer quiz
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
