"use client";

import { Card, CardContent } from "@/Components/ui/card";
import { use } from "react";

export default function QuizSlugPage({ params }) {
  const paramsUrl = use(params);

  return (
    <div className="space-y-6 w-[50rem] ">
      <Card>
        <CardContent className="w-full">
          <p>Questão <span className="font-bold">1</span> de <span className="font-bold">10</span></p>
          <p className="mt-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit?</p>
          <form className="mt-4">
            <label htmlFor="paris" className="block mt-3 p-4 border rounded-md cursor-pointer has-checked:ring-1 has-checked:ring-blue-400">
              <input type="radio" id="paris" name="quiz" className="hidden" />
              Paris
            </label>

            <label htmlFor="londres" className="block mt-3 p-4 border rounded-md cursor-pointer has-checked:ring-1 has-checked:ring-blue-400">
              <input type="radio" id="londres" name="quiz" className="hidden" />
              Londres
            </label>

            <label htmlFor="berlim" className="block mt-3 p-4 border rounded-md cursor-pointer has-checked:ring-1 has-checked:ring-blue-400">
              <input type="radio" id="berlim" name="quiz" className="hidden" />
              Berlim
            </label>

            <label htmlFor="madri" className="block mt-3 p-4 border rounded-md cursor-pointer has-checked:ring-1 has-checked:ring-blue-400">
              <input type="radio" id="madri" name="quiz" className="hidden" />
              Madri
            </label>

            <button type="submit" className="mt-8 w-full cursor-pointer bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500">Próxima</button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
