import React, { FC } from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Text from '@components/atoms/text'
import { text, primaryColor } from 'src/styles/color';
import { CloseIcon } from '@components/atoms/icon';
import ProfileImage from '@components/atoms/image/profile'
import GroupImage from '@components/molecules/image/group';
import IParticipants from 'src/interfaces/IParticipants';
import lodash from 'lodash';
import {fontValue} from "../../../utils/fontValue";

const imageSize = 42;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    alignItems: 'center',
    width: fontValue(imageSize + 10),
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: imageSize,
    width: imageSize,
    borderRadius: imageSize,
    backgroundColor: primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    paddingLeft: 10
  },
  channelInfo: {
    paddingBottom: 3,
  },
  message: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  floating: {
    position: 'absolute',
    zIndex: 9,
    right: 3,
    top: 0,
  },
  button: {
    height: fontValue(18),
    width: fontValue(18),
    borderRadius: fontValue(18),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
})

interface Props {
  image?: string;
  name?: string;
  contact?: string;
  onPress?: any;
  data?: any;
  isGroup?: boolean,
  [x: string]: any;
}

const SelectedItem: FC<Props> = ({
  image = '',
  name = '',
  contact = '',
  onPress = () => {},
  data = {},
  isGroup = false,
  ...otherProps
}) => {
  const getName = (data:any) => {
    let result = '';

    if (isGroup) {
      if (data.name) {
        result += data.name;
      } else {
        lodash.map(data.participants, (participant:IParticipants) => {
          let participantName = '';

          if (participant.title) participantName += participant.title + ' ';
          participantName += participant.firstName;

          result += participantName + ',';
        });
      }
    } else {
      if (data.title) result += data.title + ' ';
      if (data.name) result += data.name;
      if (data.suffix) result += ', ' + data.suffix;
    }

    return result;
  }

  return (
    <View style={[styles.container]} {...otherProps}>
      <View style={styles.floating}>
        <TouchableOpacity onPress={onPress}>
          <View style={[styles.button, styles.shadow]}>
            <CloseIcon
              type={'md-close'}
              color={text.default}
              size={fontValue(14)}
            />
          </View>
        </TouchableOpacity>
      </View>
      {
        !isGroup ? (
          <ProfileImage
            image={image}
            name={name}
            size={imageSize}
            textSize={14}
          />
        ) : (
          <GroupImage
            participants={data.participants}
            size={imageSize}
            textSize={14}
          />
        )
      }
      <Text
        size={10}
        numberOfLines={1}
        color={text.default}
      >
        {getName(data)}
      </Text>
    </View>
  )
}

export default SelectedItem
