import {ListRenderItemInfo} from 'react-native';
import {RepositoryItem} from '@stargazers/services/user-service/user-service.types';

export interface RepositoryCellProps extends ListRenderItemInfo<RepositoryItem> {
  onRepoClick: (item: RepositoryItem) => void;
}
