"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatisticsQuiz from "../evaluation/statistics-quiz";
import ParticipantQuiz from "../evaluation/participant-quiz";
import EvaluationHeader from "../evaluation/evaluation-header";

export default function EvaluationQuiz({ evaluations }) {
  const [participants] = useState(evaluations.usersEvaluations);

  return (
    <div className="space-y-6">
      <EvaluationHeader key="evaluationheader" evaluations={evaluations} />

      <Tabs defaultValue="participants" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="participants">Participantes</TabsTrigger>
          <TabsTrigger value="statistics">Estatística</TabsTrigger>
        </TabsList>

        <TabsContent value="participants" className="space-y-4">
          <ParticipantQuiz key="participant" participants={participants} />
        </TabsContent>

        <TabsContent value="statistics" className="space-y-6">
          <StatisticsQuiz
            key="statistics"
            evaluations={evaluations}
            participants={participants}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
