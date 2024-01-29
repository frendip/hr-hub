import {IInterview, IInterviewRaw} from '../types/IInterview.js';
import {ISkill, ISkillRaw} from '../types/ISkill.js';
import {ISpecialist, ISpecialistRaw} from '../types/ISpecialist.js';
import dbPool from './config.js';

export default class Connection {
    /* -------------------Skills------------------ */
    /* ------------------------------------------- */
    /* ------------------------------------------- */

    static async getSkills(id?: number): Promise<ISkill | ISkill[]> {
        const client = await dbPool.connect();

        try {
            if (id === undefined) {
                const query = 'SELECT * FROM skills';
                const result = await client.query(query);

                return result.rows;
            } else {
                const query = `SELECT * FROM skills WHERE skill_id=${id}`;
                const result = await client.query(query);

                return result.rows[0];
            }
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    }

    static async insertSkill(skill: ISkillRaw): Promise<void> {
        const client = await dbPool.connect();

        try {
            await client.query('BEGIN');

            const query = `
            INSERT INTO skills (skill_name)
            VALUES('${skill.skill_name}')`;
            await client.query(query);

            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');

            throw error;
        } finally {
            client.release();
        }
    }

    static async updateSkill(newSkillData: ISkill): Promise<ISkill> {
        const client = await dbPool.connect();
        try {
            await client.query('BEGIN');

            const query = `
            UPDATE skills
            SET skill_name='${newSkillData.skill_name}'
            WHERE skill_id=${newSkillData.skill_id}`;
            await client.query(query);

            await client.query('COMMIT');

            return newSkillData;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    static async deleteSkills(id?: number): Promise<number> {
        const client = await dbPool.connect();

        try {
            await client.query('BEGIN');

            const query = id === undefined ? 'DELETE FROM skills' : `DELETE FROM skills WHERE skill_id=${id}`;
            const deleteCount = (await client.query(query)).rowCount;

            await client.query('COMMIT');

            return deleteCount;
        } catch (error) {
            await client.query('ROLLBACK');

            throw error;
        } finally {
            client.release();
        }
    }

    /* ----------------Specialists---------------- */
    /* ------------------------------------------- */
    /* ------------------------------------------- */

    static async getSpecialists(id?: number): Promise<ISpecialist | ISpecialist[]> {
        const client = await dbPool.connect();

        try {
            if (id === undefined) {
                const query = 'SELECT * FROM specialists';
                const result = await client.query(query);
                const specialists = result.rows as ISpecialist[];

                for (const specialist of specialists) {
                    const skills = await this.getSpecialistSkills(specialist.specialist_id);
                    specialist.skills = skills;
                }

                return specialists;
            } else {
                const query = `SELECT * FROM specialists WHERE specialist_id=${id}`;
                const result = await client.query(query);
                const specialist = result.rows[0] as ISpecialist;
                const skills = await this.getSpecialistSkills(id);
                specialist.skills = skills;

                return specialist;
            }
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    }

    static async insertSpecialist(specialist: ISpecialistRaw): Promise<void> {
        const client = await dbPool.connect();

        try {
            await client.query('BEGIN');

            const query = `INSERT INTO specialists (full_name, work_start_time, work_end_time) 
                VALUES ('${specialist.full_name}', '${specialist.work_start_time}', '${specialist.work_end_time}')
                RETURNING specialist_id;`;

            const result = await client.query(query);
            const specialist_id = result.rows[0]['specialist_id'];

            if (specialist.skills) {
                for (const skill of specialist.skills) {
                    this.insertSpecialistSkills(specialist_id, skill.skill_id);
                }
            }

            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');

            throw error;
        } finally {
            client.release();
        }
    }

    static async updateSpecialist(newSpecialistData: ISpecialist): Promise<ISpecialist> {
        const client = await dbPool.connect();
        try {
            await client.query('BEGIN');

            const query = `
            UPDATE specialists
            SET full_name='${newSpecialistData.full_name}', work_start_time='${newSpecialistData.work_start_time}', work_end_time='${newSpecialistData.work_end_time}'
            WHERE specialist_id=${newSpecialistData.specialist_id}`;
            await client.query(query);

            this.deleteSpecialistSkills(newSpecialistData.specialist_id);

            if (newSpecialistData.skills) {
                for (const skill of newSpecialistData.skills) {
                    this.insertSpecialistSkills(newSpecialistData.specialist_id, skill.skill_id);
                }
            }

            await client.query('COMMIT');

            return newSpecialistData;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    static async deleteSpecialists(id?: number): Promise<number> {
        const client = await dbPool.connect();

        try {
            await client.query('BEGIN');

            const query =
                id === undefined ? 'DELETE FROM specialists' : `DELETE FROM specialists WHERE specialist_id=${id}`;
            const deleteCount = (await client.query(query)).rowCount;

            await client.query('COMMIT');

            return deleteCount;
        } catch (error) {
            await client.query('ROLLBACK');

            throw error;
        } finally {
            client.release();
        }
    }

    static async getSpecialistSkills(id: number): Promise<ISkill[]> {
        const client = await dbPool.connect();

        try {
            const query = `SELECT skills.skill_id, skills.skill_name
                FROM specialists
                JOIN specialist_skills ON specialists.specialist_id = specialist_skills.specialist_id
                JOIN skills ON specialist_skills.skill_id = skills.skill_id
                WHERE specialists.specialist_id = ${id};`;

            const result = await client.query(query);

            return result.rows;
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    }

    static async insertSpecialistSkills(specialist_id: number, skill_id: number): Promise<void> {
        const client = await dbPool.connect();

        try {
            await client.query('BEGIN');

            const query = `INSERT INTO specialist_skills (specialist_id, skill_id)
            VALUES (${specialist_id}, ${skill_id});`;
            await client.query(query);

            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    static async deleteSpecialistSkills(specialist_id: number, skill_id?: number): Promise<void> {
        const client = await dbPool.connect();

        try {
            await client.query('BEGIN');

            const query =
                skill_id === undefined
                    ? `DELETE FROM specialist_skills
            WHERE specialist_id = ${specialist_id};`
                    : `DELETE FROM specialist_skills
            WHERE specialist_id = ${specialist_id} AND skill_id = ${skill_id};`;
            await client.query(query);

            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    /* -----------------Interviews---------------- */
    /* ------------------------------------------- */
    /* ------------------------------------------- */

    static async getInterviews(id?: number): Promise<IInterview | IInterview[]> {
        const client = await dbPool.connect();

        try {
            if (id === undefined) {
                const query = 'SELECT * FROM interviews';
                const result = await client.query(query);

                return result.rows;
            } else {
                const query = `SELECT * FROM interviews WHERE interview_id=${id}`;
                const result = await client.query(query);

                return result.rows[0];
            }
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    }

    static async insertInterview(interview: IInterviewRaw): Promise<void> {
        const client = await dbPool.connect();

        try {
            await client.query('BEGIN');

            const query = `INSERT INTO interviews (applicant_name, start_time, duration_time) 
                VALUES ('${interview.applicant_name}', '${interview.start_time}', '${interview.duration_time}')`;
            await client.query(query);

            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');

            throw error;
        } finally {
            client.release();
        }
    }

    static async updateInterview(newInterviewData: IInterview): Promise<IInterview> {
        const client = await dbPool.connect();
        try {
            await client.query('BEGIN');

            const query = `
            UPDATE interviews
            SET 
            applicant_name='${newInterviewData.applicant_name}', 
            start_time='${newInterviewData.start_time}', 
            duration_time='${newInterviewData.duration_time}'
            WHERE interview_id=${newInterviewData.interview_id}`;
            await client.query(query);

            await client.query('COMMIT');

            return newInterviewData;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    static async deleteInterviews(id?: number): Promise<number> {
        const client = await dbPool.connect();

        try {
            await client.query('BEGIN');

            const query =
                id === undefined ? 'DELETE FROM interviews' : `DELETE FROM interviews WHERE interview_id=${id}`;
            const deleteCount = (await client.query(query)).rowCount;

            await client.query('COMMIT');

            return deleteCount;
        } catch (error) {
            await client.query('ROLLBACK');

            throw error;
        } finally {
            client.release();
        }
    }
}
