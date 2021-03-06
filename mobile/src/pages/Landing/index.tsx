import React, { useCallback, useEffect, useState } from 'react';
import { View, Image, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

import styles from './styles';
import api from '../../services/api';

const Landing: React.FC = () => {
  const navigation = useNavigation();

  const [totalConnections, setTotalConnections] = useState(0);

  const loadConnections = useCallback(async () => {
    try {
      const { data } = await api.get('/connections');

      const { total } = data;

      setTotalConnections(total);
    } catch (err) {
      Alert.alert('Erro ao buscar conexões');
    }
  }, []);

  useEffect(() => {
    loadConnections();
  }, [loadConnections]);

  const handleNavigateToStudy = useCallback(() => {
    navigation.navigate('Study');
  }, [navigation]);

  const handleNavigateToGiveClasses = useCallback(() => {
    navigation.navigate('GiveClasses');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={landingImg} style={styles.banner} />

      <Text style={styles.title}>
        Seja bem-vindo, {'\n'}
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton
          style={[styles.button, styles.buttonPrimary]}
          onPress={handleNavigateToStudy}
        >
          <Image source={studyIcon} />
          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>

        <RectButton
          style={[styles.button, styles.buttonSecondary]}
          onPress={handleNavigateToGiveClasses}
        >
          <Image source={giveClassesIcon} />
          <Text style={styles.buttonText}>Dar aulas</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        Total de {totalConnections} conexões realizadas{' '}
        <Image source={heartIcon} />
      </Text>
    </View>
  );
};

export default Landing;
