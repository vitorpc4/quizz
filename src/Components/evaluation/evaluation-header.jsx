import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "../ui/badge";

import FormatDate from "../format-date";

export default function EvaluationHeader({ evaluations }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{evaluations.name}</CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="outline" className="text-xs">
            {evaluations.totalQuestions} Questões
          </Badge>
          <Badge variant="outline" className="text-xs">
            {evaluations.usersEvaluations.length} Participantes
          </Badge>
          <Badge variant="outline" className="text-xs">
            Criado: <FormatDate date={evaluations.createDateQuiz} />
          </Badge>
        </div>
      </CardHeader>
    </Card>
  );
}
