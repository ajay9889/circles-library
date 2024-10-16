import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Badge } from '../Badge/Badge';
import NumberRadioButton from '../Radio/NumberRadioButton';
import { useSelector } from 'react-redux';

type Item = {
  id: string;
  label: string;
  value: string;
  icon?: string;
  color?: string;
  subText?: string;
};

type Props = {
  title?: string;
  items: Item[];
  selectedValue: string | number | null;
  radioName: string;
  description?: string;
  onChange: (value: string) => void; // Adjusted to match React Native usage
};

export const NumberSelectionCard: React.FC<Props> = ({
  title,
  items,
  onChange,
  selectedValue,
  radioName,
  description,
}) => {
  const theme = useSelector((state: any) => state.theme.cssTheme);
  const styles = getStyles(theme);
  return (
    <>
      {title && (
        <Badge
          rounded="half"
          bgColor={theme.colors.numberSelectionRadio.badgeBg}
          textColor={theme.colors.numberSelectionRadio.badgeText}
        >
          {title}
        </Badge>
      )}
      <View style={styles.itemsContainer}>
        {items?.map((item) => (
          <View style={styles.item} key={item.id}>
            <NumberRadioButton
              id={`${item.id}-${item.value}`}
              label={item.label}
              value={item.value}
              name={radioName}
              checked={selectedValue === item.value}
              onChange={onChange}
              icon={item.icon}
              subText={item.subText}
            />
          </View>
        ))}
      </View>
      {description && <Text style={styles.description}>{description}</Text>}
    </>
  );
};

function getStyles(cssTheme: any) {
  return StyleSheet.create({
  itemsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 16,
  },
  item: {
    flex: 1,
    maxWidth: '50%',
  },
  description: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 24,
    color: cssTheme.colors.gray[900],
    paddingHorizontal: 16,
  },
});
}

export default NumberSelectionCard;
