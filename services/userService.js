const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getUsers(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT iduser, fullname, email
    FROM user LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function entryUser(fullname,email,password){
 
  const rows = await db.query(
    `CALL entryUser(?,?,?,2,@out_value);CALL sp_ReadReturnValue();`,[fullname,email,password]
  );
  return helper.emptyOrRows(rows);
}

module.exports = {
    getUsers,
    entryUser
}