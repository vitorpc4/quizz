"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Trash2, GripVertical } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function QuestionEditor({ question, onUpdate, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [correctAnswerId, setCorrectAnswerId] = useState(() => {
    const correctAnswer = question.answers.find((a) => a.isCorrect);
    return correctAnswer ? correctAnswer.id : "";
  });

  // Update question text
  const updateQuestionText = (text) => {
    onUpdate({
      ...question,
      text,
    });
  };

  // Update answer text
  const updateAnswerText = (answerId, text) => {
    onUpdate({
      ...question,
      answers: question.answers.map((a) =>
        a.id === answerId ? { ...a, text } : a
      ),
    });
  };

  // Set correct answer
  const setCorrectAnswer = (answerId) => {
    setCorrectAnswerId(answerId);
    onUpdate({
      ...question,
      answers: question.answers.map((a) => ({
        ...a,
        isCorrect: a.id === answerId,
      })),
    });
  };

  return (
    <Card className="border border-muted">
      <CardHeader className="p-4 pb-0">
        <Accordion
          type="single"
          collapsible
          defaultValue="item-1"
          className="w-full"
        >
          <AccordionItem value="item-1" className="border-none">
            <div className="flex items-start justify-between">
              <AccordionTrigger
                onClick={() => setIsExpanded(!isExpanded)}
                className="py-0 hover:no-underline"
              >
                <div className="flex items-center gap-2 text-left">
                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">
                    {question.question || "New Question"}
                  </span>
                </div>
              </AccordionTrigger>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(question.id)}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete question</span>
              </Button>
            </div>

            <AccordionContent className="pt-4">
              <CardContent className="p-0 pb-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`question-${question.id}`}>
                      Question Text
                    </Label>
                    <Textarea
                      id={`question-${question.id}`}
                      value={question.option}
                      onChange={(e) => updateQuestionText(e.target.value)}
                      placeholder="Enter your question here"
                      className="mt-1.5"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Answer Options</Label>
                    <RadioGroup
                      value={correctAnswerId}
                      onValueChange={setCorrectAnswer}
                      className="space-y-3"
                    >
                      {question.answers.map((answer, index) => (
                        <div
                          key={answer.id}
                          className="flex items-start space-x-2"
                        >
                          <RadioGroupItem
                            value={answer.id}
                            id={answer.id}
                            className="mt-3"
                          />
                          <div className="flex-1">
                            <Label
                              htmlFor={answer.id}
                              className="text-muted-foreground"
                            >
                              {answer.isCorrect ? "Correct Answer" : "Option"}
                            </Label>
                            <Input
                              value={answer.option}
                              onChange={(e) =>
                                updateAnswerText(answer.id, e.target.value)
                              }
                              placeholder={`Answer option ${index + 1}`}
                              className={`mt-1 ${
                                answer.isCorrect
                                  ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                                  : ""
                              }`}
                            />
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardHeader>
    </Card>
  );
}
