import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import Api from '../../services/Api';

export default function Register(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  async function handleRegister(e){
      e.preventDefault();
      const data = {
        name,
        email,
        whatsapp,
        cidade,
        uf,
      };
      console.log(data);
      try{
        const response = await Api.post('ongs', data);
        alert(`Seu ID de acesso: ${response.data.id}`);
        history.push('/');
      }catch(err){
        alert('Erro no Cadastro, tente novamente.');
      }
  }
  
  return(
    <div className="register-container">
      <div className="content">
        <section>
            <img src={logoImg} alt="Conate"/>
            <h1>Cadastro</h1>
            <p>Faça seu cadastro, entre na plataforma e </p>
            <p>demonstre os casos do seu hospital</p>
          
          <Link className="back-link" to="/">
           <FiArrowLeft size={16} color="#0AA0DB"/>
            Voltar
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input 
            placeholder="Nome do Hospital"
            value={name}
            onChange={e => setName(e.target.value) }
          />
          <input 
            type="email" 
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value) }
          />
          <input 
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value) }
          />
          
          <div className="input-group">
            <input 
              placeholder="Cidade"
              value={cidade}
              onChange={e => setCidade(e.target.value) }
            />
            <input 
              placeholder="UF" 
              style={{ width: 88 }}
              value={uf}
              onChange={e => setUf(e.target.value) }
            />
          </div>
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}