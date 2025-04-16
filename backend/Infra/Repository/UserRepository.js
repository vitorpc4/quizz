import { db } from "@/db";
import { eq } from "drizzle-orm";
import { usersTable } from "@/db/schema";

export default class UserRepository {
  async findByEmail(email) {
    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1)
      .execute();

    return users[0] || null;
  }

  async create({ name, email, password }) {
    return db.insert(usersTable).values({ name, email, password }).returning({ id: usersTable.id });
  }
}