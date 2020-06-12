import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import initial from './pages/InitialPage';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' component={initial}/>
            </Switch>
        </BrowserRouter>
    )
}

