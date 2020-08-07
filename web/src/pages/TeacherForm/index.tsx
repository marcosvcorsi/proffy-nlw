import React, { useState, useCallback, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import Select from '../../components/Select';
import { useForm } from '../../hooks/form';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

interface ScheduleItem {
  week_day: string;
  from: string;
  to: string;
}

interface IForm {
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
  subject: string;
  cost: string;
}

const TeacherForm: React.FC = () => {
  const history = useHistory();

  const { values, handleChange } = useForm<IForm>({
    name: '',
    avatar: '',
    whatsapp: '',
    bio: '',
    subject: '',
    cost: '',
  });

  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([
    { week_day: '', from: '', to: '' },
  ]);

  const setScheduleItemValue = useCallback(
    (index: number, field: string, value: string) => {
      const newScheduleItems = scheduleItems.map((scheduleItem, position) => {
        if (position === index) {
          return {
            ...scheduleItem,
            [field]: value,
          };
        }

        return scheduleItem;
      });

      setScheduleItems(newScheduleItems);
    },
    [scheduleItems]
  );

  const handleAddNewScheduleItem = useCallback(() => {
    setScheduleItems((state) => [...state, { week_day: '', from: '', to: '' }]);
  }, []);

  const handleCreateClass = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      console.log(values);
      console.log(scheduleItems);

      try {
        await api.post('/classes', {
          ...values,
          schedule: scheduleItems,
        });

        history.push('/');
      } catch (err) {
        console.log('error', err);
      }
    },
    [values, scheduleItems, history]
  );

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrivel que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name="name"
              label="Nome Completo"
              value={values.name}
              onChange={handleChange}
            />

            <Input
              name="avatar"
              label="Avatar"
              value={values.avatar}
              onChange={handleChange}
            />

            <Input
              name="whatsapp"
              label="Whatsapp"
              value={values.whatsapp}
              onChange={handleChange}
            />

            <Textarea
              name="bio"
              label="Biografia"
              value={values.bio}
              onChange={handleChange}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

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

            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={values.cost}
              onChange={handleChange}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={handleAddNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => (
              <div key={scheduleItem.week_day} className="schedule-item">
                <Select
                  name="week_day"
                  label="Dia da semana"
                  options={[
                    { value: '0', label: 'Domingo' },
                    { value: '1', label: 'Segunda-feira' },
                    { value: '2', label: 'Terça-feira' },
                    { value: '3', label: 'Quarta-feira' },
                    { value: '4', label: 'Quinta-feira' },
                    { value: '5', label: 'Sexta-feira' },
                    { value: '6', label: 'Sábado' },
                  ]}
                  value={scheduleItem.week_day}
                  onChange={(e) =>
                    setScheduleItemValue(index, 'week_day', e.target.value)
                  }
                />

                <Input
                  name="from"
                  type="time"
                  label="Das"
                  value={scheduleItem.from}
                  onChange={(e) =>
                    setScheduleItemValue(index, 'from', e.target.value)
                  }
                />
                <Input
                  name="to"
                  type="time"
                  label="Até"
                  value={scheduleItem.to}
                  onChange={(e) =>
                    setScheduleItemValue(index, 'to', e.target.value)
                  }
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante <br />
              Preencha todos os dados
            </p>

            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default TeacherForm;
