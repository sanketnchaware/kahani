const mongoose = require("mongoose");

const connect = () => {
  const db_connection = process.env.DATABASE_URL;
  return mongoose.connect(db_connection, {
    serverSelectionTimeoutMS: 30000,
    connectTimeoutMS: 15000,
  });
};

module.exports = connect;
