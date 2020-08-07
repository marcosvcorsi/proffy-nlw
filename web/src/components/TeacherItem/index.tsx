import React, { useCallback } from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';
import api from '../../services/api';

interface Teacher {
  id: number;
  subject: string;
  cost: number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
}

interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  const { id, subject, cost, name, avatar, whatsapp, bio } = teacher;

  const createConnection = useCallback(async () => {
    api.post('/connections', {
      user_id: id,
    });
  }, [id]);

  return (
    <article className="teacher-item">
      <header>
        <img src={avatar} alt={name} />

        <div>
          <strong>{name}</strong>
          <span>{subject}</span>
        </div>
      </header>

      <p>{bio}</p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ {cost}</strong>
        </p>
        <a
          href={`https://wa.me/${whatsapp}`}
          onClick={createConnection}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
