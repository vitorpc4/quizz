import { db } from "@/db";
import { QuizzesTable } from "@/db/schema";

export default class QuizzRepository {
  async getQuizzes() {
    return await db.select().from(QuizzesTable).execute();
  }

  async getQuizById(id) {
    return await db.select().from(QuizzesTable).where({ id }).execute();
  }

  async createQuiz(quiz) {
    return await db.insert(QuizzesTable).values(quiz).execute();
  }

  async updateQuiz(id, quiz) {
    return await db.update(QuizzesTable).set(quiz).where({ id }).execute();
  }

  async deleteQuiz(id) {
    return await db.delete().from(QuizzesTable).where({ id }).execute();
  }
}
