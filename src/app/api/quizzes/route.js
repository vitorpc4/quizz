import { NextResponse } from 'next/server';
import QuizRepository from '../../../../backend/infra/repository/quiz-repository';

const quizRepository = new QuizRepository();

export async function GET(req) {
  try {
    const quizzes = await quizRepository.getQuizzes();

    if (!quizzes) {
      return NextResponse.json(
        { error: 'Nenhum quiz encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(quizzes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar quizzes' },
      { status: 500 }
    );
  }
}
