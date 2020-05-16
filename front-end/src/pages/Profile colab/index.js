import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
//import { FiTrash2 } from 'react-icons/fi';
import { IoMdLogOut } from 'react-icons/io';
import logoImg from '../../assets/logo.svg';
import Api from '../../services/Api'
import './styles.css';

export default function Profile(){
  const [incidents, setIncidents] = useState([]);
 
 const history = useHistory();

 useEffect(()=> {
    Api.get('profilecolab', {
    }).then(response =>{
        setIncidents(response.data)
    })});
 

  function handleLogout(){
    localStorage.clear();
    history.push('/');
  }

 return(
     <div className="profilecolab-container">
        <header>
          <img src={logoImg} alt="Conate"/>
          <span>Bem Vindo, obrigado por colaborar</span>
          <button onClick={handleLogout} type="button">
            <IoMdLogOut size={18} color="#0AA0DB"/>
          </button>
        </header>
        <h1>Casos cadastrados</h1>

        <ul>
        {
           incidents.map(incidents => (
              <li key={incidents.id}>
                <strong> Caso: </strong>
                <p>{incidents.titulo}</p>

                <strong> Descrição: </strong>
                <p>{incidents.description}</p>

                <strong> Valor: </strong>
                <p>{Intl.NumberFormat('pt-BR',{style: 'currency', currency: 'BRL'}).format(incidents.value)}</p>
                <strong>Contatos: </strong>
                <Link className="link-email" >Email</Link>
                <Link className="link-whatsapp" >WhatsApp</Link>
              </li>   
           ))
         }
        </ul>
     </div>
 )
}