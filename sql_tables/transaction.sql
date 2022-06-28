-- ticketing.`transaction` definition

CREATE TABLE `transaction` (
  `transid` int NOT NULL AUTO_INCREMENT,
  `iduser` int unsigned NOT NULL,
  `studio_id` int NOT NULL,
  `jumlah_tiket` int NOT NULL,
  `sheet` varchar(100) NOT NULL,
  `amount` int NOT NULL,
  `amount_with_tax` int NOT NULL,
  `upload_pay_confirm_file_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'file bukti transfer',
  `orderAt` timestamp NOT NULL COMMENT 'jam dan tanggal order kapan',
  `upload_pay_confirmAt` timestamp NULL DEFAULT NULL COMMENT 'waktu user melakukan pembayaran dan upload transfer',
  `recievedPaymentBy` int DEFAULT NULL COMMENT 'admin yang melakukan konfirmasi bahwa pembayaran telah diterima dan masuk',
  `recievedPaymentAt` timestamp NULL DEFAULT NULL COMMENT 'di set oleh Admin, bahwa pembayaran telah diterima, dan masuk ke rekening',
  PRIMARY KEY (`transid`),
  KEY `transaction_FK_1` (`studio_id`),
  KEY `transaction_FK` (`iduser`),
  CONSTRAINT `transaction_FK` FOREIGN KEY (`iduser`) REFERENCES `user` (`iduser`),
  CONSTRAINT `transaction_FK_1` FOREIGN KEY (`studio_id`) REFERENCES `studio` (`studio_id`)
) ENGINE=InnoDB;