CREATE DATABASE foodie_fly_order_now;

USE foodie_fly_order_now;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE restaurants (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    image VARCHAR(255) NOT NULL,
    cuisine VARCHAR(50) NOT NULL,
    rating DECIMAL(2, 1) NOT NULL,
    delivery_time VARCHAR(50) NOT NULL,
    delivery_fee DECIMAL(5, 2) NOT NULL,
    address VARCHAR(255) NOT NULL
);

CREATE TABLE menu_items (
    id VARCHAR(50) PRIMARY KEY,
    restaurant_id VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    popular BOOLEAN NOT NULL,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);