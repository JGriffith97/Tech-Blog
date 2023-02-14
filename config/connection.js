const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// Connection to JAWSDB is no longer relevant, as Heroku deployment is no longer an option.
// Is there an equivalent way to do this with Railway and their mySQL service?
if (process.env.MYSQL_URL) {
  // This is a provided env variable from Railway
  sequelize = new Sequelize(process.env.MYSQL_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;

// VERY HELPFUL reference: https://gist.github.com/ajcwebdev/8599295373c092f30fce9968eaf48635
// railway add > select mySQL
// railway link > to active project
// railway connect mysql to utilize mySQL in the CLI
// railway run npm run seed to run the seed.js file.