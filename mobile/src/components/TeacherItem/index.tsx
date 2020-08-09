import React, { useCallback, useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';
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

interface TeacherItemProps {
  teacher: Teacher;
  favorited: boolean;
  onAddFavorite?(id: number): void;
  onRemoveFavorite(id: number): void;
}

const TeacherItem: React.FC<TeacherItemProps> = ({
  teacher,
  favorited,
  onAddFavorite,
  onRemoveFavorite,
}) => {
  const { id, name, subject, avatar, bio, cost, whatsapp } = teacher;

  const handleLinkToWhatsapp = useCallback(() => {
    api.post('/connections', {
      user_id: id,
    });

    Linking.openURL(`whatsapp://send?phone=${whatsapp}`);
  }, [whatsapp]);

  const handleToggleFavorite = useCallback(() => {
    if (favorited) {
      onRemoveFavorite(id);
    } else if (onAddFavorite) {
      onAddFavorite(id);
    }
  }, [id, favorited, onAddFavorite, onRemoveFavorite]);

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.avatar} source={{ uri: avatar }} />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{name}</Text>

          <Text style={styles.subject}>{subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{bio}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/Hora {'  '}
          <Text style={styles.priceValue}>R$ {cost}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            style={[styles.favoriteButton, favorited ? styles.favorited : null]}
            onPress={handleToggleFavorite}
          >
            <Image source={favorited ? unfavoriteIcon : heartOutlineIcon} />
          </RectButton>

          <RectButton
            style={styles.contactButton}
            onPress={handleLinkToWhatsapp}
          >
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;
