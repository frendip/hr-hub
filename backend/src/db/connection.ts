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

    static async insertSkill(skill: ISkillRaw): Promise<ISkill> {
        const client = await dbPool.connect();

        try {
            await client.query('BEGIN');

            const query = `
            INSERT INTO skills (skill_name)
            VALUES('${skill.skill_name}')
            RETURNING skill_id`;

            const result = await client.query(query);
            const skill_id = result.rows[0]['skill_id'];
            const newSkill = {...skill, skill_id} as ISkill;

            await client.query('COMMIT');

            return newSkill;
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

    static async insertSpecialist(specialist: ISpecialistRaw): Promise<ISpecialist> {
        const client = await dbPool.connect();

        try {
            await client.query('BEGIN');

            const query = `INSERT INTO specialists (full_name, work_start_time, work_end_time) 
                VALUES ('${specialist.full_name}', '${specialist.work_start_time}', '${specialist.work_end_time}')
                RETURNING specialist_id;`;

            const result = await client.query(query);
            const specialist_id = result.rows[0]['specialist_id'];
            const newSpecialist = {...specialist, specialist_id} as ISpecialist;

            await client.query('COMMIT');

            if (specialist.skills) {
                for (const skill of specialist.skills) {
                    this.insertSpecialistSkills(specialist_id, skill.skill_id);
                }
            }

            return newSpecialist;
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

            await this.deleteSpecialistSkills(newSpecialistData.specialist_id);
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
                const interviews = result.rows as IInterview[];

                for (const interview of interviews) {
                    const skills = await this.getInterviewSkills(interview.interview_id);
                    interview.skills = skills;

                    const specialist_name = await this.getInterviewSpecialist(interview.interview_id);
                    interview.specialist_name = specialist_name;
                }

                return interviews;
            } else {
                const query = `SELECT * FROM interviews WHERE interview_id=${id}`;
                const result = await client.query(query);
                const interview = result.rows[0] as IInterview;
                const skills = await this.getInterviewSkills(id);
                interview.skills = skills;
                const specialist_name = await this.getInterviewSpecialist(interview.interview_id);
                interview.specialist_name = specialist_name;

                return interview;
            }
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    }

    static async insertInterview(interview: IInterviewRaw): Promise<IInterview> {
        const client = await dbPool.connect();

        try {
            await client.query('BEGIN');

            const query = `INSERT INTO interviews (applicant_name, start_time, duration_time, specialist_id) 
                VALUES ('${interview.applicant_name}', '${interview.start_time}', '${interview.duration_time}', ${
                interview.specialist_id === null ? 'NULL' : `'${interview.specialist_id}'`
            })
                RETURNING interview_id`;

            const result = await client.query(query);
            const interview_id = result.rows[0]['interview_id'];
            const newInterview = {...interview, interview_id} as IInterview;

            await client.query('COMMIT');

            if (interview.skills) {
                for (const skill of interview.skills) {
                    await this.insertInterviewSkills(interview_id, skill.skill_id);
                }
            }

            if (interview.specialist_id) {
                const {full_name} = (await this.getSpecialists(interview.specialist_id)) as ISpecialist;
                interview.specialist_name = full_name;
            }

            return newInterview;
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
            duration_time='${newInterviewData.duration_time}',
            specialist_id=${newInterviewData.specialist_id === null ? 'NULL' : `'${newInterviewData.specialist_id}'`}
            WHERE interview_id=${newInterviewData.interview_id}`;
            await client.query(query);

            await this.deleteInterviewSkills(newInterviewData.interview_id);
            if (newInterviewData.skills) {
                for (const skill of newInterviewData.skills) {
                    this.insertInterviewSkills(newInterviewData.interview_id, skill.skill_id);
                }
            }

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

    static async getInterviewSpecialist(id: number): Promise<string> {
        const client = await dbPool.connect();

        try {
            const query = `SELECT specialists.full_name
            FROM interviews
            LEFT JOIN specialists ON interviews.specialist_id = specialists.specialist_id
            WHERE interviews.interview_id = ${id};
            `;

            const result = await client.query(query);
            return result.rows[0].full_name as unknown as string;
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    }

    static async getInterviewSkills(id: number): Promise<ISkill[]> {
        const client = await dbPool.connect();

        try {
            const query = `SELECT skills.skill_id, skills.skill_name
                FROM interviews
                JOIN interview_skills ON interviews.interview_id = interview_skills.interview_id
                JOIN skills ON interview_skills.skill_id = skills.skill_id
                WHERE interviews.interview_id = ${id};`;

            const result = await client.query(query);

            return result.rows;
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    }

    static async insertInterviewSkills(interview_id: number, skill_id: number): Promise<void> {
        const client = await dbPool.connect();
        try {
            await client.query('BEGIN');

            const query = `INSERT INTO interview_skills (interview_id, skill_id)
            VALUES (${interview_id}, ${skill_id});`;
            await client.query(query);

            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    static async deleteInterviewSkills(interview_id: number, skill_id?: number): Promise<void> {
        const client = await dbPool.connect();

        try {
            await client.query('BEGIN');

            const query =
                skill_id === undefined
                    ? `DELETE FROM interview_skills
            WHERE interview_id = ${interview_id};`
                    : `DELETE FROM interview_skills
            WHERE interview_id = ${interview_id} AND skill_id = ${skill_id};`;
            await client.query(query);

            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }
}
