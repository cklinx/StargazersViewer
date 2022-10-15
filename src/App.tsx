import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {NetworkProvider} from '@stargazers/providers/network-provider';
import {RootNavigator} from '@stargazers/navigators';

const App = () => {
  return (
    <SafeAreaProvider>
      <NetworkProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </NetworkProvider>
    </SafeAreaProvider>
  );
};

export default App;
