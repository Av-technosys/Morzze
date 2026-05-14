CREATE TABLE "videos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"link" text NOT NULL,
	"title" varchar(255) NOT NULL,
	"thumbnail" text,
	"video_description" text,
	"video_category" varchar(100),
	"is_visible" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "product_filter" ALTER COLUMN "product_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "product_filter" ALTER COLUMN "filter" SET NOT NULL;