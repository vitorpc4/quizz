"use client";

import { Button } from "@/Components/ui/button";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth", 
        { method: "POST", 
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "logout" })
        });
      router.push("/login");
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    }
  };

  return (
    <header className="flex justify-between items-center px-6 pt-6 pb-4 border-b mb-4">
      <h1 className="text-2xl font-bold">Quiz App</h1>
      <Button variant="destructive" onClick={handleLogout}>
        Logout
      </Button>
    </header>
  );
}
