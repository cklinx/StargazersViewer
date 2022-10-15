import React from 'react';
import {Text} from 'react-native';
import {fireEvent, render} from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import {Button} from './Button';
const mockLabel = 'Test label';
const mockOnPress = jest.fn();
const setup = (overrideOrAddProps?: Partial<React.ComponentProps<typeof Button>>) =>
  render(<Button accessibilityLabel={mockLabel} onPress={mockOnPress} {...overrideOrAddProps} />);

describe('Button', () => {
  it('should render correctly', () => {
    const {toJSON} = renderer.create(
      <Button>
        <Text>text</Text>
      </Button>,
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should handle being pressed', () => {
    const {getByA11yLabel} = setup();

    fireEvent.press(getByA11yLabel(mockLabel));

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
