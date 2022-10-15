import React, {useEffect, useState} from 'react';

import useColorScheme from '../../hooks/useColorScheme';
import {FlatList, View, Text, Platform, RefreshControl, TextInput} from 'react-native';
import {getStargazers, getUserRepositories} from '@stargazers/services/user-service/user-service';
import {RepositoryItem} from '@stargazers/services/user-service/user-service.types';
import {styles} from './repositories-screen.styles';
import {RepositoriesScreenProps} from '@stargazers/navigators/navigator.types';
import {Colors, GlobalStyles} from '@stargazers/theme';
import {RepositoryCell} from '@stargazers/screens/repositories-screen/repository-cell';
import {useNavigation} from '@react-navigation/native';

export const RepositoriesScreen = ({route}: RepositoriesScreenProps) => {

  const colorScheme = useColorScheme();
  const owner: string = route.params.owner;
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const [repositories, setRepositories] = useState<RepositoryItem[]>(route.params.repositories);
  const [filteredRepositories, setFilteredRepositories] = useState<RepositoryItem[]>(
    route.params.repositories,
  );

  useEffect(() => {
    navigation.setOptions({
      title: owner,
    });
  }, [owner]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getUserRepositories(owner).then(
      response => {
        setRepositories(response.data);
        setRefreshing(false);
      },
      () => {
        setRefreshing(false);
      },
    );
  }, []);

  const searchFilterFunction = (text: string) => {
    if (text) {
      const newData = repositories.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredRepositories(newData);
    } else {
      setFilteredRepositories(repositories);
    }
  };

  const fetchStargazers = (item: RepositoryItem) => {
    getStargazers(owner, item.name).then(
      response => {
        //@ts-ignore
        navigation.navigate('StargazersScreen', {
          owner: owner,
          repository: item,
          stargazers: response.data,
        });
      },
      () => {
        console.log('error');
      },
    );
  };

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
          placeholder="Search repo.."
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
        data={filteredRepositories}
        keyExtractor={item => item.id.toString()}
        renderItem={props => {
          return <RepositoryCell {...props} onRepoClick={fetchStargazers} />;
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
                {filteredRepositories.length === 1
                  ? filteredRepositories.length + ' repository'
                  : filteredRepositories.length + ' repositories'}
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
                No Repositories
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};
