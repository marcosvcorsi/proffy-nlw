import React, { useCallback } from 'react';
import { View, Image, Text, Linking } from 'react-native';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';

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
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  const { name, subject, avatar, bio, cost, whatsapp } = teacher;

  const handleLinkToWhatsapp = useCallback(() => {
    Linking.openURL(`whatsapp://send?phone=${whatsapp}`);
  }, [whatsapp]);

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
          <RectButton style={[styles.favoriteButton, styles.favorited]}>
            {/* <Image source={heartOutlineIcon} /> */}
            <Image source={unfavoriteIcon} />
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
