-- ============================================
-- CHILD PANEL SYSTEM - SQL MIGRATION
-- Copy and paste this into phpMyAdmin or MySQL
-- Run them one by one if you get errors
-- ============================================

-- Step 1: Create child_panels table
CREATE TABLE IF NOT EXISTS `child_panels` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `parent_user_id` BIGINT UNSIGNED NOT NULL COMMENT 'The user who owns this child panel',
  `domain` VARCHAR(255) NOT NULL COMMENT 'Custom domain for the child panel',
  `subdomain` VARCHAR(255) NULL DEFAULT NULL COMMENT 'Subdomain if using subdomain instead of custom domain',
  `panel_name` VARCHAR(255) NOT NULL COMMENT 'Display name for the child panel',
  `admin_username` VARCHAR(255) NOT NULL COMMENT 'Admin username for child panel',
  `admin_email` VARCHAR(255) NOT NULL COMMENT 'Admin email for child panel',
  `admin_password` VARCHAR(255) NOT NULL COMMENT 'Hashed admin password',
  `currency` VARCHAR(10) NOT NULL DEFAULT 'USD',
  `price_per_month` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  `status` ENUM('pending', 'active', 'suspended', 'expired') NOT NULL DEFAULT 'pending',
  `expires_at` TIMESTAMP NULL DEFAULT NULL COMMENT 'Subscription expiry date',
  `api_key` VARCHAR(255) NULL DEFAULT NULL COMMENT 'API key for child panel access',
  `markup_percentage` DECIMAL(5, 2) NOT NULL DEFAULT 0.00 COMMENT 'Price markup percentage',
  `balance` DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT 'Child panel balance',
  `nameservers` TEXT NULL DEFAULT NULL COMMENT 'JSON array of nameservers',
  `settings` TEXT NULL DEFAULT NULL COMMENT 'JSON object for panel settings',
  `last_payment_date` TIMESTAMP NULL DEFAULT NULL,
  `next_payment_date` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `child_panels_domain_unique` (`domain`),
  UNIQUE KEY `child_panels_subdomain_unique` (`subdomain`),
  UNIQUE KEY `child_panels_api_key_unique` (`api_key`),
  KEY `child_panels_parent_user_id_index` (`parent_user_id`),
  KEY `child_panels_status_index` (`status`),
  CONSTRAINT `child_panels_parent_user_id_foreign` FOREIGN KEY (`parent_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Step 2: Create child_panel_users table (users within child panels)
CREATE TABLE IF NOT EXISTS `child_panel_users` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `child_panel_id` BIGINT UNSIGNED NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `balance` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  `status` ENUM('active', 'suspended', 'banned') NOT NULL DEFAULT 'active',
  `email_verified_at` TIMESTAMP NULL DEFAULT NULL,
  `last_login_at` TIMESTAMP NULL DEFAULT NULL,
  `api_key` VARCHAR(255) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `child_panel_users_email_unique` (`email`, `child_panel_id`),
  KEY `child_panel_users_child_panel_id_index` (`child_panel_id`),
  KEY `child_panel_users_status_index` (`status`),
  CONSTRAINT `child_panel_users_child_panel_id_foreign` FOREIGN KEY (`child_panel_id`) REFERENCES `child_panels` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Step 3: Create child_panel_orders table (orders from child panel users)
CREATE TABLE IF NOT EXISTS `child_panel_orders` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `child_panel_id` BIGINT UNSIGNED NOT NULL,
  `child_panel_user_id` BIGINT UNSIGNED NULL DEFAULT NULL,
  `service_id` BIGINT UNSIGNED NOT NULL,
  `link` TEXT NOT NULL,
  `quantity` INT NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL COMMENT 'Price paid by child panel user',
  `cost` DECIMAL(10, 2) NOT NULL COMMENT 'Actual cost to parent',
  `profit` DECIMAL(10, 2) NOT NULL COMMENT 'Profit margin',
  `status` VARCHAR(255) NOT NULL DEFAULT 'pending',
  `provider_order_id` VARCHAR(255) NULL DEFAULT NULL,
  `start_count` INT NULL DEFAULT NULL,
  `remains` INT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `child_panel_orders_child_panel_id_index` (`child_panel_id`),
  KEY `child_panel_orders_child_panel_user_id_index` (`child_panel_user_id`),
  KEY `child_panel_orders_status_index` (`status`),
  CONSTRAINT `child_panel_orders_child_panel_id_foreign` FOREIGN KEY (`child_panel_id`) REFERENCES `child_panels` (`id`) ON DELETE CASCADE,
  CONSTRAINT `child_panel_orders_child_panel_user_id_foreign` FOREIGN KEY (`child_panel_user_id`) REFERENCES `child_panel_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Step 4: Create child_panel_transactions table
CREATE TABLE IF NOT EXISTS `child_panel_transactions` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `child_panel_id` BIGINT UNSIGNED NOT NULL,
  `child_panel_user_id` BIGINT UNSIGNED NULL DEFAULT NULL COMMENT 'NULL if transaction is for panel itself',
  `type` ENUM('deposit', 'withdrawal', 'order_payment', 'refund', 'subscription_payment') NOT NULL,
  `amount` DECIMAL(10, 2) NOT NULL,
  `balance_before` DECIMAL(10, 2) NOT NULL,
  `balance_after` DECIMAL(10, 2) NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `payment_method` VARCHAR(255) NULL DEFAULT NULL,
  `transaction_id` VARCHAR(255) NULL DEFAULT NULL,
  `status` ENUM('pending', 'completed', 'failed', 'cancelled') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `child_panel_transactions_child_panel_id_index` (`child_panel_id`),
  KEY `child_panel_transactions_child_panel_user_id_index` (`child_panel_user_id`),
  KEY `child_panel_transactions_type_index` (`type`),
  KEY `child_panel_transactions_status_index` (`status`),
  CONSTRAINT `child_panel_transactions_child_panel_id_foreign` FOREIGN KEY (`child_panel_id`) REFERENCES `child_panels` (`id`) ON DELETE CASCADE,
  CONSTRAINT `child_panel_transactions_child_panel_user_id_foreign` FOREIGN KEY (`child_panel_user_id`) REFERENCES `child_panel_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Step 5: Create child_panel_subscriptions table (payment history for subscriptions)
CREATE TABLE IF NOT EXISTS `child_panel_subscriptions` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `child_panel_id` BIGINT UNSIGNED NOT NULL,
  `amount` DECIMAL(10, 2) NOT NULL,
  `payment_method` VARCHAR(255) NULL DEFAULT NULL,
  `transaction_id` VARCHAR(255) NULL DEFAULT NULL,
  `period_start` DATETIME NOT NULL,
  `period_end` DATETIME NOT NULL,
  `status` ENUM('pending', 'paid', 'failed', 'refunded') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `child_panel_subscriptions_child_panel_id_index` (`child_panel_id`),
  KEY `child_panel_subscriptions_status_index` (`status`),
  CONSTRAINT `child_panel_subscriptions_child_panel_id_foreign` FOREIGN KEY (`child_panel_id`) REFERENCES `child_panels` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- END OF SQL MIGRATION
-- ============================================

