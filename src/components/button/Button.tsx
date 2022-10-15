import React, {useState} from 'react';
import {Pressable as RNPressable, PressableProps, ViewStyle, Animated} from 'react-native';

const AnimatedPressable = Animated.createAnimatedComponent(RNPressable);

interface Props extends PressableProps {
  children?: React.ReactNode;
  scaleValue?: number;
  friction?: number;
  tension?: number;
  style?: ViewStyle | ViewStyle[];
}

export const Button = ({children, scaleValue, friction, tension, style, ...restProps}: Props) => {
  const [scale] = useState(new Animated.Value(1));

  const animatedStyles: ViewStyle = {
    transform: [
      {
        //@ts-ignore
        scale,
      },
    ],
  };

  const shrinkView = () => {
    Animated.spring(scale, {
      toValue: scaleValue ? scaleValue : 0.9,
      useNativeDriver: true,
      friction: 7,
      tension: 40,
    }).start();
  };

  const scaleView = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      friction: friction ? friction : 7,
      tension: tension ? tension : 40,
    }).start();
  };

  return (
    <AnimatedPressable
      {...restProps}
      style={[animatedStyles, style]}
      onPressIn={() => shrinkView()}
      onPressOut={() => scaleView()}>
      {children}
    </AnimatedPressable>
  );
};
