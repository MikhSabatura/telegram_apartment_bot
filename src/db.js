const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;
console.log(connectionString);

const pool = new Pool({
    // connectionString: connectionString
    user: "postgres",
    host: "localhost",
    database: "unity_telegram_bot",
    port: 5432
});
console.log(pool);

module.exports = {
    query: (query) => {
        return pool.query(query);
    }
};