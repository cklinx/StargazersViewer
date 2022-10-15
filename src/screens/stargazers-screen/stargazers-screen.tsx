import React, {useEffect, useState} from 'react';
import useColorScheme from '../../hooks/useColorScheme';
import {FlatList, View, Text, Platform, RefreshControl, TextInput, Linking} from 'react-native';
import {getStargazers} from '@stargazers/services/user-service/user-service';
import {StargazersItem} from '@stargazers/services/user-service/user-service.types';
import {styles} from './stargazers-screen.styles';
import {StargazersScreenProps} from '@stargazers/navigators/navigator.types';
import {Colors, GlobalStyles} from '@stargazers/theme';
import {StargazersCell} from '@stargazers/screens/stargazers-screen/stargazers-cell';
import Formatter from '@stargazers/utils/formatter';

export const StargazersScreen = ({route, navigation}: StargazersScreenProps) => {
  const colorScheme = useColorScheme();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const owner = route.params.owner;
  const repository = route.params.repository;

  const [stargazers, setStargazers] = useState<StargazersItem[]>(route.params.stargazers);
  const [filteredStargazers, setFilteredStargazers] = useState<StargazersItem[]>(
    route.params.stargazers,
  );

  useEffect(() => {
    navigation.setOptions({
      title: repository.name,
      headerBackTitle: 'Repos',
    });
  }, [repository]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getStargazers(owner, repository.name).then(
      response => {
        setStargazers(response.data);
        setRefreshing(false);
      },
      () => {
        setRefreshing(false);
      },
    );
  }, []);

  const searchFilterFunction = (text: string) => {
    if (text) {
      const newData = stargazers.filter(function (item) {
        const itemData = item.login ? item.login.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredStargazers(newData);
    } else {
      setFilteredStargazers(stargazers);
    }
  };

  const onStargazerClick = async (stargazer: StargazersItem) => {
    await Linking.openURL(Formatter.getStargazerPublicURL(stargazer.url));
  };

  // @ts-ignore
  return (
    <View
      style={{
        backgroundColor: Colors[colorScheme].background,
        flex: 1,
      }}>
      <View
        style={{
          ...styles.searchBarWrapper,
          backgroundColor: Colors[colorScheme].background,
        }}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={searchFilterFunction}
          placeholder="Search stargazer.."
          placeholderTextColor={Colors[colorScheme].infoTextColor}
          style={{
            ...styles.searchBarText,
            color: Colors[colorScheme].infoTextColor,
            backgroundColor: Colors[colorScheme].secondary,
          }}
        />
      </View>
      <FlatList
        //@ts-ignore
        ItemSeparatorComponent={
          Platform.OS !== 'android' &&
          (({highlighted}) => <View style={[styles.separator, highlighted && {marginLeft: 0}]} />)
        }
        removeClippedSubviews={true}
        style={styles.scrollView}
        data={filteredStargazers}
        keyExtractor={item => item.id.toString()}
        renderItem={props => {
          return <StargazersCell {...props} onStargazerClick={onStargazerClick} />;
        }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListHeaderComponent={() => {
          return (
            <View
              style={{
                ...styles.productCounterBar,
                backgroundColor: Colors[colorScheme].background,
              }}>
              <Text
                style={{
                  ...styles.productCountLabel,
                  color: Colors[colorScheme].secondary,
                }}>
                {filteredStargazers.length === 1
                  ? filteredStargazers.length + ' stargazer'
                  : filteredStargazers.length + ' stargazers'}
              </Text>
            </View>
          );
        }}
        stickyHeaderIndices={[0]}
        ListEmptyComponent={() => {
          return (
            <View style={GlobalStyles.emptyListWrapper}>
              <Text
                style={{
                  ...GlobalStyles.emptyListText,
                  color: Colors[colorScheme].tint,
                }}>
                no stargazer...yet
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};
