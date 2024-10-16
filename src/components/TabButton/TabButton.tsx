import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { ProductCategory } from '../../planSelection/planSelectionTypes';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

interface TabButtonProps {
  tabs: string[];
  onTabPress: (tab: ProductCategory, index: number) => void;
  activeTabIndex: number;
}

export const TabButton: React.FC<TabButtonProps> = ({
  tabs,
  onTabPress,
  activeTabIndex,
}) => {
  const theme = useSelector((state: any) => state.theme.cssTheme);
  const styles = getStyles(theme);
  const { t } = useTranslation();
  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.tab, activeTabIndex === index ? styles.activeTab : {}]}
          onPress={() => onTabPress(tab as ProductCategory, index)}
        >
          <Text
            style={
              activeTabIndex === index ? styles.activeText : styles.tabText
            }
          >
            {tab.toLowerCase() === 'prepaid'
              ? t('common.ui.plans.prepaid')
              : t('common.ui.plans.postpaid')}
          </Text>
          {activeTabIndex === index && <View style={styles.underline} />}
        </TouchableOpacity>
      ))}
    </View>
  );
};

function getStyles(cssTheme: any) {
  return StyleSheet.create({
  tabContainer: {
    marginTop: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  tab: {
    flex: 1,
    paddingBottom: 8,
    alignItems: 'center',
    borderRadius: 0,
    position: 'relative',
  },
  activeTab: {
    borderBottomWidth: 0,
    paddingBottom: 8,
  },
  tabText: {
    color: cssTheme.colors.gray[600],
    fontSize: 16,
    lineHeight: 24,
    textTransform: 'capitalize',
    textAlign: 'center',
    fontWeight: 'normal',
  },
  activeText: {
    color: cssTheme.colors.gray[900],
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    height: 1,
    width: '100%',
    backgroundColor: '#000',
    borderRadius: 2,
  },
});
}
