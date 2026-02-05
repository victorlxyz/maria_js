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

export async function createCours(connection, cours) {
    const query = `
        INSERT INTO cours (
            cours_numero_semaine,
            cours_thematique,
            cours_taux_horaire,
            cours_total_heures_semaine,
            discipline_Id,
            intervenant_siret,
            salle_Id
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
        cours.cours_numero_semaine,
        cours.cours_thematique,
        cours.cours_taux_horaire,
        cours.cours_total_heures_semaine,
        cours.discipline_Id,
        cours.intervenant_siret,
        cours.salle_Id
    ];

    const result = await connection.query(query, params);

    return {
        insertId: result.insertId,
        affectedRows: result.affectedRows
    };
}

export async function getStudentsByCoursId(connection, coursId) {
    const result = await connection.query(
        "CALL liste_participants_cours(?)",
        [coursId]
    );

    return result[0];
}
