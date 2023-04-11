import React,{FC,useState} from 'react'
import {Dimensions,Image,Platform,StyleSheet,TouchableOpacity,View} from 'react-native'
import Text from '@components/atoms/text'
import lodash from 'lodash';
import {CheckIcon,NewFileIcon,NewMeetIcon,WriteIcon} from '@components/atoms/icon';
import {getChatTimeString,getFileSize, getTimerString} from 'src/utils/formatting'
import {bubble,button,primaryColor,text} from '@styles/color'
import ProfileImage from '@components/atoms/image/profile'
import NewDeleteIcon from '@components/atoms/icon/new-delete';
import {Regular, Regular500} from '@styles/font';
import IAttachment from 'src/interfaces/IAttachment';
import hairlineWidth=StyleSheet.hairlineWidth;
import IParticipants from 'src/interfaces/IParticipants';
import GroupImage from '../image/group';
import dayjs from 'dayjs';
import {fontValue} from "../../../utils/fontValue";

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  bubbleContainer: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bubble: {
    borderRadius: fontValue(6),
    padding: fontValue(5),
    paddingHorizontal: fontValue(10),
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      native: {
        paddingBottom: Platform.OS === 'ios' ? undefined : 1,
      },
      default: {
        paddingBottom:  undefined,
      }
    })

  },
  imageBubble: {
    marginRight: 2,
    marginTop: 2,
    width: width * 0.3,
    height: width * 0.3,
    backgroundColor: bubble.primary,
  },
  image: {
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: primaryColor,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seenContainer: {
    paddingTop: 3,
    paddingBottom: 10,
    flexDirection: 'row',
  },
  seenTimeContainer: {
    alignSelf: 'center',
    paddingHorizontal: 10,
    marginBottom: 5,
    marginTop: 10,
  },

  flipX: {
    transform: [
      {
        scaleX: -1
      }
    ]
  },
  hrText:{
    flex:1,
    paddingVertical: 20,
    alignSelf:'center',
    width:"100%",
    flexDirection:"row",
    justifyContent:"center"
  },
  border:{
    flex:1,
    backgroundColor:  "#D1D1D6",
    width:"100%",
    height:hairlineWidth,
    alignSelf:"center"
  },
  hrContent:{
    color:  "#2863D6",
    paddingHorizontal:20,
    textAlign:'center'
  },
  check: {
    borderRadius: fontValue(12),
    width: fontValue(12),
    height: fontValue(12),
    borderColor: text.info,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2,
    paddingLeft: 0.5,
    ...Platform.select({
      native: {
        paddingBottom: Platform.OS === 'ios' ? undefined : 1,
      },
      default: {
        paddingBottom:  undefined,
      }
    })
  },
  file: {
    borderColor: '#E5E5E5',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  imageFile: {
    width: width * 0.3,
    height: width * 0.3,
  },
  notif: {
    backgroundColor: '#C4C4C4',
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderRadius: 15,
    marginBottom: 5,
    marginTop: 5,
  },
  callAgainBtn: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: button.info,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
  }
})

interface Props {
  message?: string;
  messageType?: string;
  attachment?: IAttachment;
  sender?: any;
  isSender?: boolean;
  maxWidth?: any;
  style?: any;
  createdAt?: any;
  seenByOthers?: any;
  seenByEveryone?: boolean;
  showSeen?: boolean;
  showDate?: boolean;
  onLongPress?: any;
  deleted?: boolean;
  unSend?: boolean;
  edited?: boolean;
  system?: boolean;
  delivered?: boolean;
  onPreview?: any;
  meeting?: any;
  onCallAgain?: any;
  user?: any;
  [x: string]: any;
}

const ChatBubble:FC<Props> = ({
  message,
  messageType,
  attachment,
  sender = {},
  isSender = false,
  maxWidth = '60%',
  style,
  createdAt,
  seenByOthers = [],
  seenByEveryone = false,
  showSeen = false,
  isSeen = false,
  showDate = false,
  onLongPress,
  deleted = false,
  unSend = false,
  edited = false,
  system = false,
  delivered = false,
  onPreview = () => {},
  meeting = null,
  onCallAgain = () => {},
  user = {},
  ...otherProps
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const deletedOrUnsend = deleted || (unSend && isSender);

  const _getSenderName = () => {
    if (isSender) {
      return 'You';
    }
    let result = '';
    if (sender.title) result += sender.title + ' ';
    result += sender.firstName;
    return result;
  }

  const senderName = _getSenderName();

  const checkIfImage = (uri:any) => {
    if (uri && (uri.endsWith(".png") || uri.endsWith(".jpg") || uri.endsWith(".jpeg"))) return true;
    return false;
  };

  const renderTime = () => {
    return (showDetails || showDate) ? (
      <View style={styles.hrText}>
        <View style={styles.border}/>
        <Text style={[styles.hrContent, {color:  "#64748B",}]}>{getChatTimeString(createdAt)}</Text>
        <View style={styles.border}/>
      </View>
    ) : null;
  }

  const renderContent = () => {
    if (deletedOrUnsend) {
      return (
        <Text
          style={{ marginLeft: 5 }}
          size={14}
          color={'#979797'}
        >
          {
            (unSend && isSender) ?
            'Unsent for you'
            : `${senderName} deleted a message`
          }
        </Text>
      )
    } else if (!!attachment) {
      return (
        <View style={styles.file}>
          <NewFileIcon
            color={'#606A80'}
          />
          <View style={{ paddingHorizontal: 5, maxWidth: width * 0.3 }}>
            <Text
              size={12}
              color={'#606A80'}
            >
              {attachment.name}
            </Text>
            <Text
              size={10}
              color={'#606A80'}
              style={{ top: -2 }}
            >
              {getFileSize(attachment.size)}
            </Text>
          </View>
          <View style={{ width: 10 }} />
        </View>
      )
    }
    if (messageType === 'callended') {
      let joinedParticipants = [];
      let timeDiff = null;

      if (meeting) {
        joinedParticipants = lodash.filter(meeting.participants, (p:IParticipants) => p.hasJoined);
        const timeStart = dayjs(meeting?.createdAt);
        const timeEnded = dayjs(meeting?.endedAt);
        timeDiff = timeEnded.diff(timeStart);
        timeDiff = getTimerString(timeDiff/1000);
      }

      return (
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
            <Text
              size={14}
            >
              Meeting ended
            </Text>
            {
              !!timeDiff && (
                <Text
                  size={14}
                >
                  {timeDiff}
                </Text>
              )
            }
          </View>
          {
            !!lodash.size(joinedParticipants) && (
              <View style={{ alignSelf: 'flex-start', marginTop: 5 }}>
                <GroupImage
                  participants={joinedParticipants}
                  size={meeting?.isGroup ? 35 : 30}
                  textSize={meeting?.isGroup ? 24 : 16}
                  sizeOfParticipants={5}
                  showOthers={true}
                  inline={true}
                />
              </View>
            )
          }
          <TouchableOpacity onPress={() => onCallAgain(!meeting?.isVoiceCall)}>
            <View style={styles.callAgainBtn}>
              <Text
                style={{ textAlign: 'center', fontFamily: Regular500 }}
                color={'white'}
                size={12}
              >
                CALL AGAIN
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <View>
        <Text
          size={10}
          color={'black'}
          style={{ fontFamily: Regular }}
        >
          {getChatTimeString(createdAt)}
        </Text>
        <Text
          size={14}
          color={'black'}
        >
          {message}
        </Text>
      </View>
    )
  }

  if (messageType === 'leave' || messageType === 'removed' || messageType === 'added') {
    return (
      <>
        {renderTime()}
        <View style={styles.notif}>
          <Text
            size={14}
            color={'#fff'}
            style={{ textAlign: 'center' }}
          >
            {`${(messageType === 'removed' || messageType === 'added') ? senderName : ''} ${message}`}
          </Text>
        </View>
      </>
    )
  }

  if (messageType === 'newmeeting') {
    return (
      <>
        {renderTime()}
        <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center', marginLeft: -3 }}>
          <NewMeetIcon color={'#2863D6'} />
          <Text
            size={14}
            color={'#606A80'}
            style={{ textAlign: 'center', marginLeft: 5 }}
          >
            {`${isSender ? 'You' : `${senderName} has`} started the call`}
          </Text>
        </View>
      </>
    )
  }

  return (
    <>
      {renderTime()}
      <View style={[styles.container, { maxWidth }, style]}>
        {
          !isSender ?(
            <View
              style={{ marginLeft: -5 }}
            >
              <ProfileImage
                image={sender?.profilePicture?.thumb}
                name={`${sender.firstName} ${sender.lastName}`}
                size={25}
                textSize={10}
              />
            </View>
          ) : null
        }
        {
          (edited && isSender && !(deleted || unSend)) && (
            <View style={{ alignSelf: 'center', marginRight: 0 }}>
              <WriteIcon
                type='pen'
                color={text.info}
                size={14}
              />
            </View>
          )
        }
        <View style={{ marginLeft: 5 }}>
          {
            !isSender ? (
              <Text
                size={10}
                color={text.default}
              >
                {_getSenderName()}
              </Text>
            ) : null
          }
          {
            checkIfImage(attachment?.uri) && !deletedOrUnsend ? (
              <Image
                resizeMode={'cover'}
                style={[
                  styles.imageBubble,
                  {
                    backgroundColor: isSender ? '#E3E5EF' : 'white'
                  }
                ]}
                borderRadius={10}
                source={{ uri: attachment?.uri }}
              />
            ) : (
              <View style={styles.bubbleContainer}>
                <View
                  style={[
                    styles.bubble,
                    {
                      backgroundColor: isSender ? '#E3E5EF' : 'white'
                    },
                    (deletedOrUnsend || system) && {
                      backgroundColor: '#E5E5E5'
                    },
                  ]}
                >
                  {renderContent()}
                </View>
              </View>
            )
          }
        </View>
        {
          (edited && !isSender && !(deleted || unSend)) && (
            <View style={{ alignSelf: 'center', marginTop: 10, marginLeft: 5 }}>
              <WriteIcon
                type='pen'
                color={text.default}
                size={14}
              />
            </View>
          )
        }
        {
          (!isSeen && isSender && !deleted && !system) && (
            <View
              style={[styles.check, delivered && { backgroundColor: text.info }]}
            >
              <CheckIcon
                type='check1'
                size={8}
                color={delivered ? 'white' : text.info}
              />
            </View>
          )
        }
      </View>
      {
        ((showDetails || showSeen) && lodash.size(seenByOthers) > 0) && (
          <View
            style={[
              styles.seenContainer,
              {
                maxWidth,
                alignSelf: isSender ? 'flex-end' : 'flex-start',
                paddingLeft: isSender ? 0 : 20,
              }
            ]}
          >
            {
              seenByEveryone ? (
                <Text
                  color={'#64748B'}
                  numberOfLines={2}
                  size={10}
                >
                  <Text
                    color={'#64748B'}
                    size={10}
                    style={{ fontFamily: Regular500 }}
                  >
                    {'Seen by '}
                  </Text>
                  everyone
                </Text>
              ) : (
                <View
                  style={[{ flexDirection: 'row' }, isSender && styles.flipX]}
                >
                  {
                    seenByOthers.map(seen => (
                      <ProfileImage
                        style={[{ marginHorizontal: 1, }, isSender && styles.flipX]}
                        key={seen._id}
                        image={seen?.profilePicture?.thumb}
                        name={`${seen.firstName} ${seen.lastName}`}
                        size={12}
                        textSize={5}
                      />
                    ))
                  }
                </View>
              )
            }
          </View>
        )
      }
    </>
  )
}

export default ChatBubble
