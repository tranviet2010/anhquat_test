import React, { Component } from 'react';
import { View, TextInput, Text, Image, StyleSheet, ImageBackground, TouchableOpacity, Platform } from 'react-native';
import { width, height } from '../../utilities/config';
import { Input, Button } from 'react-native-elements';
import MAlert from '../../components/MAlert';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { PHONE_REGEX, PASS_REREX } from '../../utilities/config';
import { loginAction } from '../../redux/redux/login';
import { subcribeAction } from '../../redux/redux/subcribe';
import { connect } from 'react-redux';
import { CommonActions, StackActions } from '@react-navigation/native';
import { textFontSize } from '../../utilities/Styles';
import { NButtonGoBack } from '../../components/NButton';
import MAsyncStorage from '../../utilities/MAsyncStorage';
import DeviceInfo from 'react-native-device-info';
import { IS_PUBLISH } from '../../services/Services';

class SigninScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//   phoneNumber: "190719970001",
			phoneNumber:
				this.props.route.params && this.props.route.params.user_code ? this.props.route.params.user_code : '',
			password:
				this.props.route.params && this.props.route.params.password ? this.props.route.params.password : '',
			hidePass: true
		};
	}
	onChangePhone = (text) => {
		this.setState({ phoneNumber: text });
	};
	onChangePass = (text) => {
		this.setState({ password: text });
	};
	onHidePass = () => {
		this.setState({ hidePass: !this.state.hidePass });
	};
	componentDidUpdate(PrevProps) {
		if (this.props.loginReducer != PrevProps.loginReducer) {
			if (this.props.loginReducer.isError) {
				this.malert.showAlert(this.props.loginReducer.message, () => {});
			}
		}
		if (PrevProps.userInfoReducer != this.props.userInfoReducer) {
			console.log('aaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbb', this.props.userInfoReducer.data);
			if (this.props.userInfoReducer.data.user) {
				this.subcribe();
				this.go_main();
			}
		}
	}

	subcribe = async () => {
		// let deviceId = DeviceInfo.getDeviceId();
		// console.log(deviceId)
		let token = await MAsyncStorage.getDeviceToken();
		let body = {
			token,
			app_version: DeviceInfo.getVersion(),
			os: Platform.OS
		};
		console.log(body);
		this.props.subcribeAction(body);
	};
	go_main = () => {
		this.props.navigation.dispatch(
			CommonActions.reset({
				index: 1,
				routes: [
					{
						name:
							this.props.userInfoReducer.data.user.type == 'user'
								? 'AfterLoginStack'
								: this.props.userInfoReducer.data.user.type == 'doctor'
									? 'AfterLoginDoctorStack'
									: 'AfterLoginAdminStack'
					}
				]
			})
		);
	};
	handleSignin = () => {
		if (IS_PUBLISH || this.state.phoneNumber == '290419920001') {
			if (this.state.phoneNumber.length == 10 || this.state.password.length < PASS_REREX) {
				this.malert.showAlert('Vui lòng nhập đúng mã số tài khoản và mật khẩu', () => {});
			} else {
				let body = {
					user_code: this.state.phoneNumber,
					password: this.state.password
				};
				this.props.loginAction(body);
			}
		} else {
			this.malert.showAlert('Chức năng sẽ sớm được ra mắt trong thời gian tới. Xin cảm ơn.', () => {});
		}
	};
	render() {
		return (
			<View style={styles.container}>
				<ImageBackground
					source={require('../../assets/img/nen_tren.png')}
					resizeMode="stretch"
					style={styles.image}
				>
					{/* <NButtonGoBack {...this.props} /> */}
					<Text style={styles.title}>Chào mừng bạn!</Text>
				</ImageBackground>
				<KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
					<View style={styles.inputContainer}>
						<Input
							placeholder="Mã số tài khoản"
							keyboardType="numeric"
							inputContainerStyle={styles.input}
							inputStyle={{ fontSize: textFontSize * 1.1 }}
							placeholderStyle={styles.placeholderStyle}
							value={this.state.phoneNumber}
							onChangeText={(text) => this.onChangePhone(text)}
							leftIcon={
								<Image style={styles.inputleftIcon} source={require('../../assets/img/account.png')} />
							}
						/>
						<Input
							placeholder="Nhập mật khẩu"
							inputContainerStyle={styles.input}
							secureTextEntry={this.state.hidePass}
							onChangeText={(text) => this.onChangePass(text)}
							value={this.state.password}
							inputStyle={{ fontSize: textFontSize * 1.1 }}
							leftIcon={
								<Image style={styles.inputleftIcon} source={require('../../assets/img/password.png')} />
							}
							rightIcon={
								this.state.hidePass ? (
									<TouchableOpacity onPress={() => this.onHidePass()}>
										<Image
											style={styles.inputrightIcon}
											source={require('../../assets/img/hide.png')}
										/>
									</TouchableOpacity>
								) : (
									<TouchableOpacity onPress={() => this.onHidePass()}>
										<Image
											style={styles.inputrightIcon}
											source={require('../../assets/img/view.png')}
										/>
									</TouchableOpacity>
								)
							}
						/>

						<TouchableOpacity style={styles.signin} onPress={() => this.handleSignin()}>
							<Text
								style={{
									textAlign: 'center',
									color: '#ffffff',
									fontWeight: 'bold'
								}}
							>
								ĐĂNG NHẬP
							</Text>
						</TouchableOpacity>
						<View>
							<Text style={styles.forgetPass}>Quên mật khẩu</Text>
							<Text
								onPress={() => {
									if (IS_PUBLISH) {
										this.props.navigation.dispatch(
											CommonActions.reset({
												index: 1,
												routes: [ { name: 'SignupStack' } ]
											})
										);
									} else {
										this.malert.showAlert(
											'Chức năng sẽ sớm được ra mắt trong thời gian tới. Xin cảm ơn.',
											() => {}
										);
									}
								}}
								style={styles.register}
							>
								Đăng ký
							</Text>
						</View>
					</View>
				</KeyboardAwareScrollView>
				<MAlert ref={(ref) => (this.malert = ref)} />
			</View>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		loginReducer: state.loginReducer,
		userInfoReducer: state.userInfoReducer,
		subcribeReducer: state.subcribeReducer
	};
};

export default connect(mapStateToProps, { loginAction, subcribeAction })(SigninScreen);

const styles = StyleSheet.create({
	// common

	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'white'
	},
	title: {
		textAlign: 'center',
		alignItems: 'flex-end',
		color: 'white',
		fontSize: width / 18,
		fontWeight: 'bold',
		paddingBottom: height / 15
	},
	image: {
		height: height / 3.5,
		flexDirection: 'column',
		justifyContent: 'flex-end',
		backgroundColor: 'white',
		marginTop: -1
	},
	placeholderStyle: {
		fontWeight: 'bold',
		color: 'red'
	},
	inputContainer: {
		flex: 1,
		flexDirection: 'column',
		marginTop: height / 10,
		marginRight: width / 40,
		marginLeft: width / 40
	},
	input: {
		borderBottomWidth: 0,
		borderRadius: 5,
		paddingTop: 5,
		paddingBottom: 5,
		paddingRight: 15,
		paddingLeft: 15,
		backgroundColor: '#eeeeee'
	},
	inputleftIcon: {
		marginRight: 8,
		width: width / 15,
		height: height / 30,
		resizeMode: 'contain'
	},
	inputrightIcon: {
		marginLeft: 8,
		width: width / 15,
		height: height / 30,
		resizeMode: 'contain'
	},
	signin: {
		backgroundColor: '#3384c5',
		paddingTop: height / 55,
		paddingBottom: height / 55,
		borderRadius: 5,
		marginLeft: width / 40,
		marginRight: width / 40
	},
	forgetPass: {
		color: '#d9d9da',
		justifyContent: 'center',
		textAlign: 'center',
		marginTop: height / 25
	},
	register: {
		color: '#3a3839',
		justifyContent: 'center',
		textAlign: 'center',
		marginTop: 10,
		fontWeight: 'bold'
	}

	// singin
});
