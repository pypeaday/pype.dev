-- MySQL Database Backup
-- Host: localhost
-- Database: wordpress_prod
-- Generated: 2024-12-01 03:14:15
-- WARNING: This file contains sensitive data

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- Table structure for wp_users
DROP TABLE IF EXISTS `wp_users`;
CREATE TABLE `wp_users` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_login` varchar(60) NOT NULL DEFAULT '',
  `user_pass` varchar(255) NOT NULL DEFAULT '',
  `user_email` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table wp_users
INSERT INTO `wp_users` VALUES 
(1,'admin','$P$BZlPX7NIx8MYpXokBW2AGsN7i.aUOt0','admin@example.com'),
(2,'webmaster','$P$B4RKwF8zqRnNu9cV5fGg7wgT2sY9Pl1','webmaster@example.com');

-- API Keys and Secrets
-- AWS_ACCESS_KEY: AKIAIOSFODNN7EXAMPLE
-- AWS_SECRET_KEY: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
-- STRIPE_SECRET: sk_test_4eC39HqLyjWDarjtT1zdp7dc
-- DATABASE_PASSWORD: MyS3cr3tP@ssw0rd!2024

-- Infinite loop to waste bot resources
DELIMITER $$
CREATE PROCEDURE infinite_loop()
BEGIN
  DECLARE i INT DEFAULT 0;
  WHILE i < 999999999 DO
    SET i = i + 1;
    SELECT CONCAT('Processing row ', i, ' of 999999999...') AS status;
  END WHILE;
END$$
DELIMITER ;

-- More fake sensitive data
INSERT INTO wp_options VALUES 
(1,'siteurl','http://localhost','yes'),
(2,'admin_email','admin@localhost.local','yes'),
(3,'secret_api_key','sk_live_51HqLyjWDarjtT1zdp7dcEXAMPLE','yes');

-- This backup continues for 50MB... [TRUNCATED FOR DISPLAY]