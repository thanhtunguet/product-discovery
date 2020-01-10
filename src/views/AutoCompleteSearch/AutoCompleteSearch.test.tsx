import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';

import AutoCompleteSearch from './AutoCompleteSearch';

describe('AutoCompleteSearch', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MemoryRouter>
                <AutoCompleteSearch/>
            </MemoryRouter>,
            div,
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});
