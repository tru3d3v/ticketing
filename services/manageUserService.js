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

async function resetPassword(token,iduser_selected, new_pwd) {

 
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
            
            return db.query(
               `UPDATE user SET pwd=MD5(?) WHERE iduser=?`,[new_pwd,iduser_selected]
            ).then(rows => {
              return {
                message: 'password reset sukses!',
                data:rows
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

async function updateUser(token,iduser_selected, idrole, fullname,activation) {

 
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
            
            return db.query(
               `UPDATE user SET fullname=?, activation=?, modified_date=CURRENT_TIMESTAMP(),modifyBy=? WHERE iduser=?; UPDATE user_role SET idrole=?,modified_date=CURRENT_TIMESTAMP(),modifyBy=?  WHERE iduser=?`,[fullname,activation,roleUser.iduser, iduser_selected,idrole,roleUser.iduser,iduser_selected]
            ).then(rows => {
              return {
                message: 'data sukses diupdate!',
                data:rows
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


module.exports = {
  getUsers,
  resetPassword,
  updateUser
}