"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

// Send data for dad component

export default function SetNameQuizzDialog({ onSetName, open }) {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(open);

  const saveName = () => {
    if (!name.trim()) {
      setErrors((prev) => ({ ...prev, name: "Nome é obrigatório" }));
      return;
    }
    if (name.length < 3) {
      setErrors((prev) => ({
        ...prev,
        name: "Nome deve ter pelo menos 3 caracteres",
      }));
      return;
    }
    if (name.length > 50) {
      setErrors((prev) => ({
        ...prev,
        name: "Nome deve ter no máximo 50 caracteres",
      }));
      return;
    }
    setErrors({});
    setIsOpen(false);
    onSetName(name);
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Salvar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max:w-[425px]">
        <DialogHeader>
          <DialogTitle>Nome para o quizz</DialogTitle>
          <DialogDescription>
            Insira um nome para o quizz que você está criando. Esse nome será
            usado para identificar o quizz na sua lista de quizzes.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label htmlFor="name">Nome do quizz</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="border p-2 rounded-md w-full"
            placeholder="Nome do quizz"
          />
          {errors.name && (
            <p className="text-red-500 text-sm ml-2">{errors.name}</p>
          )}
        </div>

        <DialogFooter>
          <Button onClick={saveName}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
