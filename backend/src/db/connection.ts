import ISkill from '../types/ISkill.js';
import ISkillRaw from '../types/ISkillRaw.js';
import ISpecialist from '../types/ISpecialist.js';
import ISpecialistRaw from '../types/ISpecialistRaw.js';
import dbPool from './config.js';

export default class Connection {
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

    /* ------------------------------------------- */
    /* ------------------------------------------- */
    /* ------------------------------------------- */

    static async getSpecialists(id?: number): Promise<ISpecialist | ISpecialist[]> {
        const client = await dbPool.connect();

        try {
            if (id === undefined) {
                const query = 'SELECT * FROM specialists';
                const result = await client.query(query);

                return result.rows;
            } else {
                const query = `SELECT * FROM specialists WHERE specialist_id=${id}`;
                const result = await client.query(query);

                return result.rows[0];
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
                VALUES ('${specialist.full_name}', '${specialist.work_start_time}', '${specialist.work_end_time}')`;
            await client.query(query);

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

            await client.query('COMMIT');

            return newSpecialistData;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    static async deleteSpecialist(id?: number): Promise<number> {
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
}
