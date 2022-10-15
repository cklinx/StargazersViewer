import {ListRenderItemInfo} from 'react-native';
import {StargazersItem} from '@stargazers/services/user-service/user-service.types';

export interface StargazersCellProps extends ListRenderItemInfo<StargazersItem> {
  onStargazerClick: (item: StargazersItem) => void;
}
