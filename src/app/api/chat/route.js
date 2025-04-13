import { NextResponse } from "next/server";

export async function POST(request) {
  const requestBody = await request.json();

  const body = {
    contents: [
      {
        parts: [
          {
            text: `Generate 5 random questions about ${requestBody.topic} in strict JSON format. Follow exactly this structure:
          {
            "questions": [
              {
                "id": "[INCREMENT INTEGER]",
                "question": "[QUESTION]",
                "explanation": "[EXPLANATION]",
                "answers": [
                  {"id": 1, "option": "[OPTION 1]", "correct": false},
                  {"id": 2, "option": "[OPTION 2]", "correct": false},
                  {"id": 3, "option": "[OPTION 3]", "correct": true},
                  {"id": 4, "option": "[OPTION 4]", "correct": false}
                ]
              }
            ]
          }

          Requirements:
          - Suitable for ${requestBody.level} level
          - Only one correct answer
          - Return ONLY RAW JSON without any formatting, backticks, or markdown
          - Keep JSON properties lowercase`,
          },
        ],
      },
    ],
    generation_config: {
      response_mime_type: "application/json"
    },
  };

  try {
    const endpoint =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

    const response = await fetch(
      `${endpoint}?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({
        message: errorData.error.message,
        success: false,
      });
    }

    const data = await response.json();
    console.log(data.candidates[0].content.parts[0].text);

    return NextResponse.json({
      questions: data.candidates[0].content.parts[0].text,
      message: "Success",
      success: true,
    });

  } catch (error) {
    console.error("Erro ao chamar a API Gemini:", error);
    return NextResponse.json({ message: error, success: false });
  }
}
