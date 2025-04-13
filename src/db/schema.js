import { boolean } from "drizzle-orm/gel-core";
import {
  date,
  foreignKey,
  integer,
  jsonb,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  createdDate: timestamp().notNull().defaultNow(),
  updatedDate: timestamp(),
  deletedDate: timestamp(),
});

export const QuizzesTable = pgTable(
  "quizzes",
  {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 255 }).notNull(),
    quiz: jsonb().notNull(),
    userId: uuid().notNull(),
    createdDate: timestamp().notNull().defaultNow(),
    updatedDate: timestamp(),
    deletedDate: timestamp(),
  },
  (table) => [
    foreignKey({
      name: "user_fk",
      columns: [table.userId],
      foreignColumns: [usersTable.id],
    }).onDelete("cascade"),
  ]
);

export const EvaluationsTable = pgTable(
  "evaluations",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    email: varchar({ length: 255 }).notNull(),
    answers: jsonb().notNull(),
    quizId: uuid().notNull(),
    createdDate: timestamp().notNull().defaultNow(),
  },
  (table) => [
    foreignKey({
      name: "quiz_fk",
      columns: [table.quizId],
      foreignColumns: [QuizzesTable.id],
    }).onDelete("cascade"),
  ]
);

export const SharedQuizzesTable = pgTable(
  "sharedquizzes",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: uuid().notNull(),
    quizId: uuid().notNull(),
    edit: boolean().notNull(),
    createdDate: timestamp().notNull().defaultNow(),
  },
  (table) => [
    foreignKey({
      name: "user_fk",
      columns: [table.userId],
      foreignColumns: [usersTable.id],
    }).onDelete("cascade"),
    foreignKey({
      name: "quiz_fk",
      columns: [table.quizId],
      foreignColumns: [QuizzesTable.id],
    }).onDelete("cascade"),
  ]
);
