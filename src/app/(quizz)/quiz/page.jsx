"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Plus, Sparkles } from "lucide-react";
import QuestionEditor from "@/components/Quiz/questionEditor";
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
import SetNameQuizzDialog from "@/components/Quiz/setNameQuizz";

export default function QuizPage() {
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("advanced");
  const [isGenerating, setIsGenerating] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [selectedModel, setSelectedModel] = useState();
  const [quizz, setQuizz] = useState({});
  const [isOpenSave, setIsOpenSave] = useState(false);

  const generateQuestions = async () => {
    if (!topic.trim()) return;

    setIsGenerating(true);

    const body = {
      topic: topic,
      level: level,
    };

    let res;

    if (selectedModel === "Gemini") {
      res = await instance.post("/chat", body);
    } else {
      res = await instance.post("/chat/openapi", body);
    }

    if (!res.data.success) {
      alert(res.data.message);
      setIsGenerating(false);
      return;
    }

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

  const onSelectModelChange = (value) => {
    localStorage.setItem("modelAI", value);
    setSelectedModel(value);
  };

  const updateQuizz = async () => {
    const updatedQuizz = {
      quiz: questions,
    };

    const res = await instance.put(`/quiz/${quizz.id}`, updatedQuizz);

    if (res.data) {
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

  const createQuizz = async (name) => {
    const userId = localStorage.getItem("userId");

    const newQuizz = {
      name: name,
      quiz: questions,
      userId: userId,
    };
    const res = await instance.post("/quiz", newQuizz);

    if (res.data) {
      setQuizz({
        id: res.data.id,
        name: name,
        quiz: questions,
        userId: userId,
      });

      toast("Quizz Criado", {
        description: "Quizz criado com sucesso",
        duration: 2000,
        position: "top-right",
      });
    } else {
      toast("Erro ao criar quizz", {
        description: "Erro ao criar quizz",
        duration: 2000,
        position: "top-right",
      });
    }
  };

  const saveQuizz = async (name) => {
    if (quizz.id) {
      updateQuizz();
      return;
    }

    createQuizz(name);
  };

  const onSetName = (name) => {
    setIsOpenSave(false);
    saveQuizz(name);
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
                disabled={!topic.trim() || isGenerating || !selectedModel}
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

      {questions && questions.length > 0 && (
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
              nameOnEdit={quizz.name || ""}
              onSetName={onSetName}
            />
          </div>
        </div>
      )}
    </div>
  );
}
