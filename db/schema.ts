import { sql } from "drizzle-orm";
import { index, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const explorerProfiles = sqliteTable("explorer_profiles", {
  userId: text("user_id").primaryKey(),
  email: text("email").notNull(),
  displayName: text("display_name").notNull(),
  currentStage: text("current_stage").notNull().default("earth"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const explorationProgress = sqliteTable("exploration_progress", {
  userId: text("user_id").notNull(),
  stageSlug: text("stage_slug").notNull(),
  completedAt: text("completed_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, table => [
  primaryKey({ columns: [table.userId, table.stageSlug] }),
  index("idx_exploration_progress_user_id").on(table.userId),
]);
