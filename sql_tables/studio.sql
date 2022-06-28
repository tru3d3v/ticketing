-- ticketing.studio definition

CREATE TABLE `studio` (
  `studio_id` int NOT NULL AUTO_INCREMENT,
  `idmovie` int NOT NULL,
  `studio_label` varchar(100) NOT NULL,
  `jumlah_sheet` int DEFAULT NULL,
  `price` int NOT NULL,
  `start_date` bigint NOT NULL,
  `end_date` bigint NOT NULL,
  `createdBy` int NOT NULL,
  `modifyBy` int DEFAULT NULL,
  `comming_soon` int DEFAULT '0',
  PRIMARY KEY (`studio_id`),
  KEY `studio_FK` (`idmovie`),
  CONSTRAINT `studio_FK` FOREIGN KEY (`idmovie`) REFERENCES `movie` (`idmovie`)
) ENGINE=InnoDB;