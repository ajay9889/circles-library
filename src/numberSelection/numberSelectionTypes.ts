export type SimType = 'PHYSICAL' | 'ESIM';

export type SimTypeObject = {
  id: string;
  label: string;
  value: SimType;
  icon: string;
};

export type NumberType = 'NEW_NUMBER' | 'TRANSFER_NUMBER';

export type NumberTypeObject = {
  id: string;
  label: string;
  value: NumberType;
  icon: string;
};

export type NumberCategory = 'FREE_NUMBER' | 'PREMIUM_NUMBER';

export type NumberCategory2 = 'STANDARD' | 'Platinum';

export type NumberCategoryObject = {
  id: string;
  label: string;
  value: NumberCategory2;
};
