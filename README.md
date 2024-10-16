
# Componentization UI: Developer Manual

## Table of Contents
1. [Pre-requisite for Developer](#pre-requisite-for-developer)
2. [How to run the Application (Container Application)](#how-to-run-the-application-container-application)
3. [Steps to Launch in a New Market](#steps-to-launch-in-a-new-market)
4. [How to Use the Business Component Library in Container (Market Specific) App](#how-to-use-the-business-component-library-in-container-market-specific-app)
5. [Steps to Create a New Variation of an Existing Component](#steps-to-create-a-new-variation-of-an-existing-component)
6. [Steps to Create a New Business Component](#steps-to-create-a-new-business-component)
7. [Data Sharing Between Components](#data-sharing-between-components)
8. [Handling API Calls for Business Components](#handling-api-calls-for-business-components)
9. [Navigation Management Among Business Components](#navigation-management-among-business-components)

## Pre-requisite for Developer

Knowledge of the following technologies is required:

- React
- React Native
- React Navigation
- Redux
- Typescript

## How to run the Application (Container Application)

1. Clone the `Circles_App` repository.
2. Write the backend URL in the `.env` file.
3. Run the following commands to start the application:
   ```bash
   npm install
   npm start
   npm run android
   npm run ios  # For iOS
   ```

## Steps to Launch in a New Market
 (Refer Container Application code)

1. Open the file `component.ts` inside the folder `/src/market-configs`.
2. Modify the market configuration in `component.ts` to meet the new market requirements.
3. Modify the files `custom-css.ts` and `theme.ts` for styling adjustments.
4. Replace logo files (e.g., `logo.png`) and user icon files (e.g., `user-icon.png`), and update their dimensions in the `theme.ts` file.

## How to Use the Business Component Library in Container (Market Specific) App

1. Initialize a React Native project. Follow the steps [here](https://reactnative.dev/docs/getting-started-without-a-framework).
2. Install the Business Component Library:
   ```bash
   npm install github:rachanapawar/Circles_Library#1.0.0
   ```
3. Create a `.env` file at the root location and specify `API_URL` and `API_PROTOCOL`.

   Example `.env` file:
   ```env
   API_PROTOCOL=https
   API_URL=anp-app.annapurna-cxos.tech
   ```

4. Setup Redux store for API data. Example `store.ts`:
   ```typescript
   import { configureStore } from '@reduxjs/toolkit';
   import {
     languageSelectionReducer,
     planSelectionReducer,
     authReducer,
     numberSelectionReducer,
   } from 'circles-library';
   import themeReducer from './theme-slice';
   import { useSelector } from 'react-redux';

   export const store = configureStore({
     reducer: {
       auth: authReducer,
       planSelection: planSelectionReducer,
       languageSelection: languageSelectionReducer,
       numberSelection: numberSelectionReducer,
       theme: themeReducer,
     },
   });

   export type RootState = ReturnType<typeof store.getState>;
   export const useAppSelector = useSelector.withTypes<RootState>();
   ```

5. Import and use components such as `Header`, `PlanSelection`, `NumberSelection`, and `ProtectedRoute` from the library.

      Setup react navigation for components PlanSelection and NumberSelection imported from the library. 

      Import `ProtectedRoute` from the library and use it to protect number APIs with authentication in `NumberSelection.tsx`.  
      `ProtectedRoute`can be used to protect APIs in any business component.
      To use it, pass the component as prop - `component ` in `ProtectedRoute`. Refer the `App.tsx` for example. 
      
      Initialize the i18n setup by importing `initI18next` function from the library.  

   Example `App.tsx`:
   ```typescript
   import { Suspense } from 'react';
   import { SafeAreaView, StyleSheet, Text } from 'react-native';
   import { NavigationContainer } from '@react-navigation/native';
   import { createNativeStackNavigator } from '@react-navigation/native-stack';
   import { Provider } from 'react-redux';
   import { initI18next, NumberSelection, PlanSelection, Header, ProtectedRoute } from 'circles-library';
   import { store } from './store';
   import { marketConfig } from './market-configs/component';
   import marketLogo from './market-configs/logo.png';
   import marketUserIcon from './market-configs/user-icon.png';

   initI18next(marketConfig);

   const Stack = createNativeStackNavigator();

   export const App = () => {
     return (
       <Suspense fallback={<Text>Loading...</Text>}>
         <Provider store={store}>
           <SafeAreaView style={styles.container}>
             <Header marketConfig={marketConfig} marketLogo={marketLogo} marketUserIcon={marketUserIcon} />
             <NavigationContainer>
               <Stack.Navigator>
                 <Stack.Screen
                   name="Plan"
                   options={{ title: 'Plan Selection', headerShown: false }}
                   component={(props) => (
                     <PlanSelection {...props} marketConfig={marketConfig} previousRoute={null} nextRoute="Number" />
                   )}
                 />
                 <Stack.Screen
                   name="Number"
                   options={{ title: 'Number Selection', headerShown: false }}
                   component={(props) => (
                     <ProtectedRoute
                       {...props}
                       component={NumberSelection}
                       marketConfig={marketConfig}
                       marketLogo={marketLogo}
                       previousRoute="Plan"
                       nextRoute={null}
                     />
                   )}
                 />
               </Stack.Navigator>
             </NavigationContainer>
           </SafeAreaView>
         </Provider>
       </Suspense>
     );
   };

   const styles = StyleSheet.create({
     container: {
       flex: 1,
     },
   });
   ```

## Steps to Create a New Variation of an Existing Component

(refer Business Component Library code) 

1. Go to the `variations` folder of dessired component for which you want to add a new variation (e.g., `planSelectionVariations`) and Create the new variation as a React component.
2. Update the starting file (e.g., `PlanSelection.tsx`) to add the new variation in the `variation` constant.
3. Specify the variation name as the value of property `variation` in file 	`component.ts` under folder `market-configs`. E.g. `PlanSelectionVerticalStackedCard` is specified for `marketConfig.components.planSelection.variation`.
4. Do the data binding for the variation created above. E.g. 	`PlanSelectionVeritcalStackedCard` does data binding for displaying 	products (prepaid and postpaid) using `renderPlans` function. 

## Steps to Create a New Business Component

(refer Business Component Library code) 

1. Create a folder for the new business component (e.g., `PlanSelection` in the `src` folder).
2. Create the first component for the business component (e.g., `PlanSelection.tsx`).
3. This should read the market config and pick the right variation. e.g. 	`planSelection` picks one out of 3 available “plan selection variations” based on the value provided in market config. 
4. For navigation, use `nextRoute` and `previousRoute` prop in the business component. See `PlanSelection.tsx` for example. 
5. Add redux slice to create action and reducers for the redux store to store API calls data. Refer file `planSelectionSlice.ts`. 

## Data Sharing Between Components

(refer Business Component Library code) 

We use Redux Toolkit to manage data sharing between components. For example:

- `PlanSelection.tsx` uses `dispatch(chooseProduct(product))` to save the data - `product` in the redux store and `NumberSelection.tsx` uses `useSelector(selectChosenProduct)` to read the data - `product` from the redux store.

## Handling API Calls for Business Components

(refer Business Component Library code) 

API calls are managed using Redux Async Actions. This action uses `fetch` to make API calls and the API response is stored in Redux Store. For example:

- `NumberSelection.tsx` is using `dispatch(fetchNumbers(configOptions))` to fetch numbers via API call.Base url is mentioned in the `.env` file located at root folder.

The base URL is defined in the `.env` file.

## Navigation Management Among Business Components

Navigation is handled via the React Navigation library. Refer to `App.tsx` in the `Circles_App` to view navigation setup.
