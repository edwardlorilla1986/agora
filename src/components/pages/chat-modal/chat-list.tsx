import React, { useState, useEffect, useCallback, useRef, FC, useMemo } from 'react'
import {View,TouchableOpacity,StyleSheet,InteractionManager,Platform, Dimensions, Image, Linking} from 'react-native';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import AwesomeAlert from 'react-native-awesome-alerts';
import lodash from 'lodash';
import useSignalr from '../../../../src/hooks/useSignalr';
import { ListFooter } from '../../../components/molecules/list-item';
import { CloseIcon, NewEditIcon, NewFileIcon } from '../../../components/atoms/icon';
import {
  setMessages,
  addToMessages,
  setSelectedMessage,
  setPendingMessageError,
  removePendingMessage,
  addMessages,
  setSelectedChannel,
  addChannel
} from '../../../../src/reducers/channel/actions';
import Modal from 'react-native-modal';
import BottomModal, { BottomModalRef } from './../../../components/atoms/modal/bottom-modal';
import Text from '../../atoms/text';
import Button from '../../../components/atoms/button';
import ChatList from '../../../components/organisms/chat/list';
import { outline, text, button } from './../../../styles/color';
import NewDeleteIcon from '../../../components/atoms/icon/new-delete';
import {Bold,Regular,Regular500} from './../../../styles/font';
import IMessages from '../../../../src/interfaces/IMessages';
import IParticipants from '../../../../src/interfaces/IParticipants';
import NoConversationIcon from "./../../../../assets/svg/noConversations";
import { useNavigation } from '@react-navigation/native';
import IAttachment from '../../../../src/interfaces/IAttachment';
import {NoContent} from "./../../../screens/meet/index.web";
import { fontValue } from '../../../utils/fontValue';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingHorizontal: 0,
    marginHorizontal: 20,
    borderBottomColor: outline.default,
    borderBottomWidth: 1,
  },
  bar: {
    marginTop: 5,
    height: 4,
    width: 35,
    alignSelf: 'center',
    borderRadius: 4,
  },
  cancelButton: {
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: button.info,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  cancelText: {
    fontSize: fontValue(16),
    color: text.info,
    fontFamily: Regular500,
  },
  confirmText: {
    fontSize: fontValue(16),
    color: text.error,
    fontFamily: Regular500,
  },
  title: {
    color: '#14142B',
    textAlign: 'center',
    fontSize: fontValue(16),
    fontFamily: Regular500,
  },
  message: {
    color: '#4E4B66',
    textAlign: 'center',
    fontSize:fontValue(14),
    marginHorizontal: 15,
    marginBottom: 15,
    fontFamily: Regular,
  },
  content: {
    borderBottomColor: outline.default,
    borderBottomWidth: 1,
  }
})

interface Props {
  channelId: string;
  isGroup: boolean;
  lastMessage: IMessages | {};
  otherParticipants: Array<IParticipants>;
  onNext: Function;
}

const List: FC<Props> = ({
  channelId = '',
  isGroup = false,
  lastMessage = {},
  otherParticipants = [],
  onNext = () => {}
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const modalRef = useRef<BottomModalRef>(null);
  const user = useSelector((state:RootStateOrAny) => state.user);
  const channelMessages = useSelector((state:RootStateOrAny) => state.channel.channelMessages);
  const pendingMessages = useSelector((state:RootStateOrAny) => state.channel.pendingMessages);
  const messages = useMemo(() => {
    const normalizedMessages = channelMessages[channelId]?.messages || {};
    const channelPendingMessages = pendingMessages[channelId || 'temp'] || {};
    const messagesList = lodash.keys(normalizedMessages).map((m:string) => {
      return normalizedMessages[m];
    });
    const pendingMessageList = lodash.keys(channelPendingMessages).map((m:string) => {
      return channelPendingMessages[m];
    });
    let delivered = false;
    let seen:any = [];
    const messageArray = lodash.orderBy(messagesList, 'createdAt', 'desc')
    .map((msg:IMessages) => {
      if (!delivered && msg.delivered) {
        delivered = true;
      }
      if (delivered) msg.delivered = true;

      seen = lodash.unionBy(seen, msg.seen, 'id');
      msg.seen = seen;

      return msg;
    });

    const pendingMessagesArray = lodash.orderBy(pendingMessageList, 'createdAt', 'desc');

    return lodash.concat(pendingMessagesArray, messageArray);
  }, [channelMessages, pendingMessages]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showDeleteOption, setShowDeleteOption] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage]:any = useState({});
  const [pageIndex, setPageIndex] = useState(1);
  const [fetching, setFetching] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [preview, setPreview] = useState<any>({})

  const {
    sendMessage,
    sendFile,
    getMessages,
    unSendMessage,
    deleteMessage,
    seenMessage,
    createChannel,
  } = useSignalr();

  const fetchMoreMessages = (isPressed = false) => {
    if ((!hasMore || fetching || hasError || loading) && !isPressed) return;
    setFetching(true);
    setHasError(false);
    getMessages(channelId, pageIndex, false, (err, res) => {
      setLoading(false);
      if (res) {
        if (res.list) dispatch(addToMessages(channelId, res.list));
        setPageIndex(current => current + 1);
        setHasMore(res.hasMore);
      }
      if (err) {
        console.log('ERR', err);
        setHasError(true);
      }
      setFetching(false);
    })
  }

  const _sendMessage = (data:any, messageId:string, config: any, createNew = false) => {
    if (createNew) {
      createChannel(data, (err:any, res:any) => {
        if (res) {
          const { lastMessage } = res;
          res.otherParticipants = lodash.reject(res.participants, (p:IParticipants) => p._id === user._id);
          dispatch(removePendingMessage(channelId, messageId, lastMessage));
          dispatch(setSelectedChannel(res));
          dispatch(addChannel(res));
          onNext(null, res);
        }
        if (err) {
          console.log('ERROR', err, messageId);
          if (err?.message !== 'canceled') {
            dispatch(setPendingMessageError(channelId, messageId));
          }
        }
      }, config);
    } else {
      sendMessage(data, (err:any, result:IMessages) => {
        if (err) {
          if (err?.message !== 'canceled') {
            dispatch(setPendingMessageError(channelId, messageId));
          }
        } else {
          dispatch(removePendingMessage(channelId, messageId, result));
        }
      }, config);
    }
  }

  const _sendFile = (channelId:string, messageId:string, data:any, config:any) => {
    sendFile(channelId, data, (err:any, result:any) => {
      if (err) {
        if (err?.message !== 'canceled') {
          dispatch(setPendingMessageError(channelId, messageId));
        }
      } else {
        dispatch(removePendingMessage(channelId, messageId, result));
      }
    }, config);
  }

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setRendered(true);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    setPageIndex(1);
    setHasMore(false);
    setHasError(false);
    let unmount = false;
    if (rendered && channelId) {
      getMessages(channelId, 1, false, (err, res) => {
        if (!unmount) {
          setLoading(false);
          if (res) {
            dispatch(setMessages(channelId, res.list));
            setPageIndex(current => current + 1);
            setHasMore(res.hasMore);
          }
          if (err) {
            console.log('ERR', err);
            setHasError(true);
          }
        }
      })
    } else {
      setLoading(false);
    }

    return () => {
      unmount = true;
    }
  }, [rendered, channelId]);

  useEffect(() => {
    if (lodash.size(lastMessage) && rendered) {
      const hasSeen = lodash.find(lastMessage?.seen, s => s._id === user._id);
      if (!hasSeen) {
        seenMessage(lastMessage._id);
      }
    }
  }, [lastMessage, rendered]);

  const showOption = (item:IMessages, type?:string) => {
    console.log('TYPE TYPE', type);
    if (type === 'edit') {
      dispatch(setSelectedMessage(channelId, item));
    } else if (type === 'delete') {
      setMessage(item);
      setShowDeleteOption(true);
      modalRef.current?.open();
    } else {
      setMessage(item);
      modalRef.current?.open();
    }
  }

  const options = () => {
    return (
      <>
        {
          !lodash.size(message?.attachment) && (
            <TouchableOpacity
              onPress={() => {
                dispatch(setSelectedMessage(channelId, message));
                modalRef.current?.close();
              }}
            >
              <View style={styles.button}>
                <NewEditIcon
                  height={fontValue(22)}
                  width={fontValue(22)}
                  color={text.default}
                />
                <Text
                  style={{ marginLeft: 15 }}
                  color={text.default}
                  size={18}
                >
                  Edit
                </Text>
              </View>
            </TouchableOpacity>
          )
        }
        <TouchableOpacity
          onPress={() => {
            if (message?.messageType === 'file') {
              dispatch(removePendingMessage(channelId, message._id, null));
            } else {
              setShowDeleteOption(true)
            }
          }}
        >
          <View style={[styles.button, { borderBottomWidth: 0 }]}>
            <NewDeleteIcon
              height={fontValue(22)}
              width={fontValue(22)}
              color={text.error}
            />
            <Text
              style={{ marginLeft: 15 }}
              color={text.error}
              size={18}
            >
              Delete
            </Text>
          </View>
        </TouchableOpacity>
      </>
    )
  }

  const deletOptions = () => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            modalRef.current?.close();
            setTimeout(() => setShowAlert(true), 500);
          }}
        >
          <View style={[styles.button, { justifyContent: 'center' }]}>
            <Text
              style={{ marginLeft: 15 }}
              color={text.info}
              size={18}
            >
              Unsend for myself
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            modalRef.current?.close();
            setTimeout(() => unSendMessageEveryone(), 500);
          }}
        >
          <View style={[styles.button, { borderBottomWidth: 0, justifyContent: 'center' }]}>
            <Text
              style={{ marginLeft: 15 }}
              color={text.error}
              size={18}
            >
              Unsend for everyone
            </Text>
          </View>
        </TouchableOpacity>
        <Button
          style={[styles.cancelButton]}
          onPress={modalRef.current?.close}
        >
          <Text color="white" size={18}>Cancel</Text>
        </Button>
      </>
    )
  }

  const ListFooterComponent = () => {
    return (
      <ListFooter
        hasError={hasError}
        fetching={fetching}
        loadingText="Loading more chat..."
        errorText="Unable to load chats"
        refreshText="Refresh"
        onRefresh={() => fetchMoreMessages(true)}
      />
    );
  }

  const unSendMessageEveryone = useCallback(
    () => {
      deleteMessage(message._id)
    },
    [message, channelId]
  );

  const unSendMessageForYou = useCallback(
    () => {
      setShowAlert(false)
      setTimeout(() => unSendMessage(message._id), 500);
    },
    [message]
  );

  const checkIfImage = (uri:any) => {
    if (uri && (uri.endsWith(".png") || uri.endsWith(".jpg"))) return true;
    return false;
  };

  return (
    <>
      {
        !messages.length ?
          <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <View >
              <NoContent/>
            </View>
            {
              Platform.select({
                   native: <Text style={{color:"#A0A3BD",fontSize:24,fontFamily:Regular,fontWeight:"400"}}>No
                     conversations yet</Text>,
                    web:  <View style={{paddingVertical:30}}>
                      <Text style={{textAlign: "center", color:"#565961",fontSize:24,fontFamily:Bold,fontWeight:"bold"}}>You’re starting a new conversation</Text>
                      <Text style={{textAlign: "center",color:"#A0A3BD",fontSize:20,fontFamily:Regular,fontWeight:"400"}}>Type your first message below</Text>
                    </View>
              })

            }
          </View> :
        <>
          <ChatList
            user={user}
            messages={messages}
            participants={otherParticipants}
            lastMessage={lastMessage}
            isGroup={isGroup}
            loading={loading}
            error={error}
            showOption={showOption}
            ListFooterComponent={ListFooterComponent}
            onEndReached={() => fetchMoreMessages()}
            onEndReachedThreshold={0.5}
            onSendMessage={_sendMessage}
            onSendFile={_sendFile}
            onPreview={(item:IAttachment) => setPreview(item)}
          />
          <Modal
            isVisible={!!preview?.attachment}
            statusBarTranslucent={true}
            onBackdropPress={() => setPreview({})}
            onSwipeComplete={() => setPreview({})}
            style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15 }}
          >
            <View style={{ position: 'absolute', top: 20, right: 10 }}>
              <TouchableOpacity onPress={() => setPreview({})}>
                <Text
                  color={'white'}
                  size={16}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>
            {
              !!preview?.attachment && checkIfImage(preview?.attachment?.uri) ? (
                <Image
                  resizeMode={'contain'}
                  source={{ uri: preview?.attachment?.uri }}
                  style={{ width: width * 0.9, height: height * 0.8 }}
                />
              ) : (
                <View style={{ alignItems: 'center' }}>
                  <NewFileIcon
                    color={'#fff'}
                    width={60}
                    height={60}
                  />
                  <Text
                    style={{ textAlign: 'center', marginTop: 15 }}
                    color={'white'}
                    size={18}
                    numberOfLines={3}
                  >
                    {preview?.attachment?.name}
                  </Text>
                  <View style={{ justifyContent: 'center', marginTop: 30 }}>
                    <TouchableOpacity onPress={() => Linking.openURL(preview?.attachment?.uri)}>
                      <View style={{ paddingHorizontal: 15, paddingVertical: 10, backgroundColor: '#2863D6', borderRadius: 10 }}>
                        <Text
                          color={'white'}
                          size={16}
                        >
                          Download
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            }
          </Modal>
          <BottomModal
            ref={modalRef}
            onModalHide={() => setShowDeleteOption(false)}
            header={
              <View style={styles.bar} />
            }
          >
            <View style={{ paddingBottom: 20 }}>
              {showDeleteOption ? deletOptions() : options()}
            </View>
          </BottomModal>
          <AwesomeAlert
            show={showAlert}
            showProgress={false}
            contentContainerStyle={{ borderRadius: 15 }}
            title={'Unsend for You?'}
            titleStyle={styles.title}
            message={'This message will be unsend for you. Other chat members will still able to see it.'}
            messageStyle={styles.message}
            contentStyle={styles.content}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelButtonColor={'white'}
            confirmButtonColor={'white'}
            cancelButtonTextStyle={styles.cancelText}
            confirmButtonTextStyle={styles.confirmText}
            actionContainerStyle={{ justifyContent: 'space-around' }}
            cancelText="Cancel"
            confirmText="Unsend"
            onCancelPressed={() => setShowAlert(false)}
            onConfirmPressed={unSendMessageForYou}
          />
        </>
      }
    </>
  )
}

export default List
