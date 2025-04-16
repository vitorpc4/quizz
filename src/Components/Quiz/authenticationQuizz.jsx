"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import DOMPurify from 'dompurify';


export default function AuthenticationQuizz({ open, onSetEmail }) {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return emailRegex.test(email);
  };

  const authenticateQuizz = () => {
    const newErrors = {};
    const sanitizedEmail = DOMPurify.sanitize(email.trim());

    if (!sanitizedEmail) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!validateEmail(sanitizedEmail)) {
      newErrors.email = "Formato de e-mail inválido";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsOpen(false);
    onSetEmail(sanitizedEmail);
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max:w-[425px] [&>button.absolute]:hidden">
        <DialogHeader>
          <DialogTitle>Antes de começar...</DialogTitle>
          <DialogDescription>
            Insira seu e-mail para iniciar o quiz.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label htmlFor="name">E-mail</Label>
          <Input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="border p-2 rounded-md w-full"
            placeholder="seuemail@exemplo.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm ml-2">{errors.email}</p>
          )}
        </div>

        <DialogFooter>
          <Button onClick={authenticateQuizz}>Iniciar quizz</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
