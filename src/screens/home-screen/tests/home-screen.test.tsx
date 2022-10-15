import React from 'react';

import renderer, {act} from 'react-test-renderer';
import {HomeScreen} from '../home-screen';
import {Button} from '@stargazers/components';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';

jest.mock('react-native-vector-icons/Feather', () => 'Feather');
const goBack = jest.fn();
const navigate = jest.fn();
const setOptions = jest.fn();
const addListener = jest.fn();

jest.mock('react-native-autocomplete-dropdown', () => ({
  AutocompleteDropdown: 'AutocompleteDropdown',
}));

describe('HomeScreen', () => {
  it('should render correctly', () => {
    const {toJSON} = renderer.create(
      //@ts-ignore
      <HomeScreen navigation={{goBack, navigate, setOptions, addListener}} />,
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('continue button should be disabled', () => {
    const {root} = renderer.create(
      //@ts-ignore
      <HomeScreen navigation={{goBack, navigate, setOptions, addListener}} />,
    );

    const buttonProps = root.findByType(Button).props;
    expect(buttonProps.disabled).toBeTruthy();
  });

  it('continue button should be enabled if user selected', () => {
    const {root} = renderer.create(
      //@ts-ignore
      <HomeScreen navigation={{goBack, navigate, setOptions, addListener}} />,
    );

    const autocompleteProps = root.findByType(AutocompleteDropdown).props;
    act(() => {
      autocompleteProps.onSelectItem({
        title: '4test',
      });
    });
    const buttonProps = root.findByType(Button).props;
    expect(buttonProps.disabled).toBeFalsy();
  });
});
