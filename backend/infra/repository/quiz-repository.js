import { db } from '@/db';
import { QuizzesTable } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';

export default class QuizRepository {
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

  async createQuizzesAtLastMonth() {
    return await db
      .select({
        total: sql`COUNT(*)`.as('total')
      })
      .from(QuizzesTable)
      .where(
        sql`${QuizzesTable.createdDate} >= now() - interval '30 days' AND ${QuizzesTable.createdDate} <= now()`
      );
  }
}
