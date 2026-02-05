export async function getAllCours(connection) {
    const query = "SELECT * FROM cours";
    return await connection.query(query);
}

export async function getCoursById(connection, coursId) {
    try {
        const rows = await connection.query(`SELECT * FROM cours WHERE cours_Id = ?`, [coursId]);
        return rows;
    } catch (error) {
        console.error(error)
    }
}