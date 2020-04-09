import React from 'react';
import { Image } from 'react-native';
import { Avatar } from 'react-native-elements';

export default function AvatarIcon({ source, icon, size }) {
  return (
    <>
      {source ? (
        <Image
          source={source}
          style={{ width: size, height: size, borderRadius: size / 2 }}
        />
      ) : (
        <Avatar
          size={size}
          rounded
          overlayContainerStyle={{ backgroundColor: '#F4EFFC' }}
          source={source}
          icon={icon}
          onPress={() => {}}
          activeOpacity={1}
        />
      )}
    </>
  );
}
