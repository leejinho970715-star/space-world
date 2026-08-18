CREATE TABLE `explorer_profiles` (
	`user_id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`display_name` text NOT NULL,
	`current_stage` text DEFAULT 'earth' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `exploration_progress` (
	`user_id` text NOT NULL,
	`stage_slug` text NOT NULL,
	`completed_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	PRIMARY KEY(`user_id`, `stage_slug`)
);
--> statement-breakpoint
CREATE INDEX `idx_exploration_progress_user_id` ON `exploration_progress` (`user_id`);
