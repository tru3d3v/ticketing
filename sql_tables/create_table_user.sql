 CREATE TABLE user (
iduser INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
fullname VARCHAR(30) NOT NULL,
email VARCHAR(50),
pwd VARCHAR(255),
reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)