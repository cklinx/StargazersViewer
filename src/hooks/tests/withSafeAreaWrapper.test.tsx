// @ts-nocheck
import React from 'react';
import {Text, View} from 'react-native';
import renderer from 'react-test-renderer';
import {default as withSafeArea} from '../withSafeAreaWrapper';
const mockComponent = jest.fn(() => <Text accessibilityLabel={'test'}></Text>);
const Component = withSafeArea(mockComponent);

describe('withSafeArea', () => {
  it('should render correctly', () => {
    const {root, container} = renderer.create(<Component />);

    expect(container).toMatchSnapshot();
    const text = root.findByType(Text).props;
    expect(text.accessibilityLabel).toEqual('test');
  });
});
