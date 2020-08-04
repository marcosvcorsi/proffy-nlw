import React from 'react';
import PageHeader from '../../components/PageHeader';

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
    </div>
  );
};

export default TeacherList;
