/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Image,
	ImageBackground,
	ActivityIndicator
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { width, height, COLOR_BACKGROUND_TEXT_INPUT, COLOR_PRIMARY } from '../../utilities/config';
import MAlert from '../../components/MAlert';
import { loginAction } from '../../redux/redux/login';
import { connect } from 'react-redux';
import AppIntroSlider from 'react-native-app-intro-slider';
import MAsyncStorage from '../../utilities/MAsyncStorage';
import { textFontSize } from '../../utilities/Styles';
import { IS_PUBLISH } from '../../services/Services';
import { CommonActions } from '@react-navigation/native';

// import Login1 from './Login/Login1'
const slides = [
	{
		key: 1,
		title: 'Kết nối dễ dàng',
		text: ' Đây là ứng dụng CSKH giúp bạn kết nối với bệnh viện đa khoa Anh Quất nhanh chóng và thuận tiện nhất',
		image: require('../../assets/img/ha_gioi_thieu_1.png'),
		backgroundColor: '#59b2ab'
	},
	{
		key: 2,
		title: 'Đặt lịch khám tại nhà:',
		text: ' Bạn có thể đặt lịch khám ngay tại nhà.Ứng dụng hỗ trợ nhắc nhở thông báo lịch tái khám',
		image: require('../../assets/img/ha_gioi_thieu_2.png'),
		backgroundColor: '#febe29'
	},
	{
		key: 3,
		title: 'Tư vẫn miễn phí',
		text: ' Các bác sỹ của chúng tôi tư vấn miễn phí cho bạn 24h ngay trên ứng dụng',
		image: require('../../assets/img/ha_gioi_thieu_3.png'),
		backgroundColor: '#22bcb5'
	}
];
class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			phone: '',
			chooseSignupin: false
		};
	}
	componentDidMount = async () => {
		let count_open_app = await MAsyncStorage.getCountOpenApp();
		this.setState({ count_open_app });
	};
	onDone = () => {
		this.setState({ chooseSignupin: true });
	};

	_renderItem = ({ item }) => {
		return (
			<View style={styles.container} key={item.key}>
				<ImageBackground source={item.image} style={styles.image}>
					<View style={styles.textbox}>
						<Text style={styles.text1}>{item.title}</Text>
						<Text style={styles.text2}>{item.text}</Text>
						{/* <TouchableOpacity style={styles.TouchableOpacity}>
              <Text style={{textAlign: "center", color: "#009887"}}>Tiếp tục</Text>
            </TouchableOpacity> */}
					</View>
				</ImageBackground>
			</View>
		);
	};
	_renderNextButton = () => {
		return (
			<View style={styles.buttonNext}>
				<Text>Tiếp tục</Text>
			</View>
		);
	};

	render() {
		console.log('choose sign up in', this.state.chooseSignupin);
		console.log('count open app', this.state.count_open_app);
		if (this.state.count_open_app) {
			if (!this.state.chooseSignupin && parseInt(this.state.count_open_app) == 1) {
				return (
					<AppIntroSlider
						data={slides}
						onDone={this.onDone}
						keyExtractor={(item) => item.key + ''}
						renderItem={this._renderItem}
						renderNextButton={this._renderNextButton}
						doneLabel="Bắt đầu"
					/>
				);
			} else {
				return (
					<View style={styles.container}>
						<ImageBackground source={require('../../assets/img/ha_gioi_thieu_4.png')} style={styles.image}>
							<View style={styles.textbox}>
								<Text style={styles.text1}>
									Đăng nhập để sử dụng các {'\n'}
									tiện ích
								</Text>
								<Text style={styles.text2}>
									Bạn cần đăng nhập hoặc đăng ký tài khoản để sử dụng các tiện ích của ứng dụng
								</Text>
								<View style={{ flexDirection: 'row', marginTop: height / 12 }}>
									<Text
										onPress={() => {
											if (IS_PUBLISH) {
												this.props.navigation.dispatch(
													CommonActions.reset({
														index: 1,
														routes: [ { name: 'SigninStack' } ]
													})
												);
											} else {
												this.malert.showAlert(
													'Chức năng sẽ sớm được ra mắt trong thời gian tới. Xin cảm ơn.',
													() => {}
												);
											}
										}}
										style={styles.signup}
									>
										Đăng ký
									</Text>
									<Text
										onPress={() =>
											this.props.navigation.dispatch(
												CommonActions.reset({
													index: 1,
													routes: [ { name: 'SignupStack' } ]
												})
											)}
										style={styles.signin}
									>
										Đăng nhập
									</Text>
								</View>
							</View>
						</ImageBackground>
						<MAlert ref={(ref) => (this.malert = ref)} />
					</View>
				);
			}
		} else {
			return null;
		}
	}
}

const styles = StyleSheet.create({
	buttonCircle: {
		width: 40,
		height: 40,
		backgroundColor: 'rgba(0, 0, 0, .2)',
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center'
	},
	container: {
		flex: 1,
		flexDirection: 'column'
	},
	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'flex-end',
		flexDirection: 'column'
	},
	textbox: {
		marginLeft: width / 15,
		marginRight: width / 10,
		color: 'white',
		flex: 1,
		justifyContent: 'center',
		marginBottom: height / 11,
		marginTop: height / 1.8
	},
	text1: {
		color: 'white',
		fontSize: textFontSize * 1.5,
		fontWeight: 'bold'
	},
	text2: {
		color: 'white',
		marginTop: width / 20,
		fontSize: textFontSize
	},
	buttonNext: {
		backgroundColor: 'white',
		padding: 10,
		paddingLeft: width / 15,
		paddingRight: width / 15,
		borderRadius: 40,
		width: width / 3.5,
		textAlign: 'center'
	},
	signin: {
		backgroundColor: 'white',
		padding: 15,
		paddingLeft: width / 15,
		paddingRight: width / 15,
		borderRadius: 10,
		width: width / 10,
		color: '#3384c5',
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		fontSize: textFontSize * 1.1,
		fontWeight: 'bold'
	},
	signup: {
		padding: 15,
		color: 'white',
		paddingLeft: width / 15,
		paddingRight: width / 15,
		borderRadius: 40,
		width: width / 3.5,
		textAlign: 'center',
		justifyContent: 'center',
		flex: 1,
		fontSize: textFontSize * 1.1
	}
});

const mapStateToProps = (state) => {
	return {
		loginReducer: state.loginReducer
	};
};

export default connect(mapStateToProps, { loginAction })(Login);
