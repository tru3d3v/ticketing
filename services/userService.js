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
    let reg_date  = Date.now();
    const query = `INSERT INTO user(fullname, email, pwd, role) VALUES (${name}, ${email}, ${pass}, ${reg_date})`;
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

async function loginUser(req){
  try{
    let email = req.body.email;
    let pass  = req.body.pass; //crypt later
    const query = `SELECT email, pwd FROM user WHERE email = ${email}`;
    if (email && pass){
      const result = await db.query(query);
      if (pass !== result.pwd){
        return false; // Pass Invalid
      }
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
    createUser,
    loginUser
}