import {IInterview} from '../types/IInterviews';
import {replaceJsonUndefinedToNull} from '../utils/replaceJsonUndefinedToNull';
import {urlPath} from './backendUrl';

export default class InterviewsService {
    private static _url = urlPath + 'interviews/';
    static async getInterviews() {
        const response = await fetch(this._url);

        if (!response.ok) {
            throw new Error(`Error fetching interviews: ${response.statusText}`);
        }

        return await response.json();
    }

    static async createInterview(newInterview: IInterview) {
        const response = await fetch(this._url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newInterview, replaceJsonUndefinedToNull)
        });

        if (!response.ok) {
            throw new Error(`Error creating interview: ${response.statusText}`);
        }

        return await response.json();
    }

    static async updateInterview(updatedInterview: IInterview) {
        const response = await fetch(this._url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedInterview, replaceJsonUndefinedToNull)
        });

        if (!response.ok) {
            throw new Error(`Error updating interview: ${response.statusText}`);
        }

        return await response.json();
    }

    static async deleteInterview(interview_id: number) {
        const response = await fetch(this._url + interview_id, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Error deleting interview: ${response.statusText}`);
        }

        return await response.json();
    }
}
