import useColorScheme from '@stargazers/hooks/useColorScheme';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Colors, Fonts} from '@stargazers/theme';
import React from 'react';
import {HomeScreen} from '@stargazers/screens/home-screen';
import {RepositoriesScreen} from '@stargazers/screens/repositories-screen';
import {RootStackParamList} from '@stargazers/navigators/navigator.types';
import {StargazersScreen} from '@stargazers/screens/stargazers-screen';

export default function RootNavigator() {
  const colorScheme = useColorScheme();
  const AppStack = createNativeStackNavigator<RootStackParamList>();

  //@ts-ignore
  const navigationBarOptions = {
    headerShown: false,
    headerStyle: {
      backgroundColor: Colors[colorScheme].background,
    },
    headerTitleStyle: {
      fontFamily: Fonts.helveticaMedium,
    },
    headerTintColor: Colors[colorScheme].tint,
  };

  const RootStack: React.FC = () => (
    <AppStack.Navigator initialRouteName={'HomeScreen'} screenOptions={{title: 'Search'}}>
      <AppStack.Group>
        <AppStack.Screen name="HomeScreen" component={HomeScreen} options={navigationBarOptions} />
      </AppStack.Group>

      <AppStack.Group>
        <AppStack.Screen
          name="RepositoriesScreen"
          component={RepositoriesScreen}
          options={{
            ...navigationBarOptions,
            headerShown: true,
          }}
        />
      </AppStack.Group>
      <AppStack.Group>
        <AppStack.Screen
          name="StargazersScreen"
          component={StargazersScreen}
          options={{
            ...navigationBarOptions,
            headerShown: true,
          }}
        />
      </AppStack.Group>
    </AppStack.Navigator>
  );

  return <RootStack />;
}
