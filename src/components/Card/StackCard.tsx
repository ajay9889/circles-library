import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

export type StackCardItem = {
  id: number | string;
  title: string;
  image: string;
};

type Props = {
  items: StackCardItem[];
  onClick?: (item: StackCardItem) => void;
};

export const StackCards: React.FC<Props> = ({ items, onClick }) => {
  return (
    <View style={styles.container}>
      {items?.map((item) => (
        <TouchableOpacity
          style={styles.itemContainer}
          key={item.id}
          onPress={() => onClick?.(item)}
        >
          {item.image !== '' ? (
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require('../../assets/images/planImage.png')}
              style={styles.image}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: 16,
    gap: 14,
  },
  itemContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: undefined, // Required for maintaining aspect ratio
    aspectRatio: 5 / 2, // Assuming square images; adjust as needed
  },
});
