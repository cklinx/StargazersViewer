import {StyleSheet} from 'react-native';
import {default as SPACING} from '@stargazers/theme/spacing';
import {Fonts} from '@stargazers/theme';

export const styles = StyleSheet.create({
  infoRoot: {
    width: '100%',
    flexDirection: 'row',
    padding: SPACING.s040,
    borderRadius: SPACING.s030,
    marginTop: SPACING.s030,
  },
  infoText: {
    marginStart: SPACING.s020,
    marginEnd: SPACING.s040,
    color: '#FFFFFF',
    fontFamily: Fonts.helveticaMedium,
    fontSize: 16,
  },
});
