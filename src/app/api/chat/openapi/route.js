import instance from "@/http/OpenApiAxiosCtx";
import { NextResponse } from "next/server";

export async function POST(request) {
  const requestBody = await request.json();

  const body = {
    messages: [
      {
        role: "user",
        content: `Generate 10 random questions about ${requestBody.topic} in the provided JSON format. These questions should be suitable for ${requestBody.level} level, and they should cover a wide range of concepts related to the topic. Only one answer can be correct. JSON example:{ "questions": [ { "id": 1, "question": "[INSERT QUESTION HERE]", "explanation": "[INSERT EXPLANATION HERE]", "answers": [ {"id": 1, "option": "[ANSWER 1]", "isCorrect": false}, {"id": 2, "option": "[ANSWER 2]", "isCorrect": false}, {"id": 3, "option": "[ANSWER 3]", "isCorrect": true}, {"id": 4, "option": "[ANSWER 4]", "isCorrect": false} ] }, { "id": 2, "question": "[INSERT QUESTION HERE]", "explanation": "[INSERT EXPLANATION HERE]", "answers": [ {"id": 1, "option": "[ANSWER 1]", "isCorrect": true}, {"id": 2, "option": "[ANSWER 2]", "isCorrect": false}, {"id": 3, "option": "[ANSWER 3]", "isCorrect": false}, {"id": 4, "option": "[ANSWER 4]", "isCorrect": false} ] } ]} For each question, provide an explanation and multiple answer options, ensuring only one option is isCorrect. The inisCorrect answers should also be relevant and well-phrased to challenge the student. Attention only generate the json do not use markdown for anything. GENERATE ONLY THE JSON.`,
      },
    ],
    model: "llama-3.3-70b-versatile",
  };

  const res = await instance.post("/v1/chat/completions", body);

  if (res.data) {
    return NextResponse.json({
      questions: `${res.data.choices[0].message.content}`,
      message: "Success",
      success: true,
    });
  } else {
    return NextResponse.json(
      {
        questions: "",
        message: "Failure",
        sucess: false,
      },
      { status: 400 }
    );
  }
}
