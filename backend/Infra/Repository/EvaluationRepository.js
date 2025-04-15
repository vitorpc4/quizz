import { db } from "@/db";
import { EvaluationsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export default class EvaluationRepository {
  async getEvaluations() {
    return await db.select().from(EvaluationsTable).execute();
  }

  async getEvaluationById(id) {
    return await db.select().from(EvaluationsTable).where(eq(EvaluationsTable.id, id));
  }

  async createEvaluation(evaluation) {
    return await db
      .insert(EvaluationsTable)
      .values(evaluation)
      .returning({ id: EvaluationsTable.id });
  }

  async deleteEvaluation(id) {
    return await db.delete(EvaluationsTable).where(eq(EvaluationsTable.id, id));
  }
}
