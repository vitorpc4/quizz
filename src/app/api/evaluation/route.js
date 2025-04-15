import { NextResponse } from "next/server";
import EvaluationRepository from "../../../../backend/Infra/Repository/EvaluationRepository";

const evaluationRepository = new EvaluationRepository();

export async function POST(req) {
  const body = await req.json();
  const { answers, quizId } = body;

  if (!answers || !quizId) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  try {
    const result = await evaluationRepository.createEvaluation(body);

    return NextResponse.json(
      { id: result[0].id, success: true },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar avaliação" }, { status: 500 });
  }
}
