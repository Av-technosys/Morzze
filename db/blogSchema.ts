import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
  text, 
} from "drizzle-orm/pg-core";

export const blog = pgTable("blog", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title"),
  metaDescription: varchar("meta_description"),
  blogCategory: varchar("blog_category"),
  image: varchar("image"),
  tags: varchar("tags").array(),
  date: varchar("date"),

  // Blog Content - varchar ki jagah text use kiya taaki error na aaye
  data: text("data"), 
  userImage: varchar("user_image"),
  userName: varchar("user_name"),
  slug: varchar("slug"),
  isVisible: boolean("is_visible").default(true),
});
