import { NextResponse } from "next/server";
import QuizzRepository from "../../../../backend/Infra/Repository/QuizzRepository";

const Repository = new QuizzRepository();

export async function GET(req) {
  try {
    const quizzes = await Repository.getQuizzes();

    if (!quizzes) {
      return NextResponse.json(
        { error: "Nenhum quiz encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(quizzes, { status: 200 });

    return NextResponse.json(quizzes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar quizzes" },
      { status: 500 }
    );
  }
}
