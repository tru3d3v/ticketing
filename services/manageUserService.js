const db = require('./db');
const helper = require('../helper');
const config = require('../config');

const queryUser = `SELECT u.iduser,r.role_name,r.idrole,u.fullname ,u.email ,u.reg_date,u.activation,u.modified_date,u.modifyBy  FROM user u
join user_role ur 
on
u.iduser  = ur.iduser 
join role r 
on
ur.idrole  = r.idrole `;

async function getUsers(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    queryUser+` LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  }
}


module.exports = {
  getUsers
}