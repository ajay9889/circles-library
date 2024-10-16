import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SelectedNumberCard } from '../../components/Card/SelectedNumberCard';

type Props = {
  heading?: string;
  subHeading?: string;
  selectedNumber: string;
};

export const SelectedNumber = ({
  heading,
  subHeading,
  selectedNumber,
}: Props) => {
  return (
    <View style={styles.container}>
      <SelectedNumberCard
        heading={heading}
        subHeading={subHeading}
        selectedNumber={selectedNumber}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 6,
  },
});
