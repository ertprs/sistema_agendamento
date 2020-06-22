import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import initial from './pages/InitialPage';
import ListCompanies from './pages/companies/companiesList';
import ServicesCompanies from './pages/servicesCompanies/CompaniesServices';
import Login from './pages/login/login';
import UserSchedule from './pages/userSchedule/userSchedule';


export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={initial}/>
                <Route path='/companiesList' component={ListCompanies}/>
                <Route path='/servicesCompany/:id' component={ServicesCompanies}/>
                <Route path='/login' component={Login}/>
                <Route path='/userSchedule' component={UserSchedule}/>
            </Switch>
        </BrowserRouter>
    )
}

