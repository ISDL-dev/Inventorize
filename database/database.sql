CREATE DATABASE IF NOT EXISTS cm_db;
USE cm_db;

-- ユーザー情報
CREATE TABLE IF NOT EXISTS students (
    id VARCHAR(100) NOT NULL UNIQUE,
    names VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    emails VARCHAR(100) NOT NULL UNIQUE,
    passwords VARCHAR(128) NOT NULL,
    admin BOOLEAN NOT NULL,
    PRIMARY KEY (id)
) DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- カテゴリー
CREATE TABLE IF NOT EXISTS categories (
    id INT NOT NULL AUTO_INCREMENT,
    names VARCHAR(50) NOT NULL UNIQUE,
    PRIMARY KEY (id)
) DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- 物品情報
CREATE TABLE IF NOT EXISTS commodities (
    id INT NOT NULL AUTO_INCREMENT,
    names VARCHAR(100) NOT NULL,
    states VARCHAR(50) NOT NULL DEFAULT '貸出可能',
    location VARCHAR(100),
    registered_at DATE,
    note TEXT,
    url VARCHAR(255),
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    PRIMARY KEY (id)
) DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
