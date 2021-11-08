import React, { Component } from 'react';
import { View, TextInput, Text, Image, StyleSheet, ImageBackground, TouchableOpacity, Platform } from 'react-native';
import { width, height, TEXT_COLOR } from '../../utilities/config';
import { Input, Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MAlert from '../../components/MAlert';
import { PHONE_REGEX, PASS_REREX } from '../../utilities/config';
import { NButtonGoBack, NButton2 } from '../../components/NButton';
import { checkPresenterAction } from '../../redux/redux/checkPresenter';
import { connect } from 'react-redux';

class SignupScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			phoneNumber: '',
			password: '',
			passwordagain: '',
			introcoupon: '',
			hidePass: true,
			hidePassagain: true
		};
	}
	onChangePhone = (text) => {
		this.setState({ phoneNumber: text });
	};
	onChangePass = (text) => {
		this.setState({ password: text });
	};
	onChangePassagain = (text) => {
		this.setState({ passwordagain: text });
	};
	onChangeCoupon = (text) => {
		this.setState({ introcoupon: text });
	};
	onHidePass = () => {
		this.setState({ hidePass: !this.state.hidePass });
	};
	onHidePassagain = () => {
		this.setState({ hidePassagain: !this.state.hidePassagain });
	};
	componentDidUpdate(PrevProps, PrevState) {
		if (PrevProps.checkPresenterReducer != this.props.checkPresenterReducer) {
			if (this.props.checkPresenterReducer.isSuccess) {
				this.malert.showAlert(
					`Bạn sẽ nhận được mã số thông qua số điện thoại ${this.state.phoneNumber}`,
					() => {
						let data = this.props.route.params.data;
						data = {
							...data,
							phone: this.state.phoneNumber,
							password: this.state.password,
							presenter: this.state.introcoupon
						};
						this.props.navigation.navigate('InputVerifyCode', {
							data
						});
					},
					() => {}
				);
			}
			if (this.props.checkPresenterReducer.isError) {
				this.malert.showAlert(this.props.checkPresenterReducer.message, () => {});
			}
		}
	}

	handleSignup = () => {
		switch (true) {
			case !this.state.phoneNumber:
				this.malert.showAlert('Vui lòng nhập số điện thoại', () => {});
				break;
			case !PHONE_REGEX.test(this.state.phoneNumber):
				this.malert.showAlert('Vui lòng nhập đúng số điện thoại', () => {});
				break;
			case !this.state.password:
				this.malert.showAlert('Vui lòng nhập mật khẩu', () => {});
				break;
			case this.state.passwordagain != this.state.password:
				this.malert.showAlert('Hai mật khẩu không khớp nhau', () => {});
				break;
			case this.state.password.length < PASS_REREX:
				this.malert.showAlert(`Mật khẩu phải có ít nhât ${PASS_REREX} ký tự `, () => {});
				break;
			case this.state.introcoupon.length != 0:
				this.props.checkPresenterAction({
					presenter: this.state.introcoupon
				});
				break;
			default:
				this.malert.showAlert(
					`Bạn sẽ nhận được mã số thông qua số điện thoại ${this.state.phoneNumber}`,
					() => {
						let data = this.props.route.params.data;
						data = {
							...data,
							phone: this.state.phoneNumber,
							password: this.state.password
						};
						this.props.navigation.navigate('InputVerifyCode', {
							data
						});
					},
					() => {}
				);
				break;
		}
	};
	customInputIcon = (source, require = false) => {
		return (
			<View style={{ flexDirection: 'row', width: width / 14 }}>
				<Image style={styles.inputIcon} source={source} />
				{require && <Text style={{ color: 'red' }}>*</Text>}
			</View>
		);
	};
	render() {
		return (
			<View style={styles.container}>
				<ImageBackground
					source={require('../../assets/img/nen_tren.png')}
					style={styles.image}
					resizeMode="stretch"
				>
					<NButtonGoBack {...this.props} />

					<Text
						style={{
							color: 'white',
							textAlign: 'center',
							fontSize: 16,
							marginVertical: 10
						}}
					>
						Bạn sẽ tạo tài khoản mới với mã số
					</Text>
					<Text style={styles.title}>{this.props.checkAccountExistReducer.data.user_code}</Text>
				</ImageBackground>
				<KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
					<View style={styles.inputContainer}>
						<Input
							label={
								this.state.phoneNumber ? <Text style={styles.labelStyle}>Số điện thoại *</Text> : null
							}
							placeholder="Nhập số điện thoại"
							keyboardType="numeric"
							returnKeyType="done"
							maxLength={10}
							inputContainerStyle={styles.input}
							inputStyle={{ fontSize: 14 }}
							onChangeText={(text) => this.onChangePhone(text)}
							value={this.state.phoneNumber}
							leftIcon={this.customInputIcon(require('../../assets/img/account.png'), true)}
						/>
						<Input
							label={this.state.password ? <Text style={styles.labelStyle}>Mật khẩu *</Text> : null}
							placeholder="Nhập mật khẩu"
							secureTextEntry={this.state.hidePass}
							inputContainerStyle={styles.input}
							inputStyle={{ fontSize: 14 }}
							onChangeText={(text) => this.onChangePass(text)}
							value={this.state.password}
							leftIcon={this.customInputIcon(require('../../assets/img/password.png'), true)}
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
						<Input
							label={
								this.state.passwordagain ? (
									<Text style={styles.labelStyle}>Nhập lại mật khẩu *</Text>
								) : null
							}
							placeholder="Nhập lại mật khẩu"
							inputContainerStyle={styles.input}
							secureTextEntry={this.state.hidePassagain ? true : false}
							inputStyle={{ fontSize: 14 }}
							onChangeText={(text) => this.onChangePassagain(text)}
							value={this.state.passwordagain}
							leftIcon={this.customInputIcon(require('../../assets/img/password.png'), true)}
							rightIcon={
								this.state.hidePassagain ? (
									<TouchableOpacity onPress={() => this.onHidePassagain()}>
										<Image
											style={styles.inputrightIcon}
											source={require('../../assets/img/hide.png')}
										/>
									</TouchableOpacity>
								) : (
									<TouchableOpacity onPress={() => this.onHidePassagain()}>
										<Image
											style={styles.inputrightIcon}
											source={require('../../assets/img/view.png')}
										/>
									</TouchableOpacity>
								)
							}
						/>
						<Input
							label={this.state.introcoupon ? <Text style={styles.labelStyle}>Mã giới thiệu</Text> : null}
							placeholder="Nhập mã giới thiệu"
							inputContainerStyle={styles.input}
							inputStyle={{ fontSize: 14 }}
							onChangeText={(text) => this.onChangeCoupon(text)}
							value={this.state.introcoupon}
							leftIcon={
								<Image
									style={styles.inputIcon}
									source={require('../../assets/img/ma_gioi_thieu.png')}
								/>
							}
						/>

						<NButton2 onPress={this.handleSignup} text="TIẾP TỤC" />
					</View>
				</KeyboardAwareScrollView>

				<MAlert ref={(ref) => (this.malert = ref)} />
			</View>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		checkPresenterReducer: state.checkPresenterReducer,
		checkAccountExistReducer: state.checkAccountExistReducer
	};
};

export default connect(mapStateToProps, { checkPresenterAction })(SignupScreen);

const styles = StyleSheet.create({
	labelStyle: {
		color: TEXT_COLOR,
		fontWeight: 'bold'
	},

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
		//flex: 0.5,
		height: height / 3.5,
		flexDirection: 'column',
		justifyContent: 'flex-end',
		backgroundColor: 'white',
		marginTop: -1
		//paddingBottom: height/10
	},
	inputContainer: {
		flex: 1,
		flexDirection: 'column',
		marginTop: height / 20,
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
		height: height / 30
	},
	signup: {
		backgroundColor: '#3384c5',
		borderRadius: 5
	},
	forgetPass: {
		color: '#d9d9da',
		justifyContent: 'center',
		textAlign: 'center',
		paddingRight: 2,
		marginTop: height / 25
	},
	signin: {
		color: '#3a3839',
		justifyContent: 'center',
		textAlign: 'center',
		marginTop: height / 25,
		paddingLeft: 2,
		fontWeight: 'bold'
	},
	inputIcon: {
		width: width / 20,
		height: width / 20,
		resizeMode: 'contain'
	}
});
