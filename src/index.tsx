import 'intl-pluralrules';
import {
  requireNativeComponent,
  UIManager,
  Platform,
  type ViewStyle,
  View,
  StyleSheet,
} from 'react-native';

export { initI18next } from './i18n';
export { default as languageSelectionReducer } from './languageSelection/languageSelectionSlice';
export { default as authReducer } from './auth/auth.slice';
export { LanguageSelection } from './languageSelection/LanguageSelection';
export { PlanSelection } from './planSelection/PlanSelection';
export { default as planSelectionReducer } from './planSelection/planSelectionSlice';
export { NumberSelection } from './numberSelection/NumberSelection';
export { default as numberSelectionReducer } from './numberSelection/numberSelectionSlice';
export { Header } from './components/Header/Header';
export { ProtectedRoute } from './protect-route';
export type { MarketConfig } from './market-configs/market-config.type';

const LINKING_ERROR =
  `The package 'circles-library' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type CirclesLibraryProps = {
  color: string;
  style: ViewStyle;
};

const ComponentName = 'CirclesLibraryView';

export const CirclesLibraryView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<CirclesLibraryProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };

export const LanguageSelectionScreen = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 16,
  },
  paragraph: {
    margin: 10,
    fontSize: 16,
  },
});
