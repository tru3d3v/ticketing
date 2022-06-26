CREATE PROCEDURE loginLog(email varchar(200), pwd varchar(255),OUT out_value varchar(255))
BEGIN

	
	
SET @isExist =	(SELECT u.iduser  FROM user u
join user_role ur 
on
u.iduser  = ur.iduser 
join role r 
on
ur.idrole  = r.idrole WHERE u.email = email  AND u.pwd = MD5(pwd)
AND u.activation =1
);
SET @token = UUID(); 
IF(@isExist > 0)
THEN


INSERT INTO  login_log (loginAt,iduser,token)VALUES(current_timestamp,@isExist,@token);

	SET out_value :=@token;
ELSE
	SET out_value :='login fail';

END IF;
	
END