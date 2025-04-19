"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function StatisticsQuizz({ evaluations, participants }) {
  const perfectScores = participants.filter(
    (participant) => participant.score === participant.totalQuestions
  ).length;

  const scoreDistribution = Array(evaluations.totalQuestions + 1)
    .fill(0)
    .map((_, index) => ({
      score: index,
      count: participants.filter((participant) => participant.score === index)
        .length,
    }));

  const averageScore =
    participants.reduce((sum, participant) => sum + participant.score, 0) /
    participants.length;

  const highestScore = Math.max(
    ...participants.map((participant) => participant.score)
  );
  const lowestScore = Math.min(
    ...participants.map((participant) => participant.score)
  );

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Pontuação média</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {averageScore ? averageScore.toFixed(1) : 0}
          </div>
          <p className="text-xs text-muted-foreground">
            de {participants.length}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Nota mais alta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {participants.length > 0 ? highestScore : 0}
          </div>
          <p className="text-xs text-muted-foreground">
            de {participants.length}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Menor Nota</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {participants.length > 0 ? lowestScore : 0}
          </div>
          <p className="text-xs text-muted-foreground">
            de {participants.length}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Notas Máximas </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{perfectScores}</div>
          <p className="text-xs text-muted-foreground">
            {participants.length === 0
              ? 0
              : ((perfectScores / participants.length) * 100).toFixed(1)}
            % dos participantes
          </p>
        </CardContent>
      </Card>

      <Card className="col-start-1 col-end-5">
        <CardHeader>
          <CardTitle>Distribuição das notas</CardTitle>
          <CardDescription>Número de participant por nota</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={scoreDistribution}
                margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="score"
                  label={{
                    value: "Nota",
                    position: "insideBottom",
                    offset: -10,
                  }}
                />
                <YAxis
                  label={{
                    value: "Participantes",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip
                  formatter={(value) => [`${value} participantes`, "total"]}
                  labelFormatter={(value) => `Score: ${value}`}
                />
                <Bar dataKey="count" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
