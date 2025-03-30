import { NextResponse } from "next/server";

export async function GET(_, urlParams) {
  const params = await urlParams.params;

  console.log("params: ");

  if (!params.id) {
    return NextResponse.json(
      {
        error: "No quiz ID provided",
      },
      { status: 400 }
    );
  }

  return NextResponse.json({
    message: `Buscando quiz com ID ${params.id}`,
  });
}
