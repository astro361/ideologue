import { pgTable, text, timestamp, integer, primaryKey, jsonb } from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

// =========================================================================
// 1. NEXTAUTH CORE TABLES (Fixed database mappings to snake_case)
// =========================================================================

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }), // Fixed mapping
  image: text("image"),
});

export const accounts = pgTable(
  "accounts",
  {
    userId: text("user_id") // Fixed mapping
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(), // Fixed mapping
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("sessions", {
  sessionToken: text("session_token").primaryKey(), // Fixed mapping
  userId: text("user_id") // Fixed mapping
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

// =========================================================================
// 2. IDEOLOGUE CORE APPLICATION TABLES (Fixed database mappings to snake_case)
// =========================================================================

export const ideas = pgTable("ideas", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  teaser: text("teaser"),               
  fullStrategy: text("full_strategy"), // Fixed mapping   
  tags: text("tags").array(),           
  teamRoles: jsonb("team_roles"), // Fixed mapping        
  upvoteCount: integer("upvote_count").default(0).notNull(), // Fixed mapping
  userId: text("user_id") // Fixed mapping ✅ Resolves column ideas.userId does not exist
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(), // Fixed mapping
});

export const comments = pgTable("comments", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  content: text("content").notNull(),
  ideaId: text("idea_id") // Fixed mapping
    .notNull()
    .references(() => ideas.id, { onDelete: "cascade" }),
  userId: text("user_id") // Fixed mapping
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(), // Fixed mapping
});

export const upvotes = pgTable(
  "upvotes",
  {
    userId: text("user_id") // Fixed mapping
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    ideaId: text("idea_id") // Fixed mapping
      .notNull()
      .references(() => ideas.id, { onDelete: "cascade" }),
  },
  (upvote) => ({
    compoundKey: primaryKey({ columns: [upvote.userId, upvote.ideaId] }),
  })
);
