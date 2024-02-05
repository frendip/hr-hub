import {ISpecialist} from '../types/ISpecialist';
import {urlPath} from './backendUrl';

export default class SpecialistsService {
    private static _url = urlPath + 'specialists/';
    static async getSpecialists() {
        const response = await fetch(this._url);

        if (!response.ok) {
            throw new Error(`Error fetching specialists: ${response.statusText}`);
        }

        return await response.json();
    }

    static async updateSpecialist(updatedSpecialist: ISpecialist) {
        const response = await fetch(this._url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedSpecialist)
        });

        return await response.json();
    }
}
