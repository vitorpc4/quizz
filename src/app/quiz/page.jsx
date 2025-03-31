"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Plus, Sparkles } from "lucide-react";
import QuestionEditor from "@/Components/Quiz/questionEditor";

export default function QuizPage() {
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [questions, setQuestions] = useState([]);

  const generateQuestions = async () => {
    if (!topic.trim()) return;

    setIsGenerating(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock generated questions
    const generatedQuestions = [
      {
        id: "q1",
        text: `What is the main purpose of ${topic}?`,
        answers: [
          { id: "a1", text: "First possible answer", isCorrect: true },
          { id: "a2", text: "Second possible answer", isCorrect: false },
          { id: "a3", text: "Third possible answer", isCorrect: false },
          { id: "a4", text: "Fourth possible answer", isCorrect: false },
        ],
      },
      {
        id: "q2",
        text: `Which of the following is a key component of ${topic}?`,
        answers: [
          { id: "a1", text: "Component A", isCorrect: false },
          { id: "a2", text: "Component B", isCorrect: true },
          { id: "a3", text: "Component C", isCorrect: false },
          { id: "a4", text: "Component D", isCorrect: false },
        ],
      },
      {
        id: "q3",
        text: `When was ${topic} first introduced?`,
        answers: [
          { id: "a1", text: "1990s", isCorrect: false },
          { id: "a2", text: "2000s", isCorrect: false },
          { id: "a3", text: "2010s", isCorrect: true },
          { id: "a4", text: "2020s", isCorrect: false },
        ],
      },
    ];

    setQuestions(generatedQuestions);
    setIsGenerating(false);
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

  return (
    <div className="space-y-6 w-[50rem] ">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            <label className="text-sm font-medium">
              Inseria um tópico para gerar perguntas
            </label>
            <div className="flex gap-2">
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="ex: React Hooks, World Geography, Science Fiction"
                className="flex-1"
              />
              <Button
                onClick={generateQuestions}
                disabled={!topic.trim() || isGenerating}
                className="gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate Questions
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Insira um tópico específico para obter melhores perguntas geradas
              por IA
            </p>
          </div>
        </CardContent>
      </Card>

      {questions.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Questõesdo Quiz ({questions.length})
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
            <Button className="gap-2">Salvar Quiz</Button>
          </div>
        </div>
      )}
    </div>
  );
}
