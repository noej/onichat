CREATE DATABASE IF NOT EXISTS chat;

USE chat;

CREATE TABLE IF NOT EXISTS users (
    `id` INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR( 150 ) NOT NULL,
    `username` VARCHAR( 150 ) NOT NULL,
    `password` VARCHAR( 100 ) NOT NULL,
    `first_name` VARCHAR( 255 ) NULL,
    `last_name` VARCHAR( 255 ) NULL, 
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
) ENGINE = MYISAM;

INSERT INTO users(email, username, password, created_at) VALUES('mariam@gmail.com', 'maria', 'PaSSw0rd');
INSERT INTO users(email, username, password, created_at) VALUES('juand@gmail.com', 'juan', 'PaSSw0rd');

CREATE TABLE IF NOT EXISTS messages (
    `id` BIGINT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT unsigned NOT NULL,
    `dest_user_id` INT unsigned NOT NULL,
    `text` TEXT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
) ENGINE = MYISAM;
