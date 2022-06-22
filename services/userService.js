const db = require('./db');
const helper = require('../helper');
const config = require('../config');

const queryUser = `SELECT u.iduser,r.role_name,r.idrole,u.fullname ,u.email ,u.reg_date  FROM user u
join user_role ur 
on
u.iduser  = ur.iduser 
join role r 
on
ur.idrole  = r.idrole`;

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

async function login(email,password){
 
  const rows = await db.query(
    queryUser+` WHERE u.email=? AND u.pwd=MD5(?)`,[email,password]
  );

  db.query("INSERT INTO login_log(loginAt,iduser,token)VALUES(CURRENT_TIMESTAMP,?,?)",[],function(err, results) {
    if (err) throw err;
  
    // `results` is an array with one element for every statement in the query:
    console.log(results[0]); // [{1: 1}]
    console.log(results[1]); // [{2: 2}]
  });

  return helper.emptyOrRows(rows);
}

module.exports = {
    getUsers,
    entryUser,
    login
}