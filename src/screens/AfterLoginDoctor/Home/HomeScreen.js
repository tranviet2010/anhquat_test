import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Image,
  StyleSheet,
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
  COLOR_MINT,
} from '../../../utilities/config';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {textFontSize} from '../../../utilities/Styles';
import {Badge, Avatar} from 'react-native-elements';
import MView from '../../../components/MView';
import {add_dot_number} from '../../../utilities/StringHelper';
import OneLine, {OneLineColumn} from '../../../components/OneLine';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import MeetingItem from '../../../components/customize/MeetingItem';
import {connect} from 'react-redux';
import MAsyncStorage from '../../../utilities/MAsyncStorage';
import {getUserInfoAction} from '../../../redux/redux/getUserInfo';
import MHeader from '../../../components/MHeader';
// import VideoCall from '../VideoCall';
const chong = require('../../../assets/img/img_homescreen/chong.png');
const cap_cuu = require('../../../assets/img/img_homescreen/cap_cuu.png');
const dathen = require('../../../assets/img/datlichkham.png');
const taikham = require('../../../assets/img/lichtaikham.png');
const ban_tay = require('../../../assets/img/img_homescreen/ban_tay.png');
const chuong = require('../../../assets/img/img_homescreen/chuong.png');
const meetingdata = [
  {
    id: 1,
    title: 'Lịch khám mắt',
    content: 'Lịch khám Nội tổng quát',
    address: 'Bệnh viện Anh Quất, Tân Yên, Bắc Giang',
    doctor: 'BS. Nguyễn Văn A',
    time: new Date(),
    avatar: chong,
    name: 'Quất',
    type_user: 'Bạn',
    type: 1,
    type_title: 'Lịch đặt hẹn',
  },
  {
    id: 2,
    title: 'Lịch khám răng hàm mặt',
    message: 'Còn 4 ngày',
    content: 'Lịch khám mắt',
    address: 'Bệnh viện Anh Quất, Tân Yên, Bắc Giang',
    doctor: 'BS. Nguyễn Văn A',
    time: new Date(),
    avatar: chong,
    name: 'Quất',
    type_user: 'Bạn',
    type: 2,
    type_title: 'Lịch tái khám',
  },
];

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meetingtitlecolor: '',
      data: null,
      notification: null,
    };
  }

  componentDidMount = () => {
    // this.props.getUserInfoAction();
  };

  componentDidUpdate = (PrevProps, PrevState) => {
    if (
      PrevProps.createAppointmentReducer != this.props.createAppointmentReducer
    ) {
      if (this.props.createAppointmentReducer.isSuccess) {
        this.props.getUserInfoAction();
      }
    }
  };
  header = () => {
    const {user} = this.props.userInfoReducer.data;
    return (
      <ImageBackground
        style={{
          width: width,
          height: 'auto',
          aspectRatio: 3.05,
          paddingHorizontal: 20,
          marginTop: -1,
        }}
        // resizeMode="contain"
        source={
          isIphoneX()
            ? require('../../../assets/img/img_homescreen/header_s5_2.jpg')
            : require('../../../assets/img/img_homescreen/header_s5_1.jpg')
        }>
        <SafeAreaView>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: Platform.OS == 'android' ? 65 : isIphoneX() ? 45 : 50,
              marginLeft: width * 0.25,
              paddingVertical: 5,
              backgroundColor: 'white',
              borderRadius: 30,
              paddingHorizontal: 10,
              justifyContent: 'space-between',
              height: 33,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={ban_tay}
                style={{height: 25, width: 25, marginRight: 10}}
              />
              <Text
                style={{
                  color: COLOR_PRIMARY,
                  fontSize: textFontSize + 1,
                  fontWeight: 'bold',
                }}>
                {user.full_name}
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  };
  view_main = () => {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('CallHistory');
            }}
            style={{
              height: 100,
              flex: 1,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLOR_PRIMARY,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              Lịch sử cuộc gọi
            </Text>
          </TouchableOpacity>
          {/* <View style={{ width: 20 }} />
					<TouchableOpacity
						onPress={() => {
							this.props.navigation.navigate('VideoCall');
						}}
						style={{
							height: 100,
							flex: 1,
							borderRadius: 10,
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: COLOR_PRIMARY
						}}
					>
						<Text style={{ color: 'white', fontWeight: 'bold' }}>Bắt đầu trực cuộc gọi</Text>
					</TouchableOpacity> */}
        </View>
      </View>
    );
  };
  render() {
    return (
      <MView>
        {this.header()}
        {/* <VideoCall navigation={this.props.navigation} /> */}

        {this.view_main()}
      </MView>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userInfoReducer: state.userInfoReducer,
    createAppointmentReducer: state.createAppointmentReducer,
  };
};
export default connect(mapStateToProps, {getUserInfoAction})(HomeScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    flex: 1,
    width: width,
    height: height / 4,
    flexDirection: 'column-reverse',
  },
  header: {
    width: width,
    height: isIphoneX() ? width / 2 : width / 3,
    paddingHorizontal: 20,
  },
  money: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: width / 4,
    width: width / 1.12,
    marginTop: -height / 25,
    borderRadius: 10,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: height / 50,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  cardImg: {
    height: width / 6,
    width: width / 9,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  cardText: {
    fontSize: (width + height) / 100,
    textAlign: 'center',
    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
  },
  appointment: {
    width: width,
    flexDirection: 'column',
    marginTop: height / 25,
    alignSelf: 'center',
  },
  meetingReminder: {
    paddingVertical: 10,
    paddingLeft: 15,
    width: width * 0.92,
    minHeight: width * 0.3,
    marginHorizontal: 4,
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imgContainer: {
    flex: 1,
    height: width / 3,
    top: -width / 3.5,
  },
  img: {
    width: width / 2.2,
    resizeMode: 'contain',
  },
  makeappt: {
    marginTop: 10,
    padding: 10,
    backgroundColor: COLOR_PRIMARY,
    width: width / 3,
    borderRadius: 5,
    alignItems: 'center',
  },
});
