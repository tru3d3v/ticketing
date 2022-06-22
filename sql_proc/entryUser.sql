

CREATE PROCEDURE entryUser( fullname varchar(100), email varchar(100),  pwd varchar(100),role int(1),OUT  message varchar(100)) 
BEGIN

	
	SET  @isExist = (SELECT count(user.iduser) from user where lower(user.email) = lower(email));
	
	IF @isExist > 0 THEN
		SET message := 'user already register';
	ELSE
		
		INSERT INTO user(fullname,email,pwd,reg_date)VALUES(fullname,email,MD5(pwd),CURRENT_TIMESTAMP);
		
		INSERT INTO user_role (idrole,iduser,created_date,modified_date) VALUES(role,LAST_INSERT_ID(),CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
	
		SET message := 'register sukses';
	
	END IF;

END;
