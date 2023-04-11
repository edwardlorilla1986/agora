import React, { useState, useEffect, useRef, useMemo } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  StatusBar,
  FlatList,
  RefreshControl,
  Platform,
} from 'react-native'
import lodash from 'lodash';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux'
import { setMeeting, setMeetings, addToMeetings, setOptions, resetCurrentMeeting } from '../../../src/reducers/meeting/actions';
import { setSelectedChannel } from '../../../src/reducers/channel/actions';
import useSignalr from '../../../src/hooks/useSignalr';
import Meeting from '../../components/molecules/list-item/meeting';
import Text from '../../components/atoms/text'
import { getChannelName } from '../../../src/utils/formatting';
import { AddMeetingIcon, NewVideoIcon, PlusIcon } from '../../../src/components/atoms/icon';
import { text, outline, primaryColor } from '../../../src/styles/color';
import BottomModal, { BottomModalRef } from '../../components/atoms/modal/bottom-modal';
import { ListFooter } from '../../components/molecules/list-item';
import MeetingParticipants from '../../components/pages/chat-modal/meeting-participants';
import HomeMenuIcon from "../../../assets/svg/homemenu";
import { RFValue } from 'react-native-responsive-fontsize';
import {Bold} from "../../styles/font";
import CreateMeeting from '../../components/pages/chat-modal/meeting';
import IMeetings from '../../../src/interfaces/IMeetings';
import IParticipants from '../../../src/interfaces/IParticipants';

const { width, height } = Dimensions.get('window');

const size = width * 0.45;
const sectionHeight = size * 0.25;
const position = sectionHeight - RFValue(8);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 30,
    paddingTop: 41,
    paddingBottom: 17,
    backgroundColor: primaryColor
  },
  titleContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollview: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 60,
  },
  image: {
    height: width * 0.5,
    width: width * 0.65,
    backgroundColor: '#DCE2E5',
    borderRadius: 10,
    marginVertical: 15,
  },
  text: {
    marginVertical: 5,
    textAlign: 'center',
  },
  button: {
    marginTop: 15,
    borderRadius: 10,
    paddingVertical: 15,
    borderColor: outline.default,
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10,
  },
  section: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
  },
  bar: {
    height: 15,
    width: 35,
    borderRadius: 4,
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
  },
  leftPosition: {
    width: size,
    height: sectionHeight - 2,
    backgroundColor: 'white',
    borderRadius: 5,
    left: -position,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: RFValue(20)
  },
  rightPosition: {
    width: size,
    height: sectionHeight - 2,
    backgroundColor: 'white',
    borderRadius: 5,
    right: -position,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: RFValue(20)
  },
  circle: {
    height: RFValue(18),
    width: RFValue(18),
    backgroundColor: '#2863D6',
    borderRadius: RFValue(18),
  },
  emptyMeeting: {
    backgroundColor: '#DAE7FF',
    width: size,
    height: size,
    borderRadius: RFValue(10),
    paddingVertical: 10,
    justifyContent: 'space-around'
  }
})

const Meet = ({ navigation }) => {
  const dispatch = useDispatch();
  const modalRef = useRef<BottomModalRef>(null);
  const user = useSelector((state:RootStateOrAny) => state.user);
  const normalizedMeetingList = useSelector((state:RootStateOrAny) => state.meeting.normalizedMeetingList);
  const meetingList = useMemo(() => {
    const meetingList = lodash.keys(normalizedMeetingList).map(m => {
      const meeting = normalizedMeetingList[m];
      const { room } = meeting;
      meeting.otherParticipants = lodash.reject(meeting.participants, p => p._id === user._id);
      room.otherParticipants =  meeting.otherParticipants;
      return meeting;
    });
    return lodash.orderBy(meetingList, 'updatedAt', 'desc');
  }, [normalizedMeetingList]);
  const {
    getMeetingList,
  } = useSignalr();
  const [loading, setLoading] = useState(false);
  const [sendRequest, setSendRequest] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const [fetching, setFetching] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [currentMeeting, setCurrentMeeting] = useState({
    channelId: '',
    isChannelExist: false,
    participants: [],
  });

  const onJoin = (item:IMeetings) => {
    dispatch(setSelectedChannel(item.room));
    dispatch(resetCurrentMeeting());
    setTimeout(() => {
      dispatch(setOptions({
        isHost: item.host._id === user._id,
        isVoiceCall: item.isVoiceCall,
        isMute: false,
        isVideoEnable: true,
      }));
      dispatch(setMeeting(item));
    }, 100);
  }

  const onRequestData = () => setSendRequest(request => request + 1);

  const fetchMoreMeeting = (isPressed = false) => {
    if ((!hasMore || fetching || hasError || loading) && !isPressed) return;
    setFetching(true);
    setHasError(false);
    const payload = { pageIndex };

    getMeetingList(payload, (err:any, res:any) => {
      if (res) {
        if (res.list) dispatch(addToMeetings(res.list));
        setPageIndex(current => current + 1);
        setHasMore(res.hasMore);
      }
      if (err) {
        console.log('ERR', err);
        setHasError(true);
      }
      setFetching(false);
    });
  }

  useEffect(() => {
    setLoading(true);
    setPageIndex(1);
    setHasMore(false);
    setHasError(false);
    let unMount = false;
    const payload = { pageIndex: 1 };

    getMeetingList(payload, (err:any, res:any) => {
      if (!unMount) {
        if (res) {
          dispatch(setMeetings(res.list));
          setPageIndex(current => current + 1);
          setHasMore(res.hasMore);
        }
        if (err) {
          setHasError(true);
          console.log('ERR', err);
        }
        setLoading(false);
      }
    });

    return () => {
      unMount = true;
    }
  }, [sendRequest])

  const mockChat = () => (
    <>
      <View style={styles.circle} />
      <View style={{ paddingLeft: 10 }}>
        <View style={{ borderRadius: RFValue(7), height: RFValue(7), width: sectionHeight, backgroundColor: '#B4DAFF' }} />
        <View style={{ borderRadius: RFValue(5), height: RFValue(5), width: sectionHeight, backgroundColor: 'white' }} />
        <View style={{ borderRadius: RFValue(7), height: RFValue(7), width: sectionHeight * 1.5, backgroundColor: '#DEE9FC' }} />
      </View>
    </>
  )

  const EmptyMeeting = () => (
    <View style={styles.emptyMeeting}>
      <View style={[styles.leftPosition, styles.shadow]}>
        {mockChat()}
      </View>
      <View style={[styles.rightPosition, styles.shadow]}>
        {mockChat()}
      </View>
      <View style={[styles.leftPosition, styles.shadow]}>
        {mockChat()}
      </View>
    </View>
  )

  const emptyComponent = () => (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        height: height - (width / 2)
      }}>
        {EmptyMeeting()}
        <Text
          color={'#34343F'}
          size={18}
          style={{ textAlign: 'center', marginTop: 30 }}
        >
          {'Get Started with Group\nmeetings'}
        </Text>
    </View>
  )

  const ListFooterComponent = () => {
    return (
      <ListFooter
        hasError={hasError}
        fetching={fetching}
        loadingText="Loading more meetings..."
        errorText="Unable to load meetings"
        refreshText="Refresh"
        onRefresh={() => fetchMoreMeeting(true)}
      />
    );
  }

  const renderItem = ({ item }) => {
    return (
      <Meeting
        name={getChannelName(item)}
        time={item.createdAt}
        participants={lodash.take(item?.room?.otherParticipants, 4)}
        others={lodash.size(item?.room?.otherParticipants) - 4}
        ended={item.ended}
        data={item}
        onJoin={() => onJoin(item)}
      />
    )
  }

  const checkSelectedItems = (selectedItem:any) => {
    if (lodash.size(selectedItem) === 1 && selectedItem[0].isGroup) {
      setCurrentMeeting({
        channelId: selectedItem[0]._id,
        isChannelExist: true,
        participants: selectedItem[0].participants,
      })
    } else {
      const tempParticipants:any = [];
      lodash.map(selectedItem, (item:any) => {
        if (item.isGroup) {
          lodash.map(item.participants, (p:IParticipants) => {
            const isExists = lodash.find(tempParticipants, (temp:IParticipants) => temp._id === p._id);
            if (!isExists) {
              tempParticipants.push(p);
            }
          })
        } else {
          const isExists = lodash.find(tempParticipants, (temp:IParticipants) => temp._id === item._id);
          if (!isExists) {
            tempParticipants.push(item);
          }
        }
      });

      setCurrentMeeting({
        channelId: '',
        isChannelExist: false,
        participants: tempParticipants,
      })
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.header}>
        <TouchableOpacity
          style={{ paddingTop: 1 }}
          onPress={() => navigation.navigate('Settings')}
        >
          <HomeMenuIcon/>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text
            color={'white'}
            size={20}
            style={{ fontFamily: Bold, marginBottom: Platform.OS === 'ios' ? 0 : -5 }}
          >
            Meet
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => modalRef.current?.open()}
        >
          <AddMeetingIcon />
        </TouchableOpacity>
      </View>
      {
        loading ? (
          <View style={{ alignItems: 'center', marginTop: 15 }}>
            <ActivityIndicator size={'small'} color={text.default} />
            <Text
              style={{ marginTop: 10 }}
              size={14}
              color={text.default}
            >
              Fetching meetings...
            </Text>
          </View>
        ) : (
          <FlatList
            data={meetingList}
            refreshControl={
              <RefreshControl
                tintColor={primaryColor} // ios
                progressBackgroundColor={primaryColor} // android
                colors={['white']} // android
                refreshing={loading}
                onRefresh={onRequestData}
              />
            }
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item:any) => item._id}
            ListEmptyComponent={emptyComponent}
            ListFooterComponent={ListFooterComponent}
            ItemSeparatorComponent={() => <View style={{ width: width - RFValue(60), height: 1, backgroundColor: '#E5E5E5', alignSelf: 'flex-end' }} />}
            onEndReached={() => fetchMoreMeeting()}
            onEndReachedThreshold={0.5}
          />
        )
      }
      <BottomModal
        ref={modalRef}
        onModalHide={() => modalRef.current?.close()}
        avoidKeyboard={false}
        header={
          <View style={styles.bar} />
        }
        containerStyle={{ maxHeight: null }}
        onBackdropPress={() => {}}
      >
        <View style={{ paddingBottom: 20, height: height * (Platform.OS === 'ios' ? 0.94 : 0.98) }}>
          {
            isNext ? (
              <CreateMeeting
                participants={currentMeeting.participants}
                onClose={() => setIsNext(false)}
                channelId={currentMeeting.channelId}
                isChannelExist={currentMeeting.isChannelExist}
                onSubmit={(params, data) => {
                  modalRef.current?.close();
                  setParticipants([]);
                  setCurrentMeeting({
                    channelId: '',
                    isChannelExist: false,
                    participants: [],
                  })
                  setIsNext(false);
                  dispatch(setOptions({
                    ...params.options,
                    isHost: params.isHost,
                    isVoiceCall: params.isVoiceCall,
                  }));
                  setTimeout(() => dispatch(setMeeting(data)), 500);
                }}
              />
            ) : (
              <MeetingParticipants
                meetingPartticipants={participants}
                onClose={() => {
                  setParticipants([]);
                  modalRef.current?.close();
                }}
                onSubmit={(res:any) => {
                  checkSelectedItems(res);
                  setParticipants(res);
                  setIsNext(true);
                }}
              />
            )
          }
        </View>
      </BottomModal>
    </View>
  )
}

export default Meet
