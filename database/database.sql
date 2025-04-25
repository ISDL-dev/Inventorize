-- データベース作成
CREATE DATABASE IF NOT EXISTS inventory_management;
USE inventory_management;

-- テーブル削除（逆順）
DROP TABLE IF EXISTS search_log;
DROP TABLE IF EXISTS item_transaction;
DROP TABLE IF EXISTS item;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS user;

-- ユーザーテーブル
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    admission_year INT,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- カテゴリテーブル
CREATE TABLE category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- アイテムテーブル
CREATE TABLE item (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_id INT,
    is_available BOOLEAN DEFAULT TRUE,
    location VARCHAR(255),
    registration_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    image_path VARCHAR(255),
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE SET NULL
);

-- アイテムトランザクションテーブル
CREATE TABLE item_transaction (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT NOT NULL,
    user_id INT NOT NULL,
    type ENUM('borrow', 'return') NOT NULL,
    related_transaction_id INT,
    transaction_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    reason VARCHAR(255),
    item_condition VARCHAR(255),
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (item_id) REFERENCES item(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (related_transaction_id) REFERENCES item_transaction(id) ON DELETE SET NULL
);

-- 検索ログテーブル
CREATE TABLE search_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    search_keyword VARCHAR(255) NOT NULL,
    searched_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE SET NULL
);

-- インデックス作成
CREATE INDEX idx_item_category ON item(category_id);
CREATE INDEX idx_transaction_item ON item_transaction(item_id);
CREATE INDEX idx_transaction_user ON item_transaction(user_id);
CREATE INDEX idx_transaction_related ON item_transaction(related_transaction_id);
CREATE INDEX idx_search_user ON search_log(user_id);