import React from 'react';
import { View, StyleSheet, Text, Linking } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Accordion } from '../../components/Accordion/Accordion';
import { Button } from '../../components/Button/Button';
import { useSelector } from 'react-redux';

type Props = {
  productCategory: 'prepaid' | 'postpaid';
};

export const FAQs: React.FC<Props> = ({ productCategory }) => {
  const theme = useSelector((state: any) => state.theme.cssTheme);
  const styles = getStyles(theme);
  const { t, i18n } = useTranslation();

  const getFAQs = (questionKeyPrefix: string, answerKeyPrefix: string) => {
    const faqs = [];
    for (let i = 1; i <= 10; i++) {
      const questionKey = `${questionKeyPrefix}_${i}`;
      // const questionKey = `${questionKeyPrefix} ${i}`;
      const answerKey = `${answerKeyPrefix}_${i}`;
      // const answerKey = `${answerKeyPrefix}_${i}`;
      const question = t(questionKey);
      const answer = t(answerKey);
      if (
        i18n.exists(questionKey) &&
        i18n.exists(answerKey) &&
        answerKey !== answer &&
        questionKey !== question
      ) {
        faqs.push({
          id: i,
          title: question,
          content: answer,
        });
      }
    }
    return faqs;
  };

  const prepaidFAQs = getFAQs(
    'faq_addon_prepaid_question',
    'faq_addon_prepaid_answer'
  );
  const postpaidFAQs = getFAQs(
    'faq_addon_postpaid_question',
    'faq_addon_postpaid_answer'
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('most_asked_questions')}</Text>
      <Accordion
        items={
          productCategory.toLowerCase() === 'prepaid'
            ? prepaidFAQs
            : postpaidFAQs
        }
      />
      <View style={styles.moreFAQsButton}>
        <Button
          onPress={() =>
            Linking.openURL('https://circles1867.zendesk.com/hc/en-us')
          }
        >
          {t('more_faqs')}
        </Button>
      </View>
    </View>
  );
};

function getStyles(cssTheme: any) {
  return StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: cssTheme.colors.gray[900],
  },
  moreFAQsButton: {
    alignSelf: 'center',
    marginTop: 24,
  },
});
}
