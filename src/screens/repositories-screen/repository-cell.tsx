import React from 'react';
import {Image, Text, TouchableHighlight, View} from 'react-native';
import {Colors} from '@stargazers/theme';
import {styles} from '@stargazers/screens/repositories-screen/repository-cell.styles';
import SvgArrowRight from '@stargazers/assets/Svg.ArrowRight';
import moment from 'moment';
import useColorScheme from '@stargazers/hooks/useColorScheme';
import {RepositoryCellProps} from '@stargazers/screens/repositories-screen/repositories-screen.types';

export const RepositoryCell: React.FC<RepositoryCellProps> = ({
  item,
  separators,
  onRepoClick,
}) => {
  const colorScheme = useColorScheme();

  return (
    <>
      <TouchableHighlight
        style={{
          ...styles.cell,
          borderBottomColor: Colors[colorScheme].cellBorderBottomColor,
          backgroundColor: Colors[colorScheme].background,
        }}
        underlayColor={Colors[colorScheme].cellHighlight}
        onShowUnderlay={separators.highlight}
        onHideUnderlay={separators.unhighlight}
        onPress={() => onRepoClick(item)}>
        <View style={styles.cellWrapper}>
          <View
            style={{
              ...styles.imageWrapper,
            }}>
            <Image
              source={
                colorScheme === 'dark'
                  ? require(`../../assets/repo-icon-dark.png`)
                  : require(`../../assets/repo-icon.png`)
              }
              style={{width: 24, height: 24, alignSelf: 'center', alignItems: 'center'}}
            />
          </View>
          <View style={styles.textsContainer}>
            <Text
              style={{
                ...styles.productName,
                color: Colors[colorScheme].tint,
              }}
              numberOfLines={2}
              ellipsizeMode="tail">
              {item.name}
            </Text>

            <View style={styles.updatedAtWrapper}>
              <Text
                style={{
                  ...styles.updatedAt,
                  color: Colors[colorScheme].tint,
                }}>
                {moment(item.updated_at).format('MMMM d')},{' '}
                <Text style={{fontWeight: 'bold'}}>{moment(item.updated_at).format('HH:mm')}</Text>
              </Text>
            </View>
            <View style={styles.counterRowsWrapper}>
              <Image
                source={
                  colorScheme === 'dark'
                    ? require(`../../assets/star-icon-dark.png`)
                    : require(`../../assets/star-icon.png`)
                }
                style={styles.starCounterImage}
              />
              <Text
                style={{
                  ...styles.starCounterText,
                  color: Colors[colorScheme].tint,
                }}>
                {item.stargazers_count}
              </Text>
            </View>
          </View>
          <View style={styles.rightColumn}>
            <SvgArrowRight
              size={20}
              style={{
                color: Colors[colorScheme].tint,
              }}
            />
          </View>
        </View>
      </TouchableHighlight>
    </>
  );
};
