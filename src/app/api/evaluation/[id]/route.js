import { NextResponse } from 'next/server';
import EvaluationRepository from '../../../../../backend/infra/repository/evaluation-repository';
import QuizRepository from '../../../../../backend/infra/repository/quiz-repository';

const evaluationRepository = new EvaluationRepository();
const quizRepository = new QuizRepository();

export async function GET(req, { params }) {
  const id = (await params).id;

  if (!id) {
    return NextResponse.json(
      { error: 'ID do quiz não informado' },
      { status: 400 }
    );
  }

  const quiz = await quizRepository.getQuizById(id);

  if (!quiz) {
    return NextResponse.json({ error: 'Quiz não encontrado' }, { status: 404 });
  }

  const evaluations = await evaluationRepository.getEvaluationByQuizId(id);

  if (!evaluations) {
    return NextResponse.json(
      { error: 'Avaliação não encontrada' },
      { status: 404 }
    );
  }

  const questions = quiz[0].quiz.map(question => {
    return {
      id: question.id,
      question: question.question,
      answers: question.answers.map(option => {
        return {
          id: option.id,
          option: option.option,
          isCorrect: option.isCorrect
        };
      })
    };
  });

  const usersEvaluations = [];

  for (const evaluation of evaluations) {
    let countTotalScore = 0;

    for (let i = 1; i <= questions.length; i++) {
      const userAnswer = evaluation.answers[i];
      const question = questions[i - 1];

      for (const ans of question.answers) {
        if (ans.id == userAnswer) {
          if (ans.isCorrect) {
            countTotalScore++;
          } else {
          }
        }
      }
    }

    usersEvaluations.push({
      id: evaluation.id,
      email: evaluation.email,
      score: countTotalScore,
      completedAt: evaluation.createdDate,
      totalQuestions: questions.length
    });
  }

  const response = {
    id: quiz[0].id,
    name: quiz[0].name,
    createDateQuiz: quiz[0].createdDate,
    totalQuestions: questions.length,
    usersEvaluations: usersEvaluations
  };

  return NextResponse.json(response, { status: 200 });
}
