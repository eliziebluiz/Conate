import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import { IoMdLogOut } from 'react-icons/io';
import logoImg from '../../assets/logo.svg';
import Api from '../../services/Api'
import './styles.css';

export default function Profile(){
  const [incidents, setIncidents] = useState([]);

 const ongId = localStorage.getItem('ongId'); 
 const ongName = localStorage.getItem('ongName');
 
 const history = useHistory();

 useEffect(()=> {
    Api.get('profile', {
      headers:{
        Authorization: ongId,
      }
    }).then(response =>{
        setIncidents(response.data)
    })}, [ongId]);
 
  async function handleDeleteIncident(id){
    try {
      await Api.delete(`incidents/${id}`,{
        headers: {
          Authorization: ongId,
        }
      });
      setIncidents(incidents.filter(incidents => incidents.id !== id))
    }catch (err) {
      alert('Erro ao deletar caso, tente novamente!')
    }
  }
  function handleLogout(){
    localStorage.clear();
    history.push('/');
  }
 return(
     <div className="profile-container">
        <header>
          <img src={logoImg} alt="Conate"/>
          <span>Bem Vindo, {ongName}</span>
          <Link className="button" to="/newincident">Cadastrar novo caso</Link>
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
              <button onClick={()=>handleDeleteIncident(incidents.id)} type="button">
                <FiTrash2 size={20} color="#dcdce6"/>
              </button>
            </li>
           ))
         }
        </ul>
     </div>
 )
}