import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon } from '../../assets/Icon'; // Adjust import based on your icon library
import { Button } from '../../components/Button/Button'; // Adjust if needed
import { NumberRadioButton } from '../../components/Radio/NumberRadioButton'; // Ensure it's compatible with RN
import { formatNumber } from '../../utilFunctions';
import { useSelector } from 'react-redux';

function ListFooterComponent() {
  return <></>;
}

export function AvailableNumbers({
  numbers,
  // numbersOriginal,
  selectedNumberId,
  handleNumberClick,
  initialDisplayCount = 12,
  separateNumberAfterChars,
  showNumberPrice,
}) {
  const { t } = useTranslation();
  const [currentLength, setCurrentLength] = useState(initialDisplayCount);
  const [showAll, setShowAll] = useState(false);
  const theme = useSelector((state: any) => state.theme.cssTheme);
  const styles = getStyles(theme);

  const handleShowMore = () => {
    if (showAll) {
      setCurrentLength(initialDisplayCount);
      setShowAll(false);
    } else if (currentLength < numbers.length) {
      const updatedLength = Math.min(
        currentLength + initialDisplayCount,
        numbers.length
      );
      setCurrentLength(updatedLength);
      if (updatedLength === numbers.length) {
        setShowAll(true);
      }
    } else {
      setShowAll(true);
    }
  };

  const showMoreButtonLabel = showAll ? 'Show Less' : 'Show More';

  return (
    <View style={styles.container}>
      <FlatList
        data={numbers.slice(0, currentLength)}
        renderItem={({ item }) => {
          const numberPrice = showNumberPrice
            ? `${t('currency')}${item?.price?.value}`
            : '';
          return (
            <View
              style={
                currentLength === 1 ? styles.singleItem : styles.numberItem
              }
            >
              <NumberRadioButton
                label={formatNumber(item?.number, separateNumberAfterChars)}
                value={item?.number}
                id={item?.id}
                name="availableNumbers"
                checked={selectedNumberId === item.id}
                onChange={() => handleNumberClick(item)}
                subText={numberPrice}
              />
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
        horizontal={false}
        numColumns={2}
        contentContainerStyle={styles.list}
        ListFooterComponent={ListFooterComponent}
      />
      {(showAll || currentLength < numbers.length) && (
        <Button onPress={handleShowMore} variant="text">
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>{showMoreButtonLabel}</Text>
            <Icon
              kind={
                showMoreButtonLabel === 'Show Less'
                  ? 'roundedMinus'
                  : 'roundedPlus'
              }
              currentColor={theme.colors.primary[900]}
              width={21}
              height={20}
            />
          </View>
        </Button>
      )}
    </View>
  );
}

function getStyles(cssTheme: any) {
  return StyleSheet.create({
  container: {
    marginTop: 20,
  },
  list: {
    gap: 16,
    paddingHorizontal: 8,
  },
  numberItem: {
    flexBasis: '50%',
    flexGrow: 1,
    paddingHorizontal: 8,
  },
  singleItem: {
    flexBasis: '50%',
    flexGrow: 0,
    paddingHorizontal: 8,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: cssTheme.colors.primary[900],
    marginRight: 4,
  },
});
}
