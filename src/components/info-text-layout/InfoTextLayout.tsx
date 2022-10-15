import React from 'react';
import {StyleSheet, Text, View, ViewProps} from 'react-native';
import {styles} from './info-text-layout.presets';
import useColorScheme from '@stargazers/hooks/useColorScheme';
import {Colors} from '@stargazers/theme';
import Icon from 'react-native-vector-icons/Feather';

export const InfoTextLayout: React.FC<
  {
    text: string;
  } & Pick<ViewProps, 'style'>
> = ({text, style}) => {
  const colorScheme = useColorScheme();
  return (
    <View
      key={text}
      style={StyleSheet.flatten([
        styles.infoRoot,
        {backgroundColor: Colors[colorScheme].infoTextBackground},
        style,
      ])}>
      <Icon name={'alert-circle'} size={18} color={Colors[colorScheme].infoTextColor} />
      <Text
        style={{
          ...styles.infoText,
          color: Colors[colorScheme].infoTextColor,
        }}>
        {text}
      </Text>
    </View>
  );
};
