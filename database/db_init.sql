CREATE DATABASE IF NOT EXISTS `sf-events-db`;

USE sf-events-db;

CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    cover VARCHAR(255),
    price DECIMAL(10,2) NOT NULL
);
