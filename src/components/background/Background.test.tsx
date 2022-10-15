import React from 'react';
import {View} from 'react-native';
import renderer from 'react-test-renderer';
import {Background} from './Background';

describe('Background', () => {
  it('should render correctly', () => {
    const {toJSON} = renderer.create(
      <Background>
        <View></View>
      </Background>,
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
