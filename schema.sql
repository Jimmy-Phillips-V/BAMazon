DROP DATABASE IF EXISTS bamzon_DB;

CREATE DATABASE bamzon_DB;

USE bamzon_DB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  department_name VARCHAR(45) NULL,
  stock_quantity INT(5) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, price, department_name, stock_quantity)
VALUES ("shoes", 2.50, "clothes", 20), 
("records", 4.75, "music", 20), 
("pots", 2.50, "kitchenware", 20), 
("knives", 4.50, "kitchenware", 20),
("chocolate", 4.50, "food", 20),
("helmets", 4.50, "motorcycle gear", 20),
("paintings", 4.50, "decor", 20),
("coffee", 4.50, "food", 20),
("whisky", 4.50, "alcohol", 20),
("video games", 4.50, "electronics", 20)
;

SELECT * FROM products;