import { NextResponse } from "next/server";
import { login, logout, register } from "@/services/auth";
import { z } from "zod";

const authSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("register"),
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  }),
  z.object({
    type: z.literal("login"),
    email: z.string().email(),
    password: z.string().min(6)
  }),
  z.object({
    type: z.literal("logout")
  })
]);

export async function POST(request) {
  try {
    const requestData = await request.json();

    const validation = authSchema.safeParse(requestData);
    if (!validation.success) {
      const { error } = validation;

      if (requestData.type === "register") {
        return NextResponse.json({ errors: error.flatten().fieldErrors }, { status: 400 });
      }

      if (requestData.type === "login") {
        return NextResponse.json(
          { errors: "Credenciais inválidas" },
          { status: 401 }
        );
      }
      return NextResponse.json({ error: "Requisição inválida" }, { status: 400 });
    }

    const { data } = validation;

    switch (data.type) {
      case "register":
        const { name, email, password } = data;
        const registerToken = await register(name, email, password);
        return NextResponse.json({ token: registerToken });

      case "login":
        const loginResult = await login(data.email, data.password);
        return NextResponse.json({ result: loginResult });

      case "logout":
        await logout();
        return NextResponse.json({ message: "Logout realizado com sucesso." });

      default:
        return NextResponse.json(
          { error: "Tipo de ação inválido." },
          { status: 400 }
        );
    }
  } catch (err) {
    console.error("Erro na requisição:", err);
    return NextResponse.json(
      { error: err.message || "Erro interno no servidor." },
      { status: 500 }
    );
  }
}