CREATE PROCEDURE checkToken(token varchar(255), OUT out_value varchar(255) )
BEGIN
	
	SET @maxDurationHour = 1;

	SET @loginAt =( SELECT ll.loginAt  FROM login_log ll where ll.token = token and ll.logoutAt is null) ;

	IF(@loginAt IS NOT NULL && @loginAt!='')
	THEN
			SET @duration = (SELECT TIMESTAMPDIFF(HOUR,CURRENT_TIMESTAMP(),@loginAt));
		IF(@duration > @maxDurationHour)
		THEN
			SET out_value='login expired';
		ELSE
			SET out_value=token;
		END IF;
	
	ELSE
		SET out_value='invalid token';
	END IF;
	
END