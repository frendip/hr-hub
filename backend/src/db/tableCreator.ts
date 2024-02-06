import dbPool from './config.js';

export default async function tableCreator() {
    const client = await dbPool.connect();
    try {
        await client.query(`
        CREATE TABLE IF NOT EXISTS specialists (
            specialist_id SERIAL PRIMARY KEY,
            full_name VARCHAR(255) NOT NULL,
            work_start_time TIME NOT NULL,
            work_end_time TIME NOT NULL
        );
      `);

        console.log('Tables specialist created successfully.');

        await client.query(`
        CREATE TABLE IF NOT EXISTS skills (
            skill_id SERIAL PRIMARY KEY,
            skill_name VARCHAR(255) UNIQUE NOT NULL
        );
    `);
        console.log('Tables skills created successfully.');

        await client.query(`
        CREATE TABLE IF NOT EXISTS specialist_skills (
            specialist_id INT NOT NULL,
            skill_id INT NOT NULL,
            PRIMARY KEY (specialist_id, skill_id),
            FOREIGN KEY (specialist_id) REFERENCES specialists(specialist_id) ON DELETE CASCADE,
            FOREIGN KEY (skill_id) REFERENCES skills(skill_id) ON DELETE CASCADE
        );
    `);
        console.log('Tables specialist_skills created successfully.');

        await client.query(`
        CREATE TABLE IF NOT EXISTS interviews (
            interview_id SERIAL PRIMARY KEY,
            applicant_name VARCHAR(255) NOT NULL,
            start_time TIME NOT NULL,
            duration_time TIME NOT NULL,
            specialist_id INT,
            FOREIGN KEY (specialist_id) REFERENCES specialists(specialist_id) ON DELETE SET NULL
        );
    `);
        console.log('Tables interviews created successfully.');

        await client.query(`
        CREATE TABLE IF NOT EXISTS interview_skills (
            interview_id INT NOT NULL,
            skill_id INT NOT NULL,
            PRIMARY KEY (interview_id, skill_id),
            FOREIGN KEY (interview_id) REFERENCES interviews(interview_id) ON DELETE CASCADE,
            FOREIGN KEY (skill_id) REFERENCES skills(skill_id) ON DELETE CASCADE
        );
    `);
        console.log('Tables interviews_skills created successfully.');
    } catch (error) {
        console.error('Error creating tables:', error);
    } finally {
        client.release();
    }
}

tableCreator();
