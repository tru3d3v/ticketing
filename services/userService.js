const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function register(fullname, email, password) {

  const rows = await db.query(
    `CALL entryUser(?,?,?,2,@out_value);CALL sp_ReadReturnValue();`, [fullname, email, password]
  );
  return helper.emptyOrRows(rows);
}

async function login(email, password) {

  const rows = await db.query(
    `CALL loginLog(?,?,@out_value); CALL sp_ReadReturnValue();`, [email, password]
  );

  return helper.emptyOrRows(rows);
}

async function logout(token) {

  const rows = await db.query(
    `CALL logout(?);`, [token]
  );

  return helper.emptyOrRows(rows);
}

async function checkToken(token) {

  const rows = await db.query(
    `CALL checkToken(?,@out_value);CALL sp_ReadReturnValue();`, [token]
  );

  return helper.emptyOrRows(rows);
}

async function viewProfile(token) {

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
          return db.query('SELECT iduser,email,activation,reg_date FROM user WHERE iduser=?', [iduser])
            .then(user => {
              const currentUser = user[0];

              response.data = currentUser;
              return response;
            });
        });

    });

}

async function updateUserData(iduser, iduserLogin, jsonResponse, fullname, old_email, new_email, current_pwd, new_pwd) {
  var queryUpdate = 'UPDATE user SET ';
  var arrUpdateParams = [];
  if (fullname.length > 0 && new_email.length == 0 && new_pwd.length == 0) {
    queryUpdate += ' fullname=? ';
    arrUpdateParams = [fullname, iduser];
  } else if (fullname.length > 0 && new_email.length > 0 && new_pwd.length == 0) {
    queryUpdate += ' fullname=? , email=?';
    arrUpdateParams = [fullname, new_email, iduser];
  }
  else if (fullname.length > 0 && new_email.length > 0 && new_pwd.length > 0) {
    queryUpdate += ' fullname=? , email=?, pwd=MD5(?)';
    arrUpdateParams = [fullname, new_email, new_pwd, iduser];
  }
  else if (fullname.length == 0 && new_email.length > 0 && new_pwd.length > 0) {
    queryUpdate += ' email=?, pwd=MD5(?)';
    arrUpdateParams = [new_email, new_pwd, iduser];
  }
  else if (fullname.length == 0 && new_email.length == 0 && new_pwd.length > 0) {
    queryUpdate += ' pwd=MD5(?)';
    arrUpdateParams = [new_pwd, iduser];
  }
  else if (fullname.length == 0 && new_email.length > 0 && new_pwd.length == 0) {
    queryUpdate += ' email=?';
    arrUpdateParams = [new_email, iduser];
  }
  else if (fullname.length > 0 && new_email.length == 0 && new_pwd.length > 0) {
    queryUpdate += ' fullname=? , pwd=MD5(?)';
    arrUpdateParams = [fullname, new_pwd, iduser];
  }
  if (iduserLogin.length > 0) {
    queryUpdate += " modifyBy=?";
    arrUpdateParams.push(iduserLogin);
  }
  queryUpdate += ", modified_date=CURRENT_TIMESTAMP";

  queryUpdate += ' WHERE iduser=?'

  if(arrUpdateParams.length>0){
  return db.query(queryUpdate, arrUpdateParams)
    .then(user => {

      jsonResponse.data = user;
      return jsonResponse;
    });
  }else{
    return { "message": "please change your data", "data": {} };
  }
}

async function updateProfileUserByUser(token, fullname, old_email, new_email, current_pwd, new_pwd) {
  var jsonResponse = { "message": "", "data": {} };
  return db.query(
    `CALL checkToken(?,@out_value);CALL sp_ReadReturnValue();`, [token]
  ).then((result) => {

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


      return db.query('SELECT l.iduser,u.email FROM login_log l JOIN user u ON l.iduser=u.iduser WHERE l.token=?', [token])
        .then(resultLoginLog => {
          const currentLog = resultLoginLog[0] != null ? resultLoginLog[0] : {};
          return currentLog;
        }).then(data => {

          const old_email_rec = data.email;
          const iduser = data.iduser;
          // Check new-email is exist or not
          if ( (old_email_rec == old_email && new_email != old_email && new_email.length > 0) &&  new_pwd.length==0) {
            return db.query('SELECT email FROM user where user.iduser<>? AND user.email=?', [iduser, new_email])
              .then(emailResponse => {
                var recEmail = emailResponse[0] != null ? emailResponse[0].email : '';
                if (recEmail.length > 0) {
                  response.message = 'email sudah ada yang menggunakan!, gunakan email lainnya!';
                } else {
                  console.log('response.message=email bisa diubah pada kondisi ini');
                  return updateUserData(iduser, 0, jsonResponse, fullname, old_email, new_email, '', '');
                }
                return response;
              });
          }else if ( new_pwd.length>0) {
            return db.query('SELECT * FROM user where user.iduser=? AND user.pwd=MD5(?)', [iduser, current_pwd])
            .then(dataPwd=>{
              const currenDataPwd = dataPwd[0]!=null ? dataPwd : {"pwd":""};
              if(currenDataPwd.pwd!=''){
                return updateUserData(iduser, 0, jsonResponse, fullname, old_email, new_email, currenDataPwd, new_pwd);
              }else{
                jsonResponse.message='current password invalid';
              }
             // jsonResponse.data=helper.emptyOrRows(dataPwd);;
              return jsonResponse;
            });

          } else {
            console.log('response.message=tidak ada perubahan email');
            return updateUserData(iduser, 0, jsonResponse, fullname, '', '', '', '');
          }

          


        });

    });

}

module.exports = {
  register,
  login,
  logout,
  checkToken,
  viewProfile,
  updateProfileUserByUser
}