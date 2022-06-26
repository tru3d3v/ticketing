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

async function getUsers(page = 1,token) {


  return db.query(
    `CALL checkToken(?,@out_value);CALL sp_ReadReturnValue();`, [token]
  ).then((result) => {
    var jsonResponse = { "message": "", "data": {} };
    const responseToken = result[1][0].ret_value;
    if (responseToken == token) {
      jsonResponse.data = {};
      jsonResponse.message = '';
    } else {
      jsonResponse.message = responseToken;
    }
    return jsonResponse;

  }).catch((err) => {
    !error.logged && console.error(err);
    res.status(500).send();
  })
    .then(response => {

      return db.query('SELECT ll.iduser,m.role_name,r.idrole FROM login_log ll JOIN user_role r ON r.iduser=ll.iduser JOIN role m ON r.idrole=m.idrole WHERE ll.token=?', [token])
        .then(resultLoginLog => {
          const roleUser = resultLoginLog[0] != null ? resultLoginLog[0] : 0;
          return roleUser;
        }).then(roleUser => {

          if (roleUser.role_name == 'administrator') {
            const offset = helper.getOffset(page, config.listPerPage);
            return db.query(
              queryUser + ` LIMIT ${offset},${config.listPerPage}`
            ).then(rows => {
              const data = helper.emptyOrRows(rows);
              const meta = { page };
              return {
                message:'',
                data,
                meta
              }
            });


          } else {
            return {
              message: 'you dont have authorize',
              data:[]
            }
          }


        });

    });


}

async function resetPassword(token, new_pwd) {

  return db.query(
    `CALL checkToken(?,@out_value);CALL sp_ReadReturnValue();`, [token]
  ).then((result) => {
    var jsonResponse = { "message": "", "data": {} };
    const responseToken = result[1][0].ret_value;
    if (responseToken == token) {
      jsonResponse.data = {};
      jsonResponse.message = '';
    } else {
      jsonResponse.message = responseToken;
    }
    return jsonResponse;

  }).catch((err) => {
    !error.logged && console.error(err);
    res.status(500).send();
  })
    .then(response => {

      return db.query('SELECT iduser FROM login_log WHERE token=?', [token])
        .then(resultLoginLog => {
          const iduser = resultLoginLog[0] != null ? resultLoginLog[0].iduser : 0;
          return iduser;
        }).then(iduser => {
          return db.query('UPDATE user SET pwd=MD5(?) WHERE iduser=?', [new_pwd, iduser])
            .then(user => {

              response.data = user;
              return response;
            });
        });

    });

}


module.exports = {
  getUsers,
  resetPassword
}