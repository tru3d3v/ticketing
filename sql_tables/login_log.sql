CREATE TABLE login_log(
    id bigint(8) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    loginAt TIMESTAMP,
    logoutAt TIMESTAMP,
     iduser int(6) UNSIGNED,
     FOREIGN KEY (iduser) REFERENCES user(iduser),
     token varchar(255) NOT NULL
)ENGINE=InnoDB;