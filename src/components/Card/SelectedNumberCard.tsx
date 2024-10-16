import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

interface SelectedNumberCardProps {
  heading?: string;
  subHeading?: string;
  selectedNumber: string;
}

export const SelectedNumberCard: FC<SelectedNumberCardProps> = ({
  heading,
  subHeading,
  selectedNumber,
}) => {
  const theme = useSelector((state: any) => state.theme.cssTheme);
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      {heading && <Text style={styles.heading}>{heading}</Text>}
      <View style={styles.card}>
        {subHeading && <Text style={styles.subHeading}>{subHeading}</Text>}
        <Text style={styles.number}>{selectedNumber}</Text>
      </View>
    </View>
  );
};

function getStyles(cssTheme: any) {
  return StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  heading: {
    fontSize: cssTheme.fontSize.selectedNumberCardHeading,
    lineHeight: 28,
    fontWeight: 'bold',
    color: cssTheme.colors.primary[900],
    marginBottom: 20,
  },
  card: {
    paddingHorizontal: cssTheme.padding.selectedNumberCard.horizontal,
    paddingVertical: cssTheme.padding.selectedNumberCard.vertical,
    borderColor: cssTheme.colors.primary[600],
    borderWidth: cssTheme.borderWidth.selectedNumberCard,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: cssTheme.colors.selectedNumberCard.bg,
  },
  subHeading: {
    fontSize: cssTheme.fontSize.selectedNumberCardSubHeading,
    fontWeight: 'bold',
    color: cssTheme.colors.selectedNumberCard.subHeading,
    marginBottom: 8,
  },
  number: {
    fontSize: cssTheme.fontSize.selectedNumberCardNumber,
    fontWeight: 'bold',
    color: cssTheme.colors.selectedNumberCard.number,
  },
});
}
