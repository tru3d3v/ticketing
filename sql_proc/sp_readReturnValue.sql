CREATE PROCEDURE `sp_ReadReturnValue`()
BEGIN
    SELECT @out_value AS ret_value;
END