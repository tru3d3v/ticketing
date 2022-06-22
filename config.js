const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: "ticketing_db_1",
      //host:"localhost",
      user: "root",
      password: "admin",
      database: "ticketing",
      multipleStatements:true,
      debug: true,
      rowsAsArray: false
    },
    listPerPage: 10,
    jumlahStudio: 10,
    jumlahKursi: 25
  };
  module.exports = config;