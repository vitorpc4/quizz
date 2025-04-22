import { NextResponse } from 'next/server';
import EvaluationRepository from '../../../../backend/infra/repository/evaluation-repository';
import QuizRepository from '../../../../backend/infra/repository/quiz-repository';

const quizRepository = new QuizRepository();
const evaluationRepository = new EvaluationRepository();

export async function GET(req) {
  const quizzesCompleted =
    await evaluationRepository.GetCompletedQuizzesAtLastMonth();
  const quizzesCreated = await quizRepository.createQuizzesAtLastMonth();
  const completionTrend = await evaluationRepository.GetCompletionTrend();
  const topQuizzes = await evaluationRepository.getTopQuizzes();

  const dashboard = {
    quizzesCompleted: Number.parseInt(quizzesCompleted[0].total),
    quizzesCreated: Number.parseInt(quizzesCreated[0].total),
    completionTrend: completionTrend,
    topQuizzes: topQuizzes
  };

  return NextResponse.json(dashboard, { status: 200 });
}
