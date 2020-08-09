import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  ScrollView,
  TextInput,
  BorderlessButton,
  RectButton,
} from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import PageHeader from '../../components/PageHeader';

import TeacherItem from '../../components/TeacherItem';
import styles from './styles';
import api from '../../services/api';

interface Teacher {
  id: number;
  name: string;
  subject: string;
  avatar: string;
  bio: string;
  cost: number;
  whatsapp: string;
  user_id: number;
}

const TeacherList: React.FC = () => {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [favorites, setFavorites] = useState<Teacher[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('favorites').then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        setFavorites(favoritedTeachers);
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleAddFavorite = useCallback(
    (id: number) => {
      const findTeacher = teachers.find((teacher) => teacher.id === id);

      if (findTeacher) {
        setFavorites((state) => {
          return [...state, findTeacher];
        });
      }
    },
    [teachers]
  );

  const handleRemoveFavorite = useCallback((id: number) => {
    setFavorites((state) => {
      return state.filter((teacher) => teacher.id !== id);
    });
  }, []);

  const handleToggleFilterVisible = useCallback(() => {
    setIsFiltersVisible((state) => !state);
  }, []);

  const handleSearchTeachers = useCallback(async () => {
    try {
      const { data } = await api.get('/classes', {
        params: {
          subject,
          week_day,
          time,
        },
      });

      setIsFiltersVisible(false);
      setTeachers(data);
    } catch (err) {
      Alert.alert('Erro ao filtrar');
    }
  }, [subject, week_day, time]);

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <BorderlessButton onPress={handleToggleFilterVisible}>
            <Feather name="filter" size={20} color="#FFF" />
          </BorderlessButton>
        }
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>

            <TextInput
              style={styles.input}
              placeholder="Qual a matéria"
              placeholderTextColor="#c1bccc"
              value={subject}
              onChangeText={setSubject}
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Qual o dia"
                  placeholderTextColor="#c1bccc"
                  value={week_day}
                  onChangeText={setWeekDay}
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Qual horário"
                  placeholderTextColor="#c1bccc"
                  value={time}
                  onChangeText={setTime}
                />
              </View>
            </View>

            <RectButton
              style={styles.submitButton}
              onPress={handleSearchTeachers}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      >
        {teachers.map((teacher) => (
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favorited={favorites.some(
              (favoritedTeacher) => favoritedTeacher.id === teacher.id
            )}
            onAddFavorite={handleAddFavorite}
            onRemoveFavorite={handleRemoveFavorite}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default TeacherList;
