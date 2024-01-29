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
}
