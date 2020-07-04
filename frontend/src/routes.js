import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import initial from './pages/InitialPage';
import ListCompanies from './pages/companies/companiesList';
import ServicesCompanies from './pages/servicesCompanies/CompaniesServices';
import UserSchedule from './pages/userSchedule/userSchedule';
import LoginClient from './pages/login/loginClient';
import LoginCompany from './pages/login/loginCompany';
import SelectLogin from './pages/login/selectLogin';
import CompanySchedule from './pages/companySchedule/companyShcedule';
import Report from './pages/report/report';
import WorkingHours from './pages/workingHours/workingHours';


export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={initial}/>
                <Route path='/companiesList' component={ListCompanies}/>
                <Route path='/servicesCompany/:id' component={ServicesCompanies}/>
                <Route path='/userSchedule' component={UserSchedule}/>
                <Route path='/login' component={LoginClient}/>
                <Route path='/loginCompany' component={LoginCompany}/>
                <Route path='/selectLogin' component={SelectLogin}/>
                <Route path='/companySchedule' component={CompanySchedule}/>
                <Route path='/report' component={Report}/>
                <Route path='/workingHours' component={WorkingHours}/>
            </Switch>
        </BrowserRouter>
    )
}

