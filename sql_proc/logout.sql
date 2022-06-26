CREATE PROCEDURE logout(IN tokenLogin varchar(255))
BEGIN
	
	SET @tm = CURRENT_TIMESTAMP(); 
	UPDATE login_log SET logoutAt = @tm where token=tokenLogin; 
	
END