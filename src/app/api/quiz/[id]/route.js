import { NextResponse } from "next/server";
import QuizzRepository from "../../../../../backend/Infra/Repository/QuizzRepository";

const quizzRepository = new QuizzRepository();

export async function GET(req, { params }) {
  const id = (await params).id;

  if (!id) {
    return NextResponse.json(
      { error: "ID do quiz não informado" },
      { status: 400 }
    );
  }

  const quiz = await quizzRepository.getQuizById(id);

  if (!quiz || quiz.length === 0) {
    return NextResponse.json({ error: "Quiz não encontrado" }, { status: 404 });
  }

  return NextResponse.json(
    {
      quiz: quiz[0],
    },
    { status: 200 }
  );
}

export async function PUT(req, { params }) {
  const { id } = await params;

  const body = await req.json();

  const { quiz, name } = body;

  if (!quiz || !name) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  try {
    const searchQuizz = await quizzRepository.getQuizById(id);
    if (!searchQuizz) {
      return NextResponse.json(
        { error: "Quiz não encontrado" },
        { status: 404 }
      );
    }

    searchQuizz.name = name;
    searchQuizz.quiz = quiz;

    const result = await quizzRepository.updateQuiz(id, searchQuizz);

    if (result) {
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Quiz não encontrado" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar quiz" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const id = (await params).id;

  if (!id) {
    return NextResponse.json(
      { error: "ID do quiz não informado" },
      { status: 400 }
    );
  }

  try {
    await quizzRepository.deleteQuiz(id);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao remover quiz" },
      { status: 500 }
    );
  }
}
