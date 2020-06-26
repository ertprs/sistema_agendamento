import React, { useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import api from '../../services/api';

export default function Redirect(){
    const link = useHistory();
    const token = localStorage.getItem('Token');
    useEffect(()=>{
        api.get('companyId', {
            headers:{
                auther: token,
            }
        }).then(res=>{
            localStorage.setItem('id_company', res.data.id)
            link.push('/companySchedule');
        })
        
    }, [])

    return <p></p>
}