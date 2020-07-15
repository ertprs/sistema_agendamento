import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import api from '../../services/api';


export default function ProfileCompany(){
    var history = useHistory();

    const [file, setFile] = useState('');

    var fn = new FormData();
    fn.append('file', file[0]);

    function handlePost(){
        //vou pegar o id da empresa para colocar aqui
        api.put(`uploadImage/34`, fn, {
            headers: {
                'Accept': 'application/json',
            }
        }).then(res => {
            console.log(res);
        })
        alert(fn)
        history.push('/');
    }

    
    return(
        <div>
            <form encType='multipart/form-data'>
                <input type='file' name='image' onChange={e=>setFile(e.target.files)} />
                <button type='submit' onClick={()=>handlePost()}>Enviar</button>
            </form>
        </div>
    )
}