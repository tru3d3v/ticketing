DROP TRIGGER IF EXISTS ticketing.trigerAfterEntryUser;

DELIMITER $$
$$
CREATE DEFINER=`root`@`%` TRIGGER `trigerAfterEntryUser` AFTER INSERT ON `user` FOR EACH ROW BEGIN
    IF NEW.activation=0 THEN
        INSERT INTO email_log (iduser,email_body , sent,created_date)
        VALUES(new.iduser,CONCAT('Hi ', NEW.fullname, ', please click this link activation http://localhost:3000/user/activation/',new.iduser),0,CURRENT_TIMESTAMP);
    END IF;
END$$
DELIMITER ;
