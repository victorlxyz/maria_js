export async function getAllStudents(connection) {
    const query = "SELECT * FROM etudiant";
    return await connection.query(query);
}

export async function getStudentById(connection, studentId) {
    try {
        const rows = await connection.query(`SELECT * FROM etudiant WHERE etudiant.etudiant_Id = ?`, [studentId]);
        return rows;
    } catch (error) {
        console.error(error)
    }
}