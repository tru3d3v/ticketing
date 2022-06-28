-- ticketing.tiket definition

CREATE TABLE `tiket` (
  `ticket_no` int NOT NULL AUTO_INCREMENT,
  `transid` int NOT NULL,
  `sheet` varchar(100) NOT NULL,
  `status` varchar(100) DEFAULT NULL COMMENT 'BOARDING, USED',
  `created_date` timestamp NULL DEFAULT NULL,
  `modified_date` timestamp NULL DEFAULT NULL,
  `modifyBy` int DEFAULT NULL,
  PRIMARY KEY (`ticket_no`),
  KEY `tiket_FK` (`transid`),
  CONSTRAINT `tiket_FK` FOREIGN KEY (`transid`) REFERENCES `transaction` (`transid`)
) ENGINE=InnoDB;