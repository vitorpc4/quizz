import { NextResponse } from "next/server";
import EvaluationRepository from "../../../../backend/Infra/Repository/EvaluationRepository";
import QuizzRepository from "../../../../backend/Infra/Repository/QuizzRepository";

const quizzRepository = new QuizzRepository();
const evaluationRepository = new EvaluationRepository();

export async function GET(req) {
  const quizzesCompleted =
    await evaluationRepository.GetCompletedQuizzesAtLastMonth();
  const quizzesCreated = await quizzRepository.createQuizzesAtLastMonth();
  const completionTrend = await evaluationRepository.GetCompletionTrend();
  const topQuizzes = await evaluationRepository.getTopQuizzes();

  const dashboard = {
    quizzesCompleted: Number.parseInt(quizzesCompleted[0].total),
    quizzesCreated: Number.parseInt(quizzesCreated[0].total),
    completionTrend: completionTrend,
    topQuizzes: topQuizzes,
  };

  return NextResponse.json(dashboard, { status: 200 });
}
