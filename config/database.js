// strapi-cms/config/database.js
var parseDbUrl = require("parse-database-url")
var dbConfig = parseDbUrl(process.env["DATABASE_URL"])
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: dbConfig.host,
      port: dbConfig.port || 5432,
      database: dbConfig.database,
      user: dbConfig.user,
      password: dbConfig.password,
      schema: dbConfig.schema, // Not required
      ssl: {
        rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
      },
    },
    debug: true,
  },
});