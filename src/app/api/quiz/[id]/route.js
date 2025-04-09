import { NextResponse } from "next/server";
import { db } from "@/db/index";
import { eq } from "drizzle-orm";

export async function GET(req, { params }) {
  if (!params || !params.id) {
    return NextResponse.json({ error: "ID do quiz não informado" }, { status: 400 });
  }

  const quiz = await db
    .select()
    .from(QuizzesTable)
    .where(and(eq(QuizzesTable.id, params.id), isNull(QuizzesTable.deletedDate)))
    .limit(1)
    .execute();

  if (!quiz || quiz.length === 0) {
    return NextResponse.json({ error: "Quiz não encontrado" }, { status: 404 });
  }

  return NextResponse.json(quiz[0]);
}


export async function PUT(req, { params }) {
  if (!params || !params.id) {
    return NextResponse.json({ error: "ID do quiz não informado" }, { status: 400 });
  }

  const body = await req.json();
  const { quiz } = body;

  if (!quiz) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  try {
    await db
      .update(QuizzesTable)
      .set({ quiz, updatedDate: new Date() })
      .where(and(eq(QuizzesTable.id, params.id), isNull(QuizzesTable.deletedDate)))
      .execute();

    return NextResponse.json({ message: "Quiz atualizado com sucesso" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar quiz" }, { status: 500 });
  }
}


export async function DELETE(req, { params }) {
  if (!params || !params.id) {
    return NextResponse.json({ error: "ID do quiz não informado" }, { status: 400 });
  }

  try {
    await db
      .update(QuizzesTable)
      .set({ deletedDate: new Date() })
      .where(eq(QuizzesTable.id, params.id))
      .execute();

    return NextResponse.json({ message: "Quiz removido com sucesso (soft delete)" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao remover quiz" }, { status: 500 });
  }
}
