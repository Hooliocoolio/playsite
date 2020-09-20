
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/lifehacks.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done)
      },
    },
  },
  production: {
    client: "pg",
    connection: {
      host: `${process.env.DB_HOST}`,
      user: `${process.env.DB_USER}`,
      password: `${process.env.DB_PASSWORD}`,
      database: `${process.env.DB_NAME}`,
      ssl: {
        sslmode: 'require',
        rejectUnauthorized: false,
      },
    },
    migrations: {
      directory: "./data/migrations",
    },
    pool: {
      min: 2,
      max: 10
    },
  }
};