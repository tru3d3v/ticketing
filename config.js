const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: "localhost",
      user: "root",
      password: "admin",
      database: "ticketing",
    },
    listPerPage: 10,
    jumlahStudio: 10,
    jumlahKursi: 25
  };
  module.exports = config;