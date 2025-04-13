import { NextResponse } from "next/server";
import { db } from "@/db/index";
import QuizzRepository from "../../../../backend/Infra/Repository/QuizzRepository";

const quizzRepository = new QuizzRepository();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "userId não informado" },
      { status: 400 }
    );
  }

  try {
    const quizzes = await db
      .select()
      .from(QuizzesTable)
      .where(
        and(eq(QuizzesTable.userId, userId), isNull(QuizzesTable.deletedDate))
      )
      .execute();

    return NextResponse.json(quizzes);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar quizzes do usuário" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const body = await req.json();
  const { quiz, userId } = body;

  if (!quiz || !userId) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  try {
    const result = await quizzRepository.createQuiz(body);

    return NextResponse.json(
      { id: result[0].id, success: true },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar quiz" }, { status: 500 });
  }
}
