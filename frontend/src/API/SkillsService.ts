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
}
