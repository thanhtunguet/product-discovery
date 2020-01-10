import { AxiosResponse } from 'axios';
import { Repository } from 'repositories/Repository';

export class AutoCompleteSearchRepository extends Repository {
    constructor() {
        super();
        this.setBaseURL('http://123.31.32.172:5001');
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
