import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Accordion } from '../../components/Accordion/Accordion';
import { Button } from '../../components/Button/Button';
import { faqTranslationKeys } from '../numberSelectionHelper';

export function FAQs() {
  const { t } = useTranslation();

  const faqItems = faqTranslationKeys.map((item) => ({
    id: item.question,
    title: t(item.question),
    content: t(item.answer),
  }));

  function moreFAQs() {
    Linking.openURL('https://circles1867.zendesk.com/hc/en-us');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('most_asked_questions')}</Text>
      <Accordion items={faqItems} />
      <View style={styles.buttonContainer}>
        <Button onPress={moreFAQs}>{t('more_faqs')}</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    paddingHorizontal: 16,
    marginBottom: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1a202c',
  },
  buttonContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
});
