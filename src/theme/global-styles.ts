import {StyleSheet} from 'react-native';
import Fonts from './fonts';
import {SCREEN_HEIGHT} from '@stargazers/utils/dimensions';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  loading: {
    alignItems: 'center',
    marginTop: 34,
  },
  loadingText: {
    fontFamily: Fonts.helveticaMedium,
    marginBottom: 6,
  },
  emptyListWrapper: {
    paddingTop: SCREEN_HEIGHT / 4,
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    fontFamily: Fonts.semibold,
    fontSize: 26,
    textAlign: 'center',
    color: '#281d6c',
    maxWidth: '90%',
  },
});
