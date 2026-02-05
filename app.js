import mariadb from "mariadb";
import dotenv from "dotenv";

import { DB_CONFIG } from "./constants/constants.js";
import { getAllStudents } from "./students/students.js";
import { getAllCours } from "./cours/cours.js";

dotenv.config();

const pool = mariadb.createPool(DB_CONFIG);

let connection;

try {
    connection = await pool.getConnection();
    console.log("Database connected");

    const students = await getAllStudents(connection);
    console.log("Students:", students);

    const cours = await getAllCours(connection);
    console.log("Cours:", cours);

} catch (error) {
    console.error("Database error:", error);
} finally {
    if (connection) connection.release();
    await pool.end();
}
