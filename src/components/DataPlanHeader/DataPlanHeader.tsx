import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';

interface DataPlanHeaderProps {
  headingTxt: string | React.ReactNode;
  subHeaderTxt?: string | React.ReactNode;
}

export const DataPlanHeader = ({
  headingTxt,
  subHeaderTxt,
}: DataPlanHeaderProps) => {
  const theme = useSelector((state: any) => state.theme.cssTheme);
  const styles = getStyles(theme);
  return (
    <>
      <Text style={styles.selectText}>{headingTxt}</Text>
      <Text style={styles.descriptionText}> {subHeaderTxt}</Text>
    </>
  );
};

function getStyles(cssTheme: any) {
  return StyleSheet.create({
    selectText: {
      color: cssTheme.colors.primary[900],
      fontSize: 28,
      lineHeight: 32,
      fontWeight: '700',
      alignSelf: 'center',
      textAlign: 'center',
      paddingHorizontal: 10,
    },
    descriptionText: {
      color: cssTheme.colors.gray[400],
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '700',
      marginTop: 8,
      alignSelf: 'center',
      textAlign: 'center',
      paddingHorizontal: 10,
    },
  });
}
