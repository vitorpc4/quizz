import { db } from "@/db";
import { QuizzesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export default class QuizzRepository {
  async getQuizzes() {
    return await db.select().from(QuizzesTable).execute();
  }

  async getQuizById(id) {
    return await db.select().from(QuizzesTable).where(eq(QuizzesTable.id, id));
  }

  async createQuiz(quiz) {
    return await db
      .insert(QuizzesTable)
      .values(quiz)
      .returning({ id: QuizzesTable.id });
  }

  async updateQuiz(id, quiz) {
    return await db
      .update(QuizzesTable)
      .set(quiz)
      .where(eq(QuizzesTable.id, id))
      .execute();
  }

  async deleteQuiz(id) {
    return await db.delete(QuizzesTable).where(eq(QuizzesTable.id, id));
  }
}
