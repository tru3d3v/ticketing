const db = require('./db');
const helper = require('../helper');
const config = require('../config');


async function entryStudio(token, idmovie, studio_label, jumlah_sheet, price, start_date, end_date,comming_soon) {


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
                            `INSERT INTO studio(idmovie, studio_label, jumlah_sheet, price, start_date, end_date,comming_soon,createdBy) VALUES(?,?,?,?,?,?,?,?); SELECT * from studio WHERE studio_id=LAST_INSERT_ID()`, [idmovie, studio_label, jumlah_sheet, price, start_date, end_date,comming_soon, roleUser.iduser]
                        ).then(rows => {
                            return {
                                message: 'insert sukses!',
                                data: rows
                            }
                        });


                    } else {
                        return {
                            message: 'you dont have authorize',
                            data: []
                        }
                    }


                });

        });

}

async function updateStudio(token, studio_id,idmovie, studio_label, jumlah_sheet, price, start_date, end_date,comming_soon) {


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
                        
                        var updateQuery = `UPDATE studio SET modifyBy=? `;
                        var paramUpdates = [roleUser.iduser];

                        if(idmovie>0){
                            if (paramUpdates.length > 0) {
                                updateQuery += `, `;
                            }
                            updateQuery += ` idmovie=? `;
                            paramUpdates.push(idmovie);
                        }
                    
                        if (studio_label.length > 0) {
                            if (paramUpdates.length > 0) {
                                updateQuery += `, `;
                            }
                            updateQuery += ` studio_label=? `;
                            paramUpdates.push(studio_label);
                        }

                        if (jumlah_sheet > -1) {
                            if (paramUpdates.length > 0) {
                                updateQuery += `, `;
                            }
                            updateQuery += ` jumlah_sheet=? `;
                            paramUpdates.push(jumlah_sheet);
                        }

                        if (price > -1) {
                            if (paramUpdates.length > 0) {
                                updateQuery += `, `;
                            }
                            updateQuery += ` price=? `;
                            paramUpdates.push(price);
                        }

                        if (start_date > -1) {
                            if (paramUpdates.length > 0) {
                                updateQuery += `, `;
                            }
                            updateQuery += ` start_date=? `;
                            paramUpdates.push(start_date);
                        }

                        if (end_date > -1) {
                            if (paramUpdates.length > 0) {
                                updateQuery += `, `;
                            }
                            updateQuery += ` end_date=? `;
                            paramUpdates.push(end_date);
                        }

                        if (comming_soon > -1) {
                            if (paramUpdates.length > 0) {
                                updateQuery += `, `;
                            }
                            updateQuery += ` comming_soon=? `;
                            paramUpdates.push(comming_soon);
                        }


                        updateQuery+=' WHERE studio_id=?';
                        paramUpdates.push(studio_id);

                        return db.query(
                            updateQuery,paramUpdates
                        ).then(rows => {
                            return {
                                message: 'insert sukses!',
                                data: rows
                            }
                        });


                    } else {
                        return {
                            message: 'you dont have authorize',
                            data: []
                        }
                    }


                });

        });

}

async function listOfStudio(token, idmovie, studio_label,start_date, end_date,comming_soon) {


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
                        
                        var whereQuery = `WHERE `;
                        var paramUpdates = [];

                        if(idmovie>0){
                            if (paramUpdates.length > 0) {
                                whereQuery += ` AND `;
                            }
                            whereQuery += ` s.idmovie=? `;
                            paramUpdates.push(idmovie);
                        }
                    
                        if (studio_label.length > 0) {
                            if (paramUpdates.length > 0) {
                                whereQuery += ` AND `;
                            }
                            whereQuery += ` s.studio_label=? `;
                            paramUpdates.push(studio_label);
                        }

                        

                        if (start_date > -1) {
                            if (paramUpdates.length > 0) {
                                whereQuery += ` AND `;
                            }
                            whereQuery += ` s.start_date>=? `;
                            paramUpdates.push(start_date);
                        }

                        if (end_date > -1) {
                            if (paramUpdates.length > 0) {
                                whereQuery += ` AND `;
                            }
                            whereQuery += ` s.end_date <=? `;
                            paramUpdates.push(end_date);
                        }

                        if (comming_soon > -1) {
                            if (paramUpdates.length > 0) {
                                whereQuery += ` AND `;
                            }
                            whereQuery += ` s.comming_soon=? `;
                            paramUpdates.push(comming_soon);
                        }



                        return db.query(
                            `SELECT s.*,m.* FROM studio s JOIN movie m ON m.idmovie=s.idmovie ` +whereQuery,paramUpdates
                        ).then(rows => {
                            return {
                                message: '',
                                data: rows
                            }
                        });


                    } else {
                        return {
                            message: 'you dont have authorize',
                            data: []
                        }
                    }


                });

        });

}

module.exports = {
    entryStudio,
    updateStudio,
    listOfStudio
}