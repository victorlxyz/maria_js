import dotenv from "dotenv";
import mariadb from "mariadb";

dotenv.config();

const connectionPool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10
});

let connection;

try {
    connection = await connectionPool.getConnection();
    const rows = await connection.query("SELECT * FROM etudiant");
    console.log(rows);
} catch (error) {
    console.error(error);
} finally {
    if (connection) connection.release();
}