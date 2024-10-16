import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

interface NumberSelectionChoiceCardProps {
  title: string;
  planImage: string;
  features: string[];
}

export const NumberSelectionChoiceCard: React.FC<
  NumberSelectionChoiceCardProps
> = ({ title, planImage, features }) => {
  const theme = useSelector((state: any) => state.theme.cssTheme);
  const styles = getStyles(theme);
  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.choiceContent}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: planImage }} style={styles.image} />
        </View>
        <View style={styles.featuresContainer}>
          {features?.map((feature) => (
            <View style={styles.featureItem} key={feature}>
              <View style={styles.featureIcon}></View>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
      </View>
    </>
  );
};

function getStyles(cssTheme: any) {
  return StyleSheet.create({
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    color: cssTheme.colors.primary[900],
  },
  choiceContent: {
    paddingVertical: 24,
  },
  imageContainer: {
    marginBottom: 14,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: 'rgba(0, 0, 0, 0.12)',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 8,
  },
  image: {
    width: '100%',
    height: undefined,
  },
  featuresContainer: {
    paddingHorizontal: 16,
    flexDirection: 'column',
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureIcon: {
    width: 4,
    height: 4,
    borderRadius: 4,
    backgroundColor: cssTheme.colors.gray[900],
  },
  featureText: {
    fontSize: 14,
    lineHeight: 20,
    color: cssTheme.colors.gray[900],
  },
});
}
