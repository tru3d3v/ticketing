const db = require('./db');
const helper = require('../helper');
const config = require('../config');


async function entryMovie(token, judul, description, image_thumbnail, image_large, start_date, end_date) {


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
                            `INSERT INTO movie(judul,deskripsi,image_thumbnail,image_large,start_date,end_date,createBy) VALUES(?,?,?,?,?,?,?); SELECT * from movie WHERE idmovie=LAST_INSERT_ID()`, [judul, description, image_thumbnail, image_large, start_date, end_date, roleUser.iduser]
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

async function updateMovie(token, idmovie, judul, description, image_thumbnail, image_large, start_date, end_date) {


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

                        var updateQuery = ` UPDATE movie SET modifyBy=?`;
                        var paramUpdates = [roleUser.iduser];
                        if (judul.length > 0) {
                            if (paramUpdates.length > 0) {
                                updateQuery += `, `;
                            }
                            updateQuery += ` judul=? `;
                            paramUpdates.push(judul);
                        }

                        if (description.length > 0) {
                            if (paramUpdates.length > 0) {
                                updateQuery += `, `;
                            }
                            updateQuery += ` deskripsi=? `;
                            paramUpdates.push(description);
                        }

                        if (image_thumbnail.length > 0) {
                            if (paramUpdates.length > 0) {
                                updateQuery += `, `;
                            }
                            updateQuery += ` image_thumbnail=? `;
                            paramUpdates.push(image_thumbnail);
                        }

                        if (image_large.length > 0) {
                            if (paramUpdates.length > 0) {
                                updateQuery += `, `;
                            }
                            updateQuery += ` image_large=? `;
                            paramUpdates.push(image_large);
                        }

                        if (start_date.length > 0) {
                            if (paramUpdates.length > 0) {
                                updateQuery += `, `;
                            }
                            updateQuery += ` start_date=? `;
                            paramUpdates.push(start_date);
                        }

                        if (end_date.length > 0) {
                            if (paramUpdates.length > 0) {
                                updateQuery += `, `;
                            }
                            updateQuery += ` end_date=? `;
                            paramUpdates.push(end_date);
                        }

                        updateQuery += ' WHERE idmovie=?';
                        paramUpdates.push(idmovie);


                        return db.query(
                            updateQuery, paramUpdates
                        ).then(rows => {
                            return {
                                message: 'update sukses!',
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


async function listMovie(token, judul, start_date, end_date) {


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
                            `SELECT * FROM movie WHERE judul LIKE '%${judul}%' AND start_date >= ? AND end_date<=? `, [  start_date, end_date]
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
    entryMovie,
    updateMovie,
    listMovie
}