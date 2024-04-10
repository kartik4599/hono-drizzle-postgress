import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  real,
  unique,
  uniqueIndex,
  uuid,
  varchar,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";

export const Role = pgEnum("Role", ["ADMIN", "Basic"]);

export const User = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    age: integer("age").notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    role: Role("role").default("ADMIN").notNull(),
  },
  (user) => ({
    emailIndex: uniqueIndex("emailIndex").on(user.email),
    uniqueAgeandName: unique("uniqueAgeandName").on(user.age, user.name),
  })
);

export const UserPreference = pgTable("userPreference", {
  id: uuid("id").primaryKey().defaultRandom(),
  emailNotification: boolean("emailNotification").default(false),
  userId: uuid("userId")
    .notNull()
    .unique()
    .references(() => User.id),
});

export const Post = pgTable("post", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title").notNull(),
  rating: real("rating"),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  authorId: uuid("authorId")
    .notNull()
    .references(() => User.id),
});

export const Category = pgTable("category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const CategoryPost = pgTable(
  "categorypost",
  {
    categoryId: uuid("categoryId")
      .notNull()
      .references(() => Category.id),
    postId: uuid("post")
      .notNull()
      .references(() => Post.id),
  },
  (relation) => ({
    id: primaryKey({
      name: "id",
      columns: [relation.categoryId, relation.postId],
    }),
  })
);
