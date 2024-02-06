import {ISkill} from '../types/ISkill';
import {urlPath} from './backendUrl';

export default class SkillsService {
    private static _url = urlPath + 'skills/';
    static async getSkills() {
        const response = await fetch(this._url);

        if (!response.ok) {
            throw new Error(`Error fetching skills: ${response.statusText}`);
        }

        return await response.json();
    }

    static async createSkill(newSkill: ISkill) {
        const response = await fetch(this._url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newSkill)
        });

        if (!response.ok) {
            throw new Error(`Error creating skill: ${response.statusText}`);
        }

        return await response.json();
    }

    static async updateSkill(updatedSkill: ISkill) {
        const response = await fetch(this._url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedSkill)
        });

        if (!response.ok) {
            throw new Error(`Error updating skill: ${response.statusText}`);
        }

        return await response.json();
    }

    static async deleteSkill(skill_id: number) {
        const response = await fetch(this._url + skill_id, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Error deleting skill: ${response.statusText}`);
        }

        return await response.json();
    }
}
