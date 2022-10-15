import React from 'react';

import renderer from 'react-test-renderer';
import {StargazersScreen} from '../stargazers-screen';
import {render} from '@testing-library/react-native';
import {FlatList} from 'react-native';
import {StargazersCell} from '@stargazers/screens/stargazers-screen/stargazers-cell';

jest.mock('react-native-vector-icons/Feather', () => 'Feather');
const goBack = jest.fn();
const navigate = jest.fn();
const setOptions = jest.fn();
const addListener = jest.fn();
type AppStarGazer = {
  id: number;
  avatarImage: string;
  login: string;
  url: string;
};
const mockStargazers: AppStarGazer[] = [
  {
    id: 1,
    avatarImage: 'test',
    login: 'test',
    url: 'test',
  },
  {
    id: 2,
    avatarImage: 'test',
    login: 'test',
    url: 'test',
  },
  {
    id: 3,
    avatarImage: 'test',
    login: 'test',
    url: 'test',
  },
];
const mockRoute = {
  params: {
    owner: 'test',
    repository: {name: 'test'},
    stargazers: mockStargazers,
  },
};
const mockedNavigate = jest.fn();

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
describe('StargazersScreen', () => {
  it('should render correctly', () => {
    const {toJSON} = renderer.create(
      <StargazersScreen
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
      <StargazersScreen
        //@ts-ignore
        navigation={{goBack, navigate, setOptions, addListener}}
        //@ts-ignore
        route={mockRoute}
      />,
    );

    expect(componentTree.UNSAFE_getAllByType(FlatList).length).toBe(1);
    expect(componentTree.UNSAFE_getAllByType(StargazersCell).length).toBe(mockStargazers.length);
  });
});
