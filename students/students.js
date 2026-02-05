export async function getAllStudents(connection) {
    const query = "SELECT * FROM etudiant";
    return await connection.query(query);
}
