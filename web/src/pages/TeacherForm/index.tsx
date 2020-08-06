import React from 'react';
import PageHeader from '../../components/PageHeader';

import './styles.css';

const TeacherForm: React.FC = () => {
  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrivel que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <fieldset>
          <legend>Seus dados</legend>

          <div className="input-block">
            <label htmlFor="name">Nome Completo</label>

            <input id="name" type="text" />
          </div>

          <div className="input-block">
            <label htmlFor="avatar">Avatar</label>

            <input id="avatar" type="text" />
          </div>

          <div className="input-block">
            <label htmlFor="whatsapp">Whatsapp</label>

            <input id="whatsapp" type="text" />
          </div>
        </fieldset>
      </main>
    </div>
  );
};

export default TeacherForm;
