import React from 'react';
import './styles.css';
import { Link} from 'react-router-dom';

import logoImg from '../../assets/colaborador.png';
import logoImgc from '../../assets/logo.svg';
import loginImg from '../../assets/login.png';

export default function Logon(){
  return(
   <div className="page-container">
        <section className="page"> 
          <img src={logoImgc} alt="Logo"/>
        </section>
          <p>Grande parte dos hospitais necessitam de doações para casos especificos do COVID-19, como forma de humanidade se torne um colaborador e ajude quem realmente precisa.</p>
          <h1>Identifique-se</h1>
        <section className="hospital"> 
          <img src={loginImg} alt="Hospital"/>
        </section>
        <Link className="link-hospital" to="/logon">Sou um Hospital</Link>
        <section className="logo">
          <img src={logoImg} alt="Predio"/>
        </section>
        <Link className="link-cola" to="/profilecolab">Quero ser um colaborador</Link>
   </div>
  )
}