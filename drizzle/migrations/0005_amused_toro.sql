CREATE TABLE "career_enquiries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"subject" text NOT NULL,
	"description" text NOT NULL,
	"mobile_number" text NOT NULL,
	"resume_url" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
