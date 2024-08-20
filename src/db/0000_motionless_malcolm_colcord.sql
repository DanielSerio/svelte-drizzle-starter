CREATE TABLE `account_confirmations` (
	`user_id` bigint NOT NULL,
	`expires_at` timestamp NOT NULL,
	`confirm_slug` char(32) NOT NULL,
	`is_confirmed` boolean DEFAULT false,
	CONSTRAINT `account_confirmations_confirm_slug` PRIMARY KEY(`confirm_slug`),
	CONSTRAINT `account_confirmations_user_id_unique` UNIQUE(`user_id`)
);
--> statement-breakpoint
CREATE TABLE `password_reset-requests` (
	`user_id` bigint NOT NULL,
	`reset_slug` char(32) NOT NULL,
	`expires_at` timestamp NOT NULL,
	CONSTRAINT `password_reset-requests_reset_slug` PRIMARY KEY(`reset_slug`),
	CONSTRAINT `password_reset-requests_user_id_unique` UNIQUE(`user_id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`user_id` serial AUTO_INCREMENT NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`email` varchar(64) NOT NULL,
	`account_pass` text NOT NULL,
	CONSTRAINT `users_user_id` PRIMARY KEY(`user_id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
