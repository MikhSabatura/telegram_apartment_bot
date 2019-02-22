const { Pool } = require("pg");
const connectionString = "postgresql://localhost:5432/unity_bot";

const pool = new Pool({
    connectionString: connectionString
});

module.exports = {
    query: (query) => {
        return pool.query(query);
    }
};