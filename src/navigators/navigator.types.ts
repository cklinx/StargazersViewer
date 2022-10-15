import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RepositoryItem, StargazersItem} from '@stargazers/services/user-service/user-service.types';

export type RootStackParamList = {
  HomeScreen: undefined;
  RepositoriesScreen: {
    owner: string;
    repositories: RepositoryItem[];
  };
  StargazersScreen: {
    owner: string;
    repository: RepositoryItem;
    stargazers: StargazersItem[];
  };
};
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;
export type RepositoriesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'RepositoriesScreen'
>;
export type StargazersScreenProps = NativeStackScreenProps<RootStackParamList, 'StargazersScreen'>;
