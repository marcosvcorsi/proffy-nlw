import React, { useCallback, FormEvent, useState } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css';
import { useForm } from '../../hooks/form';
import api from '../../services/api';

interface Teacher {
  id: number;
  subject: string;
  cost: number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
  user_id: number;
}

const TeacherList: React.FC = () => {
  const { values, handleChange } = useForm({
    subject: '',
    week_day: '',
    time: '',
  });

  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const searchTeachers = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      try {
        const { subject, week_day, time } = values;

        const { data } = await api.get('/classes', {
          params: {
            subject,
            week_day,
            time,
          },
        });

        setTeachers(data);
      } catch (err) {
        alert('error');
      }
    },
    [values]
  );

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            name="subject"
            label="Matéria"
            value={values.subject}
            onChange={handleChange}
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Ciências', label: 'Ciências' },
              { value: 'Educação Física', label: 'Educação Física' },
              { value: 'Física', label: 'Física' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'História', label: 'História' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Português', label: 'Português' },
              { value: 'Química', label: 'Química' },
            ]}
          />

          <Select
            name="week_day"
            label="Dia da semana"
            value={values.week_day}
            onChange={handleChange}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' },
            ]}
          />

          <Input
            name="time"
            label="Hora"
            type="time"
            value={values.time}
            onChange={handleChange}
          />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} />
        ))}
      </main>
    </div>
  );
};

export default TeacherList;
