"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";
import instance from "@/http";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

import QuizMainControl from "@/components/quiz/quiz-main-control";

export default function QuizPage() {
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("advanced");
  const [isGenerating, setIsGenerating] = useState(false);
  const [questions, setQuestions] = useState({
    id: "",
    name: "",
    userId: "",
    quiz: [],
  });
  const [selectedModel, setSelectedModel] = useState();

  const generateQuestions = async () => {
    if (!topic.trim()) return;
    setQuestions({
      id: "",
      name: "",
      userId: "",
      quiz: [],
    });

    setIsGenerating(true);

    const body = {
      topic: topic,
      level: level,
    };

    let res;

    try {
      if (selectedModel === "Gemini") {
        res = await instance.post("/chat", body);
      } else {
        res = await instance.post("/chat/openapi", body);
      }

      if (!res.data.success) {
        toast.error("Erro ao gerar perguntas", {
          description: "Tente novamente",
          duration: 2000,
          position: "top-right",
        });
        setIsGenerating(false);
        return;
      }

      const parsedJson = JSON.parse(res.data.questions);

      parsedJson.questions = parsedJson.questions.map((question) => {
        const randomKey = Math.random().toString(36).substring(2, 15);
        return {
          ...question,
          key: randomKey,
          id: parseInt(question.id),
          answers: question.answers.map((answer) => ({
            ...answer,
            id: parseInt(answer.id),
          })),
        };
      });

      const quiz = {
        id: "",
        name: "",
        userId: "",
        quiz: parsedJson.questions,
      };

      setQuestions(quiz);

      setIsGenerating(false);
    } catch (error) {
      toast.error("Erro ao gerar perguntas", {
        description: "Tente novamente",
        duration: 2000,
        position: "top-right",
      });
      setIsGenerating(false);
      return;
    }
  };

  const onSelectModelChange = (value) => {
    localStorage.setItem("modelAI", value);
    setSelectedModel(value);
  };

  useEffect(() => {
    const modelAI = localStorage.getItem("modelAI");

    if (modelAI) {
      setSelectedModel(modelAI);
    }
  }, [selectedModel]);

  return (
    <div className="space-y-6 w-[50rem]">
      <div className="flex justify-end">
        <Select
          value={selectedModel}
          onValueChange={(e) => onSelectModelChange(e)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Modelo IA" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Groq">Groq</SelectItem>
              <SelectItem value="Gemini">Gemini</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent>
          <div className="flex flex-col gap-4">
            <label className="text-sm font-medium">
              Insira um tópico para gerar perguntas
            </label>
            <div className="flex gap-2">
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ex: React Hooks, Geopolítica, Ciências Biológicas..."
                className="flex-1"
              />
              <Button
                onClick={generateQuestions}
                disabled={!topic.trim() || isGenerating || !selectedModel}
                className="gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Gerando quiz...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Gere o quiz
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

      {questions && questions.quiz.length > 0 && (
        <div className="space-y-4">
          <QuizMainControl quiz={questions} />
        </div>
      )}
    </div>
  );
}
