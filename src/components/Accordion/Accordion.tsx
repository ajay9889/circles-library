import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';

type AccordionItem = {
  id: number | string;
  title: string;
  content: string;
};

type AccordionProps = {
  items: AccordionItem[];
};

export const Accordion: React.FC<AccordionProps> = ({ items }) => {

  const theme = useSelector((state: any) => state.theme.cssTheme);
  const styles = getStyles(theme);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [animation] = useState(new Animated.Value(0));

  const toggleAccordion = (index: number) => {
    if (index === activeIndex) {
      setActiveIndex(null); // Close current
    } else {
      setActiveIndex(index); // Open the clicked one
    }
  };

  const renderAccordionItem = (item: AccordionItem, index: number) => {
    const isOpen = activeIndex === index;

    return (
      <View key={item.id + '' + index} style={styles.accordionContainer}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.header}
          onPress={() => toggleAccordion(index)}
        >
          <Text style={isOpen ? styles.activeHeaderText : styles.headerText}>
            {item.title}
          </Text>
          <View style={styles.toggleIcon}>
            {!isOpen && <View style={styles.verticalLine}></View>}
            <View style={styles.horizontalLine}></View>
          </View>
        </TouchableOpacity>
        {isOpen && (
          <Animated.View style={styles.content}>
            <Text style={styles.contentText}>{item.content}</Text>
          </Animated.View>
        )}
      </View>
    );
  };

  return <View>{items.map(renderAccordionItem)}</View>;
};

function getStyles(cssTheme: any) {
  return StyleSheet.create({
  accordionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingLeft: 8,
    paddingRight: 12,
    paddingVertical: 10,
    borderBottomColor: cssTheme.colors.gray[300],
    borderBottomWidth: 0.5,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '400',
    color: cssTheme.colors.gray[900],
  },
  activeHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: cssTheme.colors.primary[900],
  },
  content: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  contentText: {
    fontSize: 16,
    color: cssTheme.colors.gray[900],
  },
  toggleIcon: {
    height: 24,
    width: 24,
    position: 'relative',
  },
  horizontalLine: {
    height: 2,
    width: 14,
    backgroundColor: cssTheme.colors.primary[900],
    position: 'absolute',
    top: 11,
    left: 5,
  },
  verticalLine: {
    height: 14,
    width: 2,
    backgroundColor: cssTheme.colors.primary[900],
    position: 'absolute',
    top: 5,
    left: 11,
  },
});
}
