import * as React from 'react';
import PropTypes from 'prop-types';
import Svg, {Path} from 'react-native-svg';
import {Appearance, TextStyle} from 'react-native';
import {Colors} from '@stargazers/theme';
const colorScheme = Appearance.getColorScheme();
type Props = {
  active: boolean;
  size: number;
  style?: TextStyle | undefined;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SvgArrowRight = ({active, size, style}: Props) => (
  <Svg height={size} width={size} viewBox="0 0 24 24" style={style}>
    <Path
      d="M15.7 11.3l-6-6c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l5.3 5.3-5.3 5.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3s.5-.1.7-.3l6-6c.4-.4.4-1 0-1.4z"
      fill={style?.color || Colors[colorScheme!].tint}
    />
  </Svg>
);

SvgArrowRight.defaultProps = {
  active: true,
  size: 24,
};

SvgArrowRight.propTypes = {
  // optional
  active: PropTypes.bool,
  size: PropTypes.number,
};

export default React.memo(SvgArrowRight);
