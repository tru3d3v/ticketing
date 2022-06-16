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

async function createUser(req){
  try{
    let name  = req.body.name;
    let email = req.body.email;
    let pass  = req.body.pass; //crypt later
    let role  = 0;
    const query = `INSERT INTO users(name, email, password, role) VALUES (${name}, ${email}, ${pass}, ${role})`;
    if (name && email && pass){
      const result = await db.query(query);
      const data = helper.emptyOrRows(result);
      return data;
    }else{
      console.log('Data Required');
    }
  }catch(error){
    console.log(error)
  }
}

module.exports = {
    getUsers,
    createUser
}