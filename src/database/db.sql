SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
CREATE DATABASE IF NOT EXISTS `equipo7_store` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `equipo7_store`;

CREATE TABLE `invoices` (
  `id` int(10) UNSIGNED NOT NULL,
  `total` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `invoice_details` (
  `id` int(10) UNSIGNED NOT NULL,
  `sale_id` int(10) UNSIGNED DEFAULT NULL,
  `price` decimal(10,0) UNSIGNED DEFAULT NULL,
  `invoice_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `plataforms` (
  `id` tinyint(3) UNSIGNED NOT NULL,
  `name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `title` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `icon` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(120) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(120) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `price` decimal(10,0) NOT NULL,
  `discount` decimal(10,0) NOT NULL,
  `primary_image_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `product_comments` (
  `id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `comment` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `product_images` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `path` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `product_plataform` (
  `id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `plataform_type_id` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `product_requirement` (
  `id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `requirement_id` tinyint(3) UNSIGNED NOT NULL,
  `value` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `product_score` (
  `id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `score_type_id` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `product_version` (
  `id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `version_id` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `requirement_types` (
  `id` tinyint(3) UNSIGNED NOT NULL,
  `name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `title` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `sales` (
  `id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED DEFAULT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `score_types` (
  `id` tinyint(3) UNSIGNED NOT NULL,
  `name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(45) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(120) COLLATE utf8_unicode_ci NOT NULL,
  `user_type_id` tinyint(3) UNSIGNED DEFAULT NULL,
  `profile_image_path` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `user_types` (
  `id` tinyint(3) UNSIGNED NOT NULL,
  `name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `version_types` (
  `id` tinyint(3) UNSIGNED NOT NULL,
  `name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `title` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `invoice_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_invoice_details_1_idx` (`sale_id`),
  ADD KEY `fk_invoice_details_2_idx` (`invoice_id`);

ALTER TABLE `plataforms`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

ALTER TABLE `product_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_product_comments_1_idx` (`product_id`),
  ADD KEY `fk_product_comments_2_idx` (`user_id`);

ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_product_images_1_idx` (`product_id`);

ALTER TABLE `product_plataform`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_product_plataform_1_idx` (`product_id`),
  ADD KEY `fk_product_plataform_2_idx` (`plataform_type_id`),
  ADD KEY `UQ_product_plataform_1` (`product_id`,`plataform_type_id`);

ALTER TABLE `product_requirement`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UQ_product_requirement_1` (`product_id`,`requirement_id`),
  ADD KEY `fk_product_requirement_2_idx` (`requirement_id`),
  ADD KEY `fk_product_requirement_1_idx` (`product_id`);

ALTER TABLE `product_score`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UQ_product_score_1` (`product_id`,`score_type_id`),
  ADD KEY `fk_product_score_1_idx` (`product_id`),
  ADD KEY `fk_product_score_2_idx` (`score_type_id`);

ALTER TABLE `product_version`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UQ_product_version_1` (`product_id`,`version_id`),
  ADD KEY `fk_product_version_1_idx` (`product_id`),
  ADD KEY `fk_product_version_2_idx` (`version_id`);

ALTER TABLE `requirement_types`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_sales_1_idx` (`user_id`),
  ADD KEY `fk_sales_2_idx` (`product_id`);

ALTER TABLE `score_types`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD KEY `fk_users_1_idx` (`user_type_id`);

ALTER TABLE `user_types`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `version_types`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `invoices`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `invoice_details`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `plataforms`
  MODIFY `id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `product_comments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `product_images`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `product_plataform`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `product_requirement`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `product_score`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `product_version`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `requirement_types`
  MODIFY `id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `sales`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `score_types`
  MODIFY `id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `user_types`
  MODIFY `id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `version_types`
  MODIFY `id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT;


ALTER TABLE `invoice_details`
  ADD CONSTRAINT `fk_invoice_details_1` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_invoice_details_2` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON UPDATE CASCADE;

ALTER TABLE `product_comments`
  ADD CONSTRAINT `fk_product_comments_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_product_comments_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

ALTER TABLE `product_images`
  ADD CONSTRAINT `fk_product_images_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE;

ALTER TABLE `product_plataform`
  ADD CONSTRAINT `fk_product_plataform_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_product_plataform_2` FOREIGN KEY (`plataform_type_id`) REFERENCES `plataforms` (`id`) ON UPDATE CASCADE;

ALTER TABLE `product_requirement`
  ADD CONSTRAINT `fk_product_requirement_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_product_requirement_2` FOREIGN KEY (`requirement_id`) REFERENCES `requirement_types` (`id`) ON UPDATE CASCADE;

ALTER TABLE `product_score`
  ADD CONSTRAINT `fk_product_score_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_product_score_2` FOREIGN KEY (`score_type_id`) REFERENCES `score_types` (`id`) ON UPDATE CASCADE;

ALTER TABLE `product_version`
  ADD CONSTRAINT `fk_product_version_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_product_version_2` FOREIGN KEY (`version_id`) REFERENCES `version_types` (`id`) ON UPDATE CASCADE;

ALTER TABLE `sales`
  ADD CONSTRAINT `fk_sales_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_sales_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE;

ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_1` FOREIGN KEY (`user_type_id`) REFERENCES `user_types` (`id`) ON UPDATE CASCADE;
COMMIT;
