"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import instance from "@/http";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [errors, setErrors] = useState({});
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const res = await instance.post("/auth", {
        name,
        email,
        password,
        type: "register",
      });

      localStorage.setItem("userId", res.data.token.userId);
      router.push("/quiz");

    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors({ form: ["Erro ao cadastrar. Tente novamente."] });
      }
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-600 p-8 rounded-lg shadow-lg w-[350px]">
      <h1 className="text-2xl font-bold mb-6">Cadastro</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        {errors.name && (
          <span className="text-red-400 text-sm mt-1">{errors.name[0]}</span>
        )}
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        {errors.email && (
          <span className="text-red-400 text-sm mt-1">{errors.email[0]}</span>
        )}
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        {errors.password && (
          <span className="text-red-400 text-sm mt-1">{errors.password[0]}</span>
        )}
        <Button type="submit" className="bg-gray-500 text-white p-2 rounded hover:bg-black">
          Cadastrar
        </Button>
        {errors.form && (
          <div className="text-red-400 text-sm mt-2">{errors.form[0]}</div>
        )}
      </form>
      <p className="mt-4 text-sm">
        Já tem uma conta?{" "}
        <Link href="/login" className="text-gray-500 hover:underline">
          Faça login
        </Link>
      </p>
    </div>
  );
}
