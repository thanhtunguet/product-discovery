import { AxiosResponse } from 'axios';
import { Repository } from 'repositories/Repository';

export class AutoCompleteSearchRepository extends Repository {
    constructor() {
        super();
        this.setBaseURL(window.location.origin);
    }

    public search(query: string): Promise<any> {
        return this.http.get('/keywords/', {
            params: {
                query,
            },
        })
            .then((response: AxiosResponse<any>) => response.data.result);
    }
}

export default new AutoCompleteSearchRepository();
