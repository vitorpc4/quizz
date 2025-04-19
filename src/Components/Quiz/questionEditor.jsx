"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Trash2, GripVertical, Pencil, Check, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ConfirmationDelete from "../ConfirmationDelete";

export default function QuestionEditor({
  questionObject,
  onUpdate,
  onDelete,
  setLockSave,
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [questionObjectState, setQuestionObjectState] =
    useState(questionObject);

  const [correctAnswerId, setCorrectAnswerId] = useState(() => {
    const correctAnswer = questionObject.answers.find((a) => a.isCorrect);
    return correctAnswer ? correctAnswer.id : "";
  });

  const [allowEditQuestion, setAllowEditQuestion] = useState(true);
  const [tempQuestion, setTempQuestion] = useState();
  const [changeStateAccordion, setChangeStateAccordion] = useState(true);

  const updateQuestionText = (question) => {
    onUpdate({
      ...questionObjectState,
      question,
    });
  };

  const updateAnswerText = (answerId, option) => {
    onUpdate({
      ...questionObjectState,
      answers: questionObjectState.answers.map((a) =>
        a.id === answerId ? { ...a, option } : a
      ),
    });

    setQuestionObjectState({
      ...questionObjectState,
      answers: questionObjectState.answers.map((a) =>
        a.id === answerId ? { ...a, option } : a
      ),
    });
  };

  const setCorrectAnswer = (answerId) => {
    setCorrectAnswerId(answerId);

    setQuestionObjectState({
      ...questionObjectState,
      answers: questionObjectState.answers.map((a) => ({
        ...a,
        isCorrect: a.id === answerId,
      })),
    });

    onUpdate({
      ...questionObjectState,
      answers: questionObjectState.answers.map((a) => ({
        ...a,
        isCorrect: a.id === answerId,
      })),
    });
  };

  const toggleEditQuestion = () => {
    setAllowEditQuestion(!allowEditQuestion);
    setTempQuestion(questionObjectState.question);
    setLockSave(true);
    setChangeStateAccordion(!changeStateAccordion);
  };

  const unmakeChangesQuestion = () => {
    setAllowEditQuestion(!allowEditQuestion);
    setQuestionObjectState({
      ...questionObjectState,
      question: tempQuestion,
    });

    updateQuestionText(tempQuestion);
    setTempQuestion("");
    setLockSave(false);
    setChangeStateAccordion(!changeStateAccordion);
  };

  const updateQuestionTextArea = (e) => {
    updateQuestionText(e.target.value);
    setQuestionObjectState({
      ...questionObjectState,
      question: e.target.value,
    });
  };

  const saveChangesQuestion = () => {
    setAllowEditQuestion(!allowEditQuestion);
    setTempQuestion(questionObjectState.question);
    setQuestionObjectState({
      ...questionObjectState,
      question: questionObjectState.question,
    });
    setLockSave(false);
    setChangeStateAccordion(!changeStateAccordion);
  };

  const deleteQuestion = () => {
    onDelete(questionObject.id);
  };

  useState(() => {
    setQuestionObjectState(questionObject);
  }, [questionObject]);

  return (
    <Card className="border border-muted">
      <CardHeader className="p-4 pb-0">
        <div className="ml-4">
          {allowEditQuestion ? (
            <Button onClick={toggleEditQuestion} variant="ghost" size="sm">
              <Pencil />
            </Button>
          ) : (
            <>
              <Button onClick={saveChangesQuestion} variant="ghost" size="sm">
                <Check />
              </Button>
              <Button onClick={unmakeChangesQuestion} variant="ghost" size="sm">
                <X />
              </Button>
            </>
          )}
        </div>
        <Accordion
          type="single"
          collapsible={changeStateAccordion}
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
                  <Textarea
                    value={questionObjectState.question}
                    onChange={(e) => updateQuestionTextArea(e)}
                    disabled={allowEditQuestion}
                    className="max-w-[42rem] min-w-[42rem]"
                  />
                </div>
              </AccordionTrigger>
              <div>
                <ConfirmationDelete setDelete={deleteQuestion} />
              </div>
            </div>

            <AccordionContent className="pt-4">
              <CardContent className="p-0 pb-4">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <Label>Answer Options</Label>
                    <RadioGroup
                      value={correctAnswerId}
                      onValueChange={setCorrectAnswer}
                      className="space-y-3"
                    >
                      {questionObjectState.answers.map((answer, index) => (
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
