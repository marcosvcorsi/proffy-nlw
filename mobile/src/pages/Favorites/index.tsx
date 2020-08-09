import React, { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import { ScrollView } from 'react-native-gesture-handler';
import TeacherItem from '../../components/TeacherItem';

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

const Favorites: React.FC = () => {
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

  const handleRemoveFavorite = useCallback((id: number) => {
    setFavorites((state) => {
      return state.filter((teacher) => teacher.id !== id);
    });
  }, []);

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos" />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      >
        {favorites.map((teacher) => (
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
            onRemoveFavorite={handleRemoveFavorite}
            favorited
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Favorites;
