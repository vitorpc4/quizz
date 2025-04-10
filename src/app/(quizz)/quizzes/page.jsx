"use client";

import ListQuizzesComponent from "@/Components/Quiz/listQuizzes";
import { useState } from "react";

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState([
    {
      id: "2f09a884-52b7-431a-a43c-eaa440d80149",
      name: "First Quiz",
    },
    {
      id: "302730ff-df31-453f-b679-84d4f7d46736",
      name: "Second Quiz",
    },
    {
      id: "2e05e7e8-6595-4195-9b26-1f750e3981a5",
      name: "Third Quiz",
    },
    {
      id: "3cf37240-2a77-4214-a2e2-c9241e2bfb6e",
      name: "Fourth Quiz",
    },
  ]);

  return (
    <div className="flex justify-center p-4">
      <div className="w-full">
        <ListQuizzesComponent quizzez={quizzes} />
      </div>
    </div>
  );
}
