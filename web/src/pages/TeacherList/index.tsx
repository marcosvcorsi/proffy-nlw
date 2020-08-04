import React from 'react';
import PageHeader from '../../components/PageHeader';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

const TeacherList: React.FC = () => {
  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers">
          <div className="input-block">
            <label htmlFor="subject">Matéria</label>

            <input id="subject" type="text" />
          </div>

          <div className="input-block">
            <label htmlFor="week-day">Dia da semana</label>

            <input id="week-day" type="text" />
          </div>

          <div className="input-block">
            <label htmlFor="time">Hora</label>

            <input id="time" type="text" />
          </div>
        </form>
      </PageHeader>

      <main>
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
      </main>
    </div>
  );
};

export default TeacherList;
