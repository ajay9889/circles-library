import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectChosenProduct } from '../planSelection/planSelectionSlice';
import { NumberSelectionVerticalLayout } from './numberSelectionVariations/NumberSelectionVerticalLayout';
import { numberCategoryObjects } from './numberSelectionHelper';
import {
  fetchNumbers,
  lockSelectedNumber,
  selectAvailableNumbers,
} from './numberSelectionSlice';
import type {
  NumberCategory2,
  NumberType,
  SimType,
} from './numberSelectionTypes';
import type {
  NumberSelectionVerticalLayoutVariationConfig,
  MarketConfig,
} from '../market-configs/market-config.type';
// import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  marketConfig: MarketConfig;
  previousRoute: string;
  nextRoute: string;
  navigation: any;
};

export function NumberSelection({
  marketConfig,
  navigation,
  previousRoute,
  nextRoute,
}: Props) {
  const dispatch = useDispatch();

  const numberSelectionConfiguration = marketConfig.components.numberSelection;

  const numberSelectionVariationConfig: NumberSelectionVerticalLayoutVariationConfig =
    numberSelectionConfiguration.variationConfig as unknown as NumberSelectionVerticalLayoutVariationConfig;

  const [selectedSimType, setSelectedSimType] = useState<SimType | null>(null);

  const [selectedNumberType, setSelectedNumberType] =
    useState<NumberType | null>(null);

  // State for number category - Free | premium
  const [selectedNumberCategory, setNumberCategory] =
    useState<NumberCategory2 | null>(null);

  const [selectedNumber, setSelectedNumber] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const chosenProduct = useSelector(selectChosenProduct);

  const preselectNumber = true;
  const initialDisplayCount = 9;

  useEffect(() => {
    if (numberSelectionVariationConfig) {
      setSelectedSimType(numberSelectionVariationConfig.supportedSimTypes[0]);
      setSelectedNumberType(
        numberSelectionVariationConfig.supportedNumberTypes[0]
      );
      const selectedCategory: NumberCategory2 =
        numberCategoryObjects?.[
          numberSelectionVariationConfig.supportedNumberCategories[0]
        ]?.value;
      setNumberCategory(selectedCategory);
    }
  }, [numberSelectionVariationConfig]);

  const fetchNumberPayload = {
    preselectNumber,
    numberTypes: [{ count: 40, numberCategory: selectedNumberCategory }] as any,
  };

  function getAvailableNumbers(configOptions) {
    dispatch(fetchNumbers(configOptions) as any).then((result) => {
      const preselectedNumber = result?.payload?.result?.selectedNumber;
      if (preselectNumber && preselectedNumber && selectedNumber === null) {
        setSelectedNumber(preselectedNumber);
      }
    });
  }

  useEffect(() => {
    if (selectedNumberCategory) {
      getAvailableNumbers(fetchNumberPayload);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, selectedNumberCategory]);

  const handleSimTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSimType(e as unknown as SimType);
  };
  const handleNumberTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedNumberType(e as unknown as NumberType);
  };

  const handleNumberCategoryChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumberCategory(e as unknown as NumberCategory2);
  };

  const handleSearchQueryChange = (event) => {
    console.log('event', event);
    const newInputValue = event.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    setSearchQuery(newInputValue);

    // Add the `search` configuration if `searchQuery` has at least 4 digits
    if (selectedNumberCategory) {
      if (newInputValue.length >= 4) {
        const updatedNumberTypes = fetchNumberPayload.numberTypes.map(
          (numberType) =>
            numberType?.numberCategory === selectedNumberCategory
              ? {
                  ...numberType,
                  search: { key: newInputValue, position: 'anywhere' },
                }
              : numberType
        );
        const updatedFetchNumberPayload = {
          ...fetchNumberPayload,
          numberTypes: updatedNumberTypes,
          preselectNumber: false,
        };
        console.log('updatedFetchNumberPayload', updatedFetchNumberPayload);
        getAvailableNumbers(updatedFetchNumberPayload);
      } else if (newInputValue === '' && event === '') {
        getAvailableNumbers(fetchNumberPayload);
      }
    }
  };

  const handleNumberClick = (numberObj) => {
    setSelectedNumber(numberObj);
    dispatch(lockSelectedNumber(numberObj.number) as any); // Dispatch lock action
  };

  const numbersState = useSelector(
    (state: any) => state?.numberSelection?.numbers
  );

  const numbers = numbersState?.result?.availableNumbers ?? [];
  console.log('############# numbers', numbers);

  function handleClickBack() {
    navigation.navigate(previousRoute);
  }

  function handleClickNext() {
    navigation.navigate(nextRoute);
  }

  return (
    <NumberSelectionVerticalLayout
      variationConfig={numberSelectionVariationConfig}
      data={{
        chosenProduct,
        selectedSimType,
        selectedNumberType,
        selectedNumberCategory,
        selectedNumber: selectedNumber?.number,
        selectedNumberId: selectedNumber?.id,
        numbers,
        initialDisplayCount,
        searchQuery,
        disableBack: false,
        disableNext: true,
      }}
      handlers={{
        handleSimTypeChange,
        handleNumberTypeChange,
        handleNumberCategoryChange,
        handleNumberClick,
        handleSearchQueryChange,
        onClickBack: handleClickBack,
        onClickNext: handleClickNext,
      }}
    />
  );
}
