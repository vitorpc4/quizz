import { NextResponse } from "next/server";
import { login, logout, register } from "@/lib/auth";

export async function POST(request) {
  try {
    const { name, email, password, type } = await request.json();

    switch (type) {
      case "register":
        if (!name || !email || !password) {
          return NextResponse.json({ error: "Dados incompletos para registro." }, { status: 400 });
        }
        const registerToken = await register(name, email, password);
        return NextResponse.json({ token: registerToken });

      case "login":
        if (!email || !password) {
          return NextResponse.json({ error: "Email e senha são obrigatórios." }, { status: 400 });
        }
        const loginResult = await login(email, password);
        return NextResponse.json({ result: loginResult });

      case "logout":
        await logout();
        return NextResponse.json({ message: "Logout realizado com sucesso." });

      default:
        return NextResponse.json({ error: "Tipo de ação inválido." }, { status: 400 });
    }
  } catch (err) {
    console.error("Erro na requisição:", err);
    return NextResponse.json({ error: err.message || "Erro interno no servidor." }, { status: 500 });
  }
}

