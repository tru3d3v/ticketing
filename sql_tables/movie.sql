-- ticketing.movie definition

CREATE TABLE `movie` (
  `idmovie` int NOT NULL AUTO_INCREMENT,
  `judul` varchar(255) NOT NULL,
  `deskripsi` text NOT NULL,
  `image_thumbnail` varchar(100) DEFAULT NULL,
  `image_large` varchar(100) DEFAULT NULL,
  `start_date` bigint NOT NULL,
  `end_date` bigint NOT NULL,
  `createBy` int NOT NULL,
  `modifyBy` int DEFAULT NULL,
  PRIMARY KEY (`idmovie`)
) ENGINE=InnoDB;