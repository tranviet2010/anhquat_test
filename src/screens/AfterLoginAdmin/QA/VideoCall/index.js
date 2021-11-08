import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import {Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
// import {
//   StringeeClient,
//   StringeeCall,
//   StringeeVideoView,
// } from 'stringee-react-native';
import {connect} from 'react-redux';
import {getUserInfoAction} from '../../../../redux/redux/getUserInfo';
import {setCallRefAction} from '../../../../redux/redux/callRef';

import {FlatList} from 'react-native-gesture-handler';
import MView from '../../../../components/MView';
import MHeader from '../../../../components/MHeader';
import {COLOR_GREEN, height, width} from '../../../../utilities/config';

class VideoCall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      myUserId: '',
      callToUserId: '',
      hasConnected: true,
    };

    this.clientEventHandlers = {
      onConnect: this._clientDidConnect,
      onDisConnect: this._clientDidDisConnect,
      onFailWithError: this._clientDidFailWithError,
      onRequestAccessToken: this._clientRequestAccessToken,
      onIncomingCall: this._callIncomingCall,
    };
  }
  connectStringee() {
    const {stringeeToken, user} = this.props.userInfoReducer.data;
    this.setState({user: user._id});
    this.refs.client.connect(stringeeToken);
  }
  componentDidMount() {
    // this.connectStringee();
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

  _clientRequestAccessToken = () => {
    console.log('_clientRequestAccessToken');
    // Token để kết nối tới Stringee server đã hết bạn. Bạn cần lấy token mới và gọi connect lại ở đây
    // this.refs.client.connect("NEW_TOKEN");
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
  _onVoiceCallButtonPress = () => {
    console.log('_onVoiceCallButtonPress');
    // this.connectStringee();
    if (this.state.callToUserId != '' && this.state.hasConnected) {
      this.props.navigation.navigate('CallScreen', {
        from: this.state.myUserId,
        to: this.state.callToUserId,
        isOutgoingCall: true,
        isVideoCall: false,
      });
    }
  };

  _onVideoCallButtonPress = () => {
    console.log('_onVideoCallButtonPress');
    // this.connectStringee();

    if (this.state.callToUserId != '' && this.state.hasConnected) {
      this.props.navigation.navigate('CallScreen', {
        from: this.state.myUserId,
        to: this.state.callToUserId,
        isOutgoingCall: true,
        isVideoCall: true,
      });
    }
  };

  render() {
    var {user, hasConnected} = this.state;

    return (
      <View>
        {/* <MHeader
					text="Trực cuộc gọi từ bệnh nhân"
					onPress={() => {
						this.props.navigation.pop();
					}}
				/> */}
        {/* <Text style={{ color: COLOR_GREEN, margin: 10 }}>
					Hướng dẫn: Bác sĩ hãy giữ màn hình điện thoại trong màn hình này để không bỏ lỡ cuộc gọi từ bệnh
					nhân
				</Text>
				<Text
					style={{
						color: hasConnected ? COLOR_GREEN : 'red',
						margin: 10,
						alignSelf: 'center',
						fontWeight: 'bold'
					}}
				>
					{hasConnected ? 'Đã kết nối' : 'Chưa kết nối'}
				</Text> */}
        {/* <View style={{}}>
					{doctors.map((doctor) => {
						if (doctor._id != user) {
							return (
								<Button
									onPress={() => {
										this.setState({ callToUserId: doctor._id, showButtonAction: true });
									}}
									style={{ marginTop: 30 }}
									key={doctor._id}
								>
									Gọi bác sĩ {doctor.full_name}
								</Button>
							);
						} else {
							return null;
						}
					})}
				</View>
				{this.state.showButtonAction && (
					<View style={styles.buttonView}>
						<TouchableOpacity style={styles.button} onPress={this._onVoiceCallButtonPress}>
							<Text style={styles.text}>Voice Call</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.button} onPress={this._onVideoCallButtonPress}>
							<Text style={styles.text}>Video Call</Text>
						</TouchableOpacity>
					</View>
				)} */}

        {/* <StringeeClient ref="client" eventHandlers={this.clientEventHandlers} /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
    color: 'red',
  },

  text: {
    textAlign: 'center',
    color: '#F5FCFF',
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 15,
  },

  input: {
    height: 35,
    width: 280,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    textAlign: 'center',
    backgroundColor: '#ECECEC',
  },

  button: {
    width: 120,
    height: 40,
    marginTop: 40,
    paddingTop: 10,
    // paddingBottom: ,
    backgroundColor: '#1E6738',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },

  buttonView: {
    width: 280,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const mapStateToProps = (state) => {
  return {
    userInfoReducer: state.userInfoReducer,
  };
};
export default connect(mapStateToProps, {getUserInfoAction})(VideoCall);
