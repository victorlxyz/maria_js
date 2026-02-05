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

export async function createStudent(connection, student) {
    const query = `
        INSERT INTO etudiant (
            etudiant_num_carte_identite,
            etudiant_nom,
            etudiant_prenom,
            etudiant_email,
            etudiant_annees_experience,
            etudiant_telephone,
            etudiant_adresse_ligne_1,
            etudiant_adresse_ligne_2,
            etudiant_code_postal,
            etudiant_ville,
            etudiant_niveau_etudes,
            tuteur_Id
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
        student.etudiant_num_carte_identite,
        student.etudiant_nom,
        student.etudiant_prenom,
        student.etudiant_email ?? null,
        student.etudiant_annees_experience,
        student.etudiant_telephone,
        student.etudiant_adresse_ligne_1,
        student.etudiant_adresse_ligne_2 ?? null,
        student.etudiant_code_postal,
        student.etudiant_ville,
        student.etudiant_niveau_etudes,
        student.tuteur_Id
    ];

    const result = await connection.query(query, params);

    return {
        insertId: result.insertId,
        affectedRows: result.affectedRows
    };
}
