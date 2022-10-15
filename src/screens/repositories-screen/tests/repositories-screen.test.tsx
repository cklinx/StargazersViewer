import React from 'react';

import renderer from 'react-test-renderer';
import {RepositoriesScreen} from '../repositories-screen';
import {render} from '@testing-library/react-native';
import {FlatList} from 'react-native';
import {RepositoryCell} from '@stargazers/screens/repositories-screen/repository-cell';

jest.mock('react-native-vector-icons/Feather', () => 'Feather');
const goBack = jest.fn();
const navigate = jest.fn();
const setOptions = jest.fn();
const addListener = jest.fn();

const mockedNavigate = jest.fn();
type AppRepo = {
  id: number;
  name: string;
  updated_at: Date;
};
const mockRepositories: AppRepo[] = [
  {
    id: 1,
    name: 'Repo 1',
    updated_at: new Date(500000000000),
  },
  {
    id: 2,
    name: 'Repo 2',
    updated_at: new Date(500000000000),
  },
  {
    id: 3,
    name: 'Repo 3',
    updated_at: new Date(500000000000),
  },
];
const mockRoute = {
  params: {
    owner: 'test',
    repositories: mockRepositories,
  },
};
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
      setOptions: jest.fn(),
    }),
  };
});
describe('RepositoriesScreen', () => {
  it('should render correctly', () => {
    const {toJSON} = renderer.create(
      <RepositoriesScreen
        //@ts-ignore
        navigation={{goBack, navigate, setOptions, addListener}}
        //@ts-ignore
        route={mockRoute}
      />,
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should render exact cell as per source', () => {
    const componentTree = render(
      <RepositoriesScreen
        //@ts-ignore
        navigation={{goBack, navigate, setOptions, addListener}}
        //@ts-ignore
        route={mockRoute}
      />,
    );

    expect(componentTree.UNSAFE_getAllByType(FlatList).length).toBe(1);
    expect(componentTree.UNSAFE_getAllByType(RepositoryCell).length).toBe(mockRepositories.length);
  });
});
