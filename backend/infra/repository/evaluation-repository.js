import { db } from '@/db';
import { EvaluationsTable, QuizzesTable } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';

export default class EvaluationRepository {
  async getEvaluations() {
    return await db.select().from(EvaluationsTable).execute();
  }

  async getEvaluationById(id) {
    return await db
      .select()
      .from(EvaluationsTable)
      .where(eq(EvaluationsTable.id, id));
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

  async getEvaluationByQuizId(id) {
    return await db
      .select()
      .from(EvaluationsTable)
      .where(eq(EvaluationsTable.quizId, id));
  }

  async GetCompletedQuizzesAtLastMonth() {
    return await db
      .select({
        total: sql`COUNT(*)`.as('total')
      })
      .from(EvaluationsTable)
      .where(
        sql`${EvaluationsTable.createdDate} >= now() - interval '30 days' AND ${EvaluationsTable.createdDate} <= now()`
      );
  }

  async GetCompletionTrend() {
    const result = await db
      .select({
        mon: sql`TO_CHAR(${EvaluationsTable.createdDate}, 'MON')`.as('mon'),
        mon_num: sql`DATE_PART('month', ${EvaluationsTable.createdDate})`.as(
          'mon_num'
        ),
        total: sql`COUNT(*)`.as('total')
      })
      .from(EvaluationsTable)
      .groupBy(sql`mon, mon_num`)
      .orderBy(sql`mon_num`);

    const months = [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC'
    ];

    return months.map(month => {
      const finded = result.find(item => item.mon === month);

      return {
        month: month,
        completions: finded ? Number.parseInt(finded.total) : 0
      };
    });
  }

  async getTopQuizzes() {
    const results = await db
      .select({
        name: QuizzesTable.name,
        completions: sql`COUNT(${EvaluationsTable.id})`.as('completions')
      })
      .from(EvaluationsTable)
      .innerJoin(
        QuizzesTable,
        sql`${QuizzesTable.id} = ${EvaluationsTable.quizId}`
      )
      .groupBy(sql`${QuizzesTable.name}`) // Alterado para usar sql tag
      .orderBy(sql`completions DESC`)
      .limit(5);

    return results.map(item => ({
      name: item.name,
      completions: item.completions
    }));
  }
}
