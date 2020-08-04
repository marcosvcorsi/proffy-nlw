import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

const TeacherItem: React.FC = () => {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars3.githubusercontent.com/u/5308575?s=460&u=3edc49708de269c0df62f84c1681d6a5582f2ec4&v=4"
          alt="Marcos"
        />

        <div>
          <strong>Marcos Corsi</strong>
          <span>Programação</span>
        </div>
      </header>

      <p>
        Teste
        <br /> <br />
        Teste
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 80,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
};

export default TeacherItem;
