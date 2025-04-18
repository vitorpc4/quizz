"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatisticsQuizz from "../Evaluation/statisticsquizz";
import Participantquizz from "../Evaluation/participantquizz";
import EvaluationHeader from "../Evaluation/evaluationheader";

export default function EvaluationQuizz({ evaluations }) {
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
          <Participantquizz key="participant" participants={participants} />
        </TabsContent>

        <TabsContent value="statistics" className="space-y-6">
          <StatisticsQuizz
            key="statistics"
            evaluations={evaluations}
            participants={participants}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
