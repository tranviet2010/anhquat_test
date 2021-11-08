import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
  Platform,
} from 'react-native';
import {
  height,
  width,
  TEXT_COLOR,
  COLOR_PRIMARY,
  isIphoneX,
  COLOR_GREEN,
  COLOR_ORANGE,
  COLOR_LIGHT_BLUE,
} from '../../../utilities/config';
import {textFontSize} from '../../../utilities/Styles';
import MView from '../../../components/MView';
import {LichHenKhamItem} from '../../../components/customize/MeetingItem';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import {getListDoctorAction} from '../../../redux/redux/getListDoctor';
import MAlert from '../../../components/MAlert';
import MHeader from '../../../components/MHeader';
import {Avatar, AirbnbRating} from 'react-native-elements';
import {BASE_API} from '../../../services/Services';
const con_gai = require('../../../assets/img/img_homescreen/con_gai.png');
const chong = require('../../../assets/img/img_homescreen/chong.png');
const dat_lich = require('../../../assets/img/img_meetings/dat_lich.png');
const doctor = require('../../../assets/img/img_qa/doctor.jpg');
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5';
// import { StringeeClient, StringeeCall, StringeeVideoView } from 'stringee-react-native';

class DoctorList extends Component {
  constructor(props) {
    super(props);
    this.params = {
      page: 1,
      perPage: 30,
    };
    this.state = {
      username: 'NGUYỄN THẾ QUẤT',
      meetingtitlecolor: '',
      tab: 'Lịch đặt hẹn',
      meetingdata: [],
      params: this.params,
      user: null,
      myUserId: '',
      callToUserId: '',
      hasConnected: true,
    };

    // this.clientEventHandlers = {
    //   onConnect: this._clientDidConnect,
    //   onDisConnect: this._clientDidDisConnect,
    //   onFailWithError: this._clientDidFailWithError,
    //   onRequestAccessToken: this._clientRequestAccessToken,
    //   onIncomingCall: this._callIncomingCall,
    // };
  }
  connectStringee() {
    const {stringeeToken, user} = this.props.userInfoReducer.data;
    this.setState({user: user._id});
    console.log(stringeeToken);
    this.refs.client.connect(stringeeToken);
  }

  componentWillUnmount() {
    // this.refs.client.disconnect();
  }
  // Connection
  _clientDidConnect = ({userId}) => {
    console.log('_clientDidConnect - ' + userId);
    this.setState({
      myUserId: userId,
      hasConnected: true,
    });
  };

  _clientDidDisConnect = () => {
    console.log('_clientDidDisConnect');
    this.setState({
      myUserId: '',
      hasConnected: false,
    });
  };

  _clientDidFailWithError = () => {
    console.log('_clientDidFailWithError');
  };

  _clientRequestAccessToken = (token) => {
    console.log('_clientRequestAccessToken');
    // Token để kết nối tới Stringee server đã hết bạn. Bạn cần lấy token mới và gọi connect lại ở đây
    this.refs.client.connect(token);
  };

  // Call events
  _callIncomingCall = ({
    callId,
    from,
    to,
    fromAlias,
    toAlias,
    callType,
    isVideoCall,
    customDataFromYourServer,
  }) => {
    console.log(
      'IncomingCallId-' +
        callId +
        ' from-' +
        from +
        ' to-' +
        to +
        ' fromAlias-' +
        fromAlias +
        ' toAlias-' +
        toAlias +
        ' isVideoCall-' +
        isVideoCall +
        'callType-' +
        callType +
        'customDataFromYourServer-' +
        customDataFromYourServer,
    );

    this.props.navigation.navigate('CallScreen', {
      callId: callId,
      from: from,
      to: to,
      isOutgoingCall: false,
      isVideoCall: isVideoCall,
    });
  };

  // Action
  _onVoiceCallButtonPress = (doctor_id) => {
    console.log('_onVoiceCallButtonPress');
    if (this.state.hasConnected) {
      this.props.navigation.navigate('CallScreen', {
        from: this.state.myUserId,
        to: doctor_id,
        isOutgoingCall: true,
        isVideoCall: false,
      });
    }
  };

  _onVideoCallButtonPress = (doctor_id) => {
    console.log('_onVideoCallButtonPress');
    if (this.state.hasConnected) {
      this.props.navigation.navigate('CallScreen', {
        from: this.state.myUserId,
        to: doctor_id,
        isOutgoingCall: true,
        isVideoCall: true,
      });
    }
  };

  componentDidMount = () => {
    // this.connectStringee();
    this.getListDoctorAction();
  };

  getListDoctorAction = () => {
    this.props.getListDoctorAction(this.params);
  };

  componentDidUpdate = (PrevProps, PrevState) => {
    if (PrevProps.getListDoctorReducer != this.props.getListDoctorReducer) {
      if (this.props.getListDoctorReducer.isSuccess) {
        const data = this.props.getListDoctorReducer.data;
        this.setState({meetingdata: data});
      }
    }
  };

  onDelete = (id) => {};

  onShowModalCancel = (id) => {
    this.malert.showAlert(
      'Bạn có chắc chắn muốn huỷ lịch hẹn khám này?',
      () => {
        this.onDelete(id);
      },
      () => {},
    );
  };

  next_page = () => {
    this.setState(
      {
        params: {
          ...this.state.params,
          page: this.state.params.page + 1,
        },
      },
      () => this.props.getListDoctorAction(this.state.params),
    );
  };
  goDetail = (id) => {
    this.props.navigation.navigate('DetailAppointment', {appointment_id: id});
  };
  view_bac_si = (item) => {
    return (
      <View style={styles.view_doctor}>
        <View>
          <Avatar
            avatarStyle={{zIndex: 1}}
            rounded
            size={70}
            source={item.image ? {uri: BASE_API + item.image} : doctor}
          />
          <View
            style={{
              position: 'absolute',
              width: 12,
              height: 12,
              borderRadius: 20,
              backgroundColor: 'green',
              bottom: 5,
              right: 5,
              borderColor: 'white',
              borderWidth: 1,
            }}
          />
        </View>
        <View key={item.id} style={{flex: 1}}>
          <View
            style={{
              flex: 6,
              justifyContent: 'center',
              margin: 10,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: textFontSize * 1.1}}>
              BS. {item.full_name}
            </Text>
            <Text
              style={{
                fontSize: textFontSize * 0.9,
                color: '#626363',
              }}>
              Khoa {item.chuyen_khoa.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <AirbnbRating
                showRating={false}
                reviews={false}
                count={5}
                defaultRating={4.5}
                size={15}
                isDisabled={true}
              />
              <View style={{flex: 1}} />
            </View>
          </View>
        </View>
        {this.state.hasConnected && (
          <TouchableOpacity
            onPress={() => {
              this._onVideoCallButtonPress(item._id);
            }}
            style={{
              padding: 10,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: COLOR_PRIMARY,
            }}>
            <FontAwesome5Pro
              name="video"
              size={13}
              color={COLOR_PRIMARY}
              light
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };
  view_doctor = () => {
    if (this.props.getListDoctorReducer.isLoading) {
      return <ActivityIndicator color={COLOR_PRIMARY} />;
    } else {
      if (this.props.getListDoctorReducer.isSuccess) {
        return (
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.props.getListDoctorReducer.isLoading}
                onRefresh={this.onRefreshAppointmentList}
              />
            }
            onEndReachedThreshold={0.2}
            onEndReached={({distanceFromEnd}) => {
              if (this.props.getListDoctorReducer.canLoadMore) {
                this.next_page();
              }
            }}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={10}
            legacyImplementation={false}
            updateCellsBatchingPeriod={50}
            data={this.props.getListDoctorReducer.data}
            keyExtractor={(item, index) => index + ''}
            renderItem={({item, index}) => this.view_bac_si(item)}
            contentContainerStyle={{paddingHorizontal: 10, paddingTop: 20}}
          />
        );
      } else {
        return (
          <View style={styles.imgContainer}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: textFontSize,
                color: TEXT_COLOR,
              }}>
              Không có bác sĩ đang trực tuyến vào lúc này. Bạn hãy quay lại vào
              giờ làm việc.
            </Text>
            {/* <TouchableOpacity
							onPress={() => {
								this.props.navigation.navigate('MakeAppointment');
							}}
						>
							<Text
								style={{
									textAlign: 'center',
									color: COLOR_ORANGE,
									fontWeight: 'bold',
									fontSize: textFontSize * 1.2
								}}
							>
								Đặt lịch ngay
							</Text>
						</TouchableOpacity> */}
          </View>
        );
      }
    }
  };

  render() {
    return (
      <MView>
        <MHeader
          onPress={() => {
            this.props.navigation.pop();
          }}
          text="Bác sĩ đang trực tuyến"
        />
        {this.view_doctor()}
        {/* <StringeeClient ref="client" eventHandlers={this.clientEventHandlers} /> */}

        <MAlert ref={(ref) => (this.malert = ref)} />
      </MView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfoReducer: state.userInfoReducer,

    getListDoctorReducer: state.getListDoctorReducer,
    setCallRefReducer: state.setCallRefReducer,
  };
};

export default connect(mapStateToProps, {getListDoctorAction})(DoctorList);

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: width,
    height: height / 4,
    flexDirection: 'column-reverse',
  },
  header: {
    width: width / 1.4,
    height: isIphoneX() ? width / 1.5 : width / 2,
    alignSelf: 'center',
    marginTop: 35,
  },
  active_button: {
    backgroundColor: COLOR_LIGHT_BLUE,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 20,
    flex: 1,
    marginVertical: 10,
  },
  disable_button: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 20,
    flex: 1,
    marginVertical: 10,
  },
  active_text: {
    fontSize: textFontSize + 2,
    color: COLOR_PRIMARY,
    fontWeight: 'bold',
  },
  disable_text: {
    fontSize: textFontSize + 2,
    color: TEXT_COLOR,
  },
  imgContainer: {
    alignSelf: 'center',
    top: width / 3,
  },
  view_doctor: {
    justifyContent: 'space-between',
    marginBottom: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
