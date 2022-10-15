import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Platform, Animated, Text} from 'react-native';
import useColorScheme from '../../hooks/useColorScheme';
import {OwnerSuggestionType} from '@stargazers/screens/home-screen/home-screen.types';
import Easing from '@stargazers/utils/easing';
import {Colors} from '@stargazers/theme';
import {styles} from './home-screen.styles';
import {AutocompleteDropdown, AutocompleteDropdownRef} from 'react-native-autocomplete-dropdown';
// @ts-ignore
import Feather from 'react-native-vector-icons/Feather';
import {SCREEN_HEIGHT} from '@stargazers/utils/dimensions';
import {getUserRepositories, searchUsers} from '@stargazers/services/user-service/user-service';
import {Background, Button, InfoTextLayout} from '@stargazers/components';
import {HomeScreenProps} from '@stargazers/navigators/navigator.types';

export const HomeScreen: (props: HomeScreenProps) => JSX.Element = ({navigation}) => {

  const colorScheme = useColorScheme();

  const [loading, setLoading] = useState(false);
  const [suggestionsList, setSuggestionsList] = useState<Array<OwnerSuggestionType> | undefined>();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const dropdownController = useRef<AutocompleteDropdownRef | null>(null);
  const searchRef = useRef(null);

  const getSuggestions = useCallback(async (q: string) => {
    const filterToken = q;
    if (typeof q !== 'string' || q.length < 3) {
      setSuggestionsList(undefined);
      return;
    }
    setLoading(true);
    const items = await searchUsers(q);
    const suggestions: OwnerSuggestionType[] = items.data.items
      .filter(item => item.login.includes(filterToken))
      .map(item => ({
        id: item.id.toString(),
        title: item.login,
      }));
    setSuggestionsList(suggestions);
    setLoading(false);
  }, []);

  const onClearPress = useCallback(() => {
    setSelectedUser(null);
    setSuggestionsList(undefined);
  }, []);

  const onOpenSuggestionsList = useCallback((isOpened: boolean) => {}, []);

  // Animations Ref
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const transAnim = useRef(new Animated.Value(180)).current;
  const transAnimFooter = useRef(new Animated.Value(0)).current;

  const setLoadingState = useCallback(() => {
    Animated.timing(transAnimFooter, {
      toValue: 200,
      useNativeDriver: true,
      easing: Easing.ease,
      duration: 500,
    }).start();
    Animated.timing(fadeAnim, {
      toValue: 0,
      useNativeDriver: true,
      easing: Easing.easeInOutCirc,
      duration: 1200,
    }).start();
    Animated.timing(transAnim, {
      toValue: 800,
      useNativeDriver: true,
      easing: Easing.easeInOutCirc,
      duration: 1300,
    }).start();
  }, [fadeAnim, transAnim, transAnimFooter]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('scren focus');
      // Start login animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        useNativeDriver: true,
        easing: Easing.easeInCirc,
        duration: 2200,
      }).start();
      Animated.timing(transAnim, {
        toValue: 0,
        useNativeDriver: true,
        easing: Easing.easeInOutCirc,
        duration: 2300,
      }).start();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchRepositories = () => {
    setLoadingState();
    getUserRepositories(selectedUser!).then(
      response => {
        navigation.navigate('RepositoriesScreen', {
          owner: selectedUser!,
          repositories: response.data,
        });
      },
      () => {
        console.log('error');
      },
    );
  };

  return (
    <>
      <Background>
        <Animated.View
          style={{
            ...styles.footer,
            height: 80,
            transform: [
              {
                translateY: transAnimFooter,
              },
            ],
          }}>
          <Text
            style={{
              ...styles.footerText,
              color: Colors[colorScheme].tint,
            }}>
            {'Stargazers Viewer'}
          </Text>
        </Animated.View>

        <Animated.View
          style={{
            ...styles.panel,
            backgroundColor: Colors[colorScheme].background,
            borderColor: Colors[colorScheme].buttonEnabledColor,
            shadowColor: Colors[colorScheme].secondary,
            opacity: fadeAnim,
            transform: [
              {
                translateY: transAnim,
              },
            ],
          }}>
          <InfoTextLayout
            text={'Type a GitHub user below and select from the list to see his repositories.'}
          />

          <AutocompleteDropdown
            // @ts-ignore
            ref={searchRef}
            controller={controller => {
              dropdownController.current = controller;
            }}
            direction={Platform.select({ios: 'down'})}
            dataSet={suggestionsList}
            onChangeText={getSuggestions}
            onSelectItem={item => {
              item && setSelectedUser(item.title);
            }}
            debounce={600}
            suggestionsListMaxHeight={SCREEN_HEIGHT * 0.4}
            onClear={onClearPress}
            onOpenSuggestionsList={onOpenSuggestionsList}
            loading={loading}
            useFilter={false}
            textInputProps={{
              placeholder: 'Type GitHub user...',
              autoCorrect: false,
              autoCapitalize: 'none',
              style: {
                ...styles.autocompleteTextInput,
              },
            }}
            rightButtonsContainerStyle={styles.rightButtonsContainerStyle}
            inputContainerStyle={styles.inputContainerStyle}
            suggestionsListContainerStyle={{
              ...styles.suggestionContainerStyle,
              backgroundColor: Colors[colorScheme].secondary,
            }}
            containerStyle={styles.autocompleteContainerStyle}
            EmptyResultComponent={
              (
                <Text
                  style={{
                    ...styles.emptyListPlaceholder,
                  }}>
                  No user found
                </Text>
              ) as React.ReactElement<any, any>
            }
            renderItem={item => (
              <Text
                style={{
                  ...styles.autocompleteItemText,
                }}>
                {item.title}
              </Text>
            )}
            ChevronIconComponent={<Feather name="chevron-down" size={20} color="#fff" />}
            ClearIconComponent={<Feather name="x-circle" size={18} color="#fff" />}
            inputHeight={50}
            showChevron={!!selectedUser}
            closeOnBlur={false}
          />

          <Button
            style={{
              ...styles.continueButton,
              backgroundColor:
                selectedUser !== null
                  ? Colors[colorScheme].buttonEnabledBg
                  : Colors[colorScheme].buttonDisabledBg,
              borderColor:
                selectedUser !== null
                  ? Colors[colorScheme].buttonEnabledColor
                  : Colors[colorScheme].buttonDisabledColor,
            }}
            onPress={fetchRepositories}
            disabled={selectedUser === null}>
            <Text
              style={{
                ...styles.continueButtonText,
                color:
                  selectedUser !== null
                    ? Colors[colorScheme].buttonEnabledColor
                    : Colors[colorScheme].buttonDisabledColor,
              }}>
              Continue
            </Text>
          </Button>
        </Animated.View>
      </Background>
    </>
  );
};
