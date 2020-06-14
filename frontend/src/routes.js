import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import initial from './pages/InitialPage';
import ListCompanies from './pages/companies/companiesList';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={initial}/>
                <Route path='/companiesList' component={ListCompanies}/>
            </Switch>
        </BrowserRouter>
    )
}

