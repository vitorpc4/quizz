import { NextResponse } from "next/server";
import { db } from "@/db/index";
export async function GET(req) {

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId não informado" }, { status: 400 });
  }

  try {
    const quizzes = await db
      .select()
      .from(QuizzesTable)
      .where(and(eq(QuizzesTable.userId, userId), isNull(QuizzesTable.deletedDate)))
      .execute();

    return NextResponse.json(quizzes);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar quizzes do usuário" }, { status: 500 });
  }
}


export async function POST(req) {
  const body = await req.json();
  const { quiz, userId } = body;

  if (!quiz || !userId) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  try {
    const [newQuiz] = await db
      .insert(QuizzesTable)
      .values({ quiz, userId })
      .returning();

    return NextResponse.json(newQuiz);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar quiz" }, { status: 500 });
  }
}
