ALTER TABLE "evaluations" ALTER COLUMN "createdDate" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "quizzes" ALTER COLUMN "createdDate" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "quizzes" ALTER COLUMN "updatedDate" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "quizzes" ALTER COLUMN "deletedDate" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "sharedquizzes" ALTER COLUMN "createdDate" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "createdDate" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "updatedDate" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "deletedDate" SET DATA TYPE timestamp;