"use client";

import EvaluationQuizz from "@/Components/Quiz/evaluationquiz";
import instance from "@/http";
import { use, useEffect, useState } from "react";

export default function EvaluationPage({ params }) {
  const paramsUrl = use(params);

  const [evaluation, setEvaluation] = useState();

  const getEvaluations = async () => {
    const response = await instance.get(`/evaluation/${paramsUrl.slug}`);
    if (response.data) {
      setEvaluation(response.data);
    }
  };

  useEffect(() => {
    getEvaluations();
  }, []);

  return (
    <div className="p-3">
      {evaluation && <EvaluationQuizz evaluations={evaluation} />}
    </div>
  );
}
