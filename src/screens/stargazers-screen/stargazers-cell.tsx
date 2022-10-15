import React from 'react';
import {Image, Text, TouchableHighlight, View} from 'react-native';
import {Colors} from '@stargazers/theme';
import {styles} from '@stargazers/screens/repositories-screen/repository-cell.styles';
import useColorScheme from '@stargazers/hooks/useColorScheme';
import {StargazersCellProps} from '@stargazers/screens/stargazers-screen/stargazers-screen.types';
import Icon from 'react-native-vector-icons/Feather';
import Formatter from '@stargazers/utils/formatter';

export const StargazersCell: React.FC<StargazersCellProps> = ({
  item,
  separators,
  onStargazerClick,
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
        onPress={() => onStargazerClick(item)}>
        <View style={styles.cellWrapper}>
          <View
            style={{
              ...styles.avatarWrapper,
              backgroundColor: Colors[colorScheme].background,
              borderColor: Colors[colorScheme].secondary,
            }}>
            <Image
              source={{
                uri: item.avatar_url,
              }}
              resizeMode={'cover'}
              style={styles.avatarImage}
            />
          </View>
          <View style={styles.textsContainer}>
            <Text
              style={{
                ...styles.productName,
                color: Colors[colorScheme].tint,
              }}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.login}
            </Text>

            <View style={styles.updatedAtWrapper}>
              <Text
                style={{
                  ...styles.updatedAt,
                  color: Colors[colorScheme].tint,
                }}>
                {Formatter.getStargazerPublicURL(item.url)}
              </Text>
            </View>
          </View>
          <View style={styles.rightColumn}>
            <Icon name={'link-2'} size={20} color={Colors[colorScheme].tint} />
          </View>
        </View>
      </TouchableHighlight>
    </>
  );
};
