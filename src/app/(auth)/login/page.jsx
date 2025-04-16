"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import instance from "@/http";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loginError, setLoginError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");

    try {
      const res = await instance.post("/auth", {
        email,
        password,
        type: "login",
      });

      localStorage.setItem("userId", res.data.result.userId);
      router.push("/quiz");

    } catch (err) {
      setLoginError("Credenciais inválidas");
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-600 p-8 rounded-lg shadow-lg w-[350px] text-gray-100">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <button
          type="submit"
          className="bg-gray-500 text-white p-2 rounded hover:bg-black transition-colors"
        >
          Entrar
        </button>
      </form>
      {loginError && (
        <p className="text-red-500 text-sm mt-4">{loginError}</p>
      )}
      <p className="mt-4 text-sm text-gray-200">
        Não tem uma conta?{" "}
        <Link href="/register" className="text-gray-500 hover:underline">
          Cadastre-se
        </Link>
      </p>
    </div>
  );
}
