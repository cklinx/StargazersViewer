import React from 'react';

import renderer from 'react-test-renderer';
import {InfoTextLayout} from './InfoTextLayout';

jest.mock('react-native-vector-icons/Feather', () => 'Feather');
describe('InfoText', () => {
  it('should render correctly', () => {
    const {toJSON} = renderer.create(<InfoTextLayout text="Text" />);

    expect(toJSON()).toMatchSnapshot();
  });
});
