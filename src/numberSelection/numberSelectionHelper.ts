import type {
  NumberCategory,
  NumberCategoryObject,
} from './numberSelectionTypes';

export const numberCategoryObjects: Record<
  NumberCategory,
  NumberCategoryObject
> = {
  FREE_NUMBER: {
    id: '1',
    label: 'Free number',
    value: 'STANDARD',
  },
  PREMIUM_NUMBER: {
    id: '2',
    label: 'Premium number',
    value: 'Platinum',
  },
};

export const faqTranslationKeys = [
  {
    question: 'faq_connection_esim_device_question',
    answer: 'faq_connection_esim_device_answer',
  },
  {
    question: 'faq_planswitchstatus_transfer_number_question',
    answer: 'faq_connection_transfer_eligible_answer',
  },
  {
    question: 'faq_connection_pay_old_question',
    answer: 'faq_connection_pay_old_answer',
  },
  {
    question: 'faq_connection_if_prepaid_question',
    answer: 'faq_connection_if_prepaid_answer',
  },
];
