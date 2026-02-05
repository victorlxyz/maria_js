import mariadb from "mariadb";
import dotenv from "dotenv";

import { DB_CONFIG } from "./constants/constants.js";
import { getAllStudents } from "./students/students.js";
import { getAllCours, getStudentsByCoursId } from "./cours/cours.js";
import { getStudentById } from "./students/students.js";
import { getCoursById } from "./cours/cours.js";
import { createStudent } from "./students/students.js";
import { createCours } from "./cours/cours.js";
import { updateStudentEmail } from "./students/students.js";

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

    const etudiantData = await getStudentById(connection, 1);
    console.log("Student by ID:", etudiantData);

    const coursData = await getCoursById(connection, 1);
    console.log("Cours by ID:", coursData);

    const newStudent = {
    etudiant_num_carte_identite: "CI-0001",
    etudiant_nom: "Marcel",
    etudiant_prenom: "Laurent",
    etudiant_email: null,
    etudiant_annees_experience: 2,
    etudiant_telephone: "0612345678",
    etudiant_adresse_ligne_1: "12 Impasse du SQL",
    etudiant_adresse_ligne_2: null,
    etudiant_code_postal: "75001",
    etudiant_ville: "Paris",
    etudiant_niveau_etudes: "Licence",
    tuteur_Id: 1
};
 //   const createNewStudent = await createStudent(connection, newStudent);
 //   console.log("Student created with ID:", createNewStudent.insertId);

    const newCours = {
        cours_numero_semaine: "13",
        cours_thematique:"Cuisine",
        cours_taux_horaire:"40",
        cours_total_heures_semaine:"2",
        discipline_Id:"4",
        intervenant_siret:"11111111111111",
        salle_Id:"3"
    }

 //   const createNewCours = await createCours(connection, newCours);
 //   console.log("Cours created with ID:", createNewCours.insertId);

    const newStudentEmail = await updateStudentEmail(connection, 9, "patrick.danger@civelampus.org");
    if (newStudentEmail.affectedRows === 1) {
        console.log("Student email updated")
    } else {
        console.log("Student email was not updated")
    }

    const getStudentsByCoursTest = await getStudentsByCoursId(connection, 1);
    console.log("Students who attended cours 1", getStudentsByCoursTest)

} catch (error) {
    console.error("Database error:", error);
} finally {
    if (connection) connection.release();
    await pool.end();
}
