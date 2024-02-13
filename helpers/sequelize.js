const Sequelize = require('sequelize');

// Initialize DB connection
const sequelize = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.DB_PASS}`, {
    host: `${process.env.DB_HOST}`,
    dialect: `${process.env.DB_DIALECT}`, /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    logging: false,
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     //rejectUnauthorized: false // This is optional depending on your configuration
    //   }
    // }
  });
  // test db connection
  // Use the .authenticate() method to test the connection
  sequelize.authenticate()
    .then(() => {
      console.log('Connection to DB successful');
    })
    .catch(err => {
      console.log('Connection to DB failed');
      console.log(err);
    });

    module.exports = sequelize