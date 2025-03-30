CREATE TABLE "evaluations" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "evaluations_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(255) NOT NULL,
	"answers" jsonb NOT NULL,
	"quizId" uuid NOT NULL,
	"createdDate" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quizzes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"quiz" jsonb NOT NULL,
	"userId" uuid NOT NULL,
	"createdDate" date DEFAULT now() NOT NULL,
	"updatedDate" date,
	"deletedDate" date
);
--> statement-breakpoint
CREATE TABLE "sharedquizzes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "sharedquizzes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" uuid NOT NULL,
	"quizId" uuid NOT NULL,
	"edit" boolean NOT NULL,
	"createdDate" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"createdDate" date DEFAULT now() NOT NULL,
	"updatedDate" date,
	"deletedDate" date,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "evaluations" ADD CONSTRAINT "quiz_fk" FOREIGN KEY ("quizId") REFERENCES "public"."quizzes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quizzes" ADD CONSTRAINT "user_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sharedquizzes" ADD CONSTRAINT "user_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sharedquizzes" ADD CONSTRAINT "quiz_fk" FOREIGN KEY ("quizId") REFERENCES "public"."quizzes"("id") ON DELETE cascade ON UPDATE no action;