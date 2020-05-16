import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import {FiLogIn} from 'react-icons/fi';
import Api from '../../services/Api';

import logoImg from '../../assets/logo.svg';
import loginImg from '../../assets/login.png';

export default function Logon(){
  const [id, setId] = useState('');
  const history = useHistory();

  async function headleLogin(e){
    e.preventDefault();
    try {
      const response = await Api.post('sessions',{id});
      
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);
      history.push('/profile');
    } catch (err) {
      alert('Falha no login, tente novamente!');
    }
  }

  return(
   <div className="logon-container">
     <section className="form">
        <img src={logoImg} alt="Predio"/>
       <form onSubmit={headleLogin}>
         <h1>Faça seu Login </h1>
         <input 
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
         <button className="button" type="submit">Entrar</button>
         <Link className="back-link" to="/registers">
           <FiLogIn size={16} color="#0AA0DB"/>
           Não tenho cadastro
         </Link>
       </form>
     </section>

     <img src={loginImg} alt="Hospital"/>
   </div>
  )
}