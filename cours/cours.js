export async function getAllCours(connection) {
    const query = "SELECT * FROM cours";
    return await connection.query(query);
}
