import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Animated, Platform } from 'react-native'
import Text from './../../../components/atoms/text'
import GroupImage from '../image/group'
import Loading from './../../../components/atoms/loading'
import { useNavigation } from '@react-navigation/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { button } from './../../../styles/color'
import { useDispatch } from 'react-redux'
import { setMeeting } from '../../../../src/reducers/meeting/actions'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  close: {
    backgroundColor: '#A0A3BD',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
  }
})

const ConnectingVideo = ({ participants = [], callEnded = false }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const widthAnimation = useRef(new Animated.Value(0)).current;
  const [enable, setEnable] = useState(false);

  useEffect(() => {
    if (callEnded) {
      widthAnimation.setValue(1);
      Animated.timing(
        widthAnimation,
        {
          toValue: 200,
          duration: 3000,
          useNativeDriver: true,
        }
      ).start(() => setEnable(true));
    }
  }, [callEnded]);

  return (
    <View style={styles.container}>
      {
        !callEnded && (
          <GroupImage
            participants={participants}
            size={80}
            textSize={24}
          />
        )
      }
      <View
        style={{
          alignItems: 'flex-end',
          flexDirection: 'row',
          marginTop: 5,
        }}
      >
        {
          callEnded ? (
            <Text
              size={24}
              color='white'
            >
              Call ended
            </Text>
          ) : (
            <>
              <Text
                size={14}
                color='white'
              >
                Connecting
              </Text>
              <Loading
                size={2}
                space={1}
                numberOfDots={3}
                color={'white'}
                speed={3000}
                style={{ marginBottom: 4, marginLeft: 1 }}
              />
            </>
          )
        }
      </View>
      {
        callEnded && (
          <View style={{ position: 'absolute', bottom: 80 }}>
            <TouchableOpacity disabled={!enable} onPress={() => { dispatch(setMeeting(null)) }}>
              <View style={[styles.close, enable && { backgroundColor: button.info }]}>
                <Animated.View style={[{
                  position: 'absolute',
                  height: 150,
                  width: 1,
                  backgroundColor: button.info,
                  zIndex: -1,
                  ...Platform.select({
                    'web': {
                      marginTop: -50,
                      marginLeft: -50
                    }
                  })
                }, {
                  transform: [
                    {
                      scaleX: widthAnimation
                    },
                  ],
                }]} />
                <Text
                  color={'white'}
                  size={18}
                >
                  Close
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )
      }
    </View>
  )
}

export default ConnectingVideo
