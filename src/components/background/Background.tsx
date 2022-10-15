import React, {memo, ReactNode} from 'react';
import {ImageBackground, StyleSheet, KeyboardAvoidingView} from 'react-native';
import useColorScheme from '@stargazers/hooks/useColorScheme';

interface BackgroundProps {
  children: ReactNode;
  style?: {};
}

const BackgroundComponent = ({children, style}: BackgroundProps) => {
  const colorScheme = useColorScheme();
  const src =
    colorScheme === 'dark'
      ? require('../../assets/splashscreen/splashscreen-dark.png')
      : require('../../assets/splashscreen/splashscreen.png');
  return (
    <ImageBackground
      source={src}
      resizeMode="cover"
      style={{
        ...styles.background,
        ...style,
      }}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: '100%',
    width: '100%',
    position: 'relative',
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 0,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const Background = memo(BackgroundComponent);
