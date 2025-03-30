"use client";

import { use } from "react";

export default function QuizSlugPage({ params }) {
  const paramsUrl = use(params);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] items-center sm:items-start">
        <h1 className="text-2xl font-bold">Quiz Slug Page</h1>
        <p className="text-lg">Welcome to the quiz slug page!</p>
        <p className="text-lg">Slug: {paramsUrl.slug}</p>
      </main>
    </div>
  );
}
