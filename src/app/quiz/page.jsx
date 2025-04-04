"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Plus, Sparkles } from "lucide-react";
import QuestionEditor from "@/Components/Quiz/questionEditor";
import instance from "@/http";

export default function QuizPage() {
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("advanced");
  const [isGenerating, setIsGenerating] = useState(false);
  const [questions, setQuestions] = useState([]);

  const generateQuestions = async () => {
    if (!topic.trim()) return;

    setIsGenerating(true);

    const body = {
      topic: topic,
      level: level,
    };

    const res = await instance.post("/chat", body);

    const parsedJson = JSON.parse(res.data.questions);

    setQuestions(parsedJson.questions);

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
            <Button className="gap-2">Salvar Quiz</Button>
          </div>
        </div>
      )}
    </div>
  );
}
