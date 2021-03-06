import React, { Component } from 'react';
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity, Image, TouchableHighlight } from 'react-native';
import { Input } from 'react-native-elements';
import MView from '../../components/MView';
import { width, COLOR_PRIMARY, TEXT_COLOR, COLOR_WHITEGRAY, height } from '../../utilities/config';
import { textFontSize } from '../../utilities/Styles';
import MAlert from '../../components/MAlert';
import { REGEX_BHYT, dateDDMMYYYY, dateYYYYMMDD } from '../../utilities/StringHelper';
import { checkAccountExistAction } from '../../redux/redux/checkAccountExist';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NButton, { NButton2, NButtonGoBack } from '../../components/NButton';
import { isIphoneX } from 'react-native-iphone-x-helper';
import DateTimePicker from 'react-native-modal-datetime-picker';
import IconPro from 'react-native-vector-icons/FontAwesome5Pro';
import { CommonActions } from '@react-navigation/native';

const nen = require('../../assets/img/nen_tren.png');
const birthday = require('../../assets/img/img_account/birthday.png');

class SignupOption extends Component {
	constructor(props) {
		super(props);
		this.state = {
			optyt: COLOR_PRIMARY,
			optcmt: '#f2f1f0',
			choice: 'BHYT',
			bhyt: '',
			cmnd: '',
			date: null,
			showDatePicker: false
		};
	}

	changeOption = (option) => () => {
		// if (option === 'BHYT') {
		// 	this.setState({
		// 		choice: 'BHYT',
		// 		optyt: COLOR_PRIMARY,
		// 		optcmt: '#f2f1f0'
		// 	});
		// } else if (option === 'CMND') {
		// 	this.setState({
		// 		choice: 'CMND',
		// 		optcmt: COLOR_PRIMARY,
		// 		optyt: '#f2f1f0'
		// 	});
		// }
		this.setState({
			choice: option
		});
	};

	onChangeBHYT = (bhyt) => {
		this.setState({ bhyt, cmnd: '' });
	};
	onChangeCMND = (cmnd) => {
		this.setState({ cmnd, bhyt: '' });
	};

	nextStage = () => {
		if (this.state.choice === 'BHYT') {
			if (!this.state.bhyt) {
				this.malert.showAlert('Vui l??ng kh??ng ????? tr???ng th??ng tin', () => {});
			} else if (!this.state.date) {
				this.malert.showAlert('B???n ph???i nh???p ng??y sinh', () => {});
			} else if (!REGEX_BHYT.test(this.state.bhyt)) {
				this.malert.showAlert('B???n ph???i nh???p ????ng m?? s??? b???o hi???m y t???', () => {});
			} else if (!this.state.isAccept) {
				this.malert.showAlert('B???n ph???i ?????ng ?? v???i ch??nh s??ch b???o m???t', () => {});
			} else {
				let body = {
					bhyt: {
						so_bhyt: this.state.bhyt
					},
					date_of_bird: dateYYYYMMDD(this.state.date)
				};
				this.props.checkAccountExistAction(body);
			}
		} else if (this.state.choice === 'CMND') {
			if (!this.state.cmnd) {
				this.malert.showAlert('Vui l??ng kh??ng ????? tr???ng th??ng tin', () => {});
			} else if (!this.state.date) {
				this.malert.showAlert('B???n ph???i nh???p ng??y sinh', () => {});
			} else if (this.state.cmnd.length != 9 && this.state.cmnd.length != 12) {
				this.malert.showAlert('B???n ph???i nh???p ????ng s??? CMND/CCCD', () => {});
			}
			if (!this.state.isAccept) {
				this.malert.showAlert('B???n ph???i ?????ng ?? v???i ch??nh s??ch b???o m???t', () => {});
			} else {
				let body = {
					identity: {
						so_cmt: this.state.cmnd
					},
					date_of_bird: dateYYYYMMDD(this.state.date)
				};
				this.props.checkAccountExistAction(body);
			}
		}
	};
	componentDidUpdate(PrevProps, PrevState) {
		if (PrevProps.checkAccountExistReducer != this.props.checkAccountExistReducer) {
			if (this.props.checkAccountExistReducer.isSuccess) {
				if (this.state.choice === 'BHYT') {
					this.props.navigation.navigate('SignupScreen', {
						data: { bhyt: this.state.bhyt, date: this.state.date }
					});
				}
				if (this.state.choice === 'CMND') {
					this.props.navigation.navigate('SignupScreen', {
						data: { cmnd: this.state.cmnd, date: this.state.date }
					});
				}
			}
			if (this.props.checkAccountExistReducer.isError) {
				this.malert.showAlert(
					this.props.checkAccountExistReducer.message,
					() => {
						// this.props.navigation.navigate("SigninScreen");
					},
					() => {}
				);
			}
		}
	}
	toggleStartDatePicker() {
		this.setState({ showDatePicker: !this.state.showDatePicker });
	}
	handleBirthDayPicker(time) {
		this.setState({
			date: time,
			showDatePicker: false
		});
	}
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
			<MView style={{ backgroundColor: 'white' }}>
				<ImageBackground source={nen} style={styles.image}>
					{/* <NButtonGoBack {...this.props} /> */}
					<Text style={styles.title}>????ng k?? t??i kho???n v???i:</Text>
				</ImageBackground>
				<KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
					<View style={styles.container}>
						<View style={styles.optionContainer}>
							<TouchableOpacity
								activeOpacity={1}
								onPress={this.changeOption('BHYT')}
								style={this.state.choice == 'BHYT' ? styles.optionButtonActive : styles.optionButton}
							>
								<Text style={this.state.choice == 'BHYT' ? styles.optionTextActive : styles.optionText}>
									S??? th??? BHYT
								</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.optionContainer}>
							<TouchableOpacity
								activeOpacity={1}
								onPress={this.changeOption('CMND')}
								style={this.state.choice != 'BHYT' ? styles.optionButtonActive : styles.optionButton}
							>
								<Text style={this.state.choice != 'BHYT' ? styles.optionTextActive : styles.optionText}>
									S??? CMND/CCCD
								</Text>
							</TouchableOpacity>
						</View>
					</View>

					{this.state.choice === 'BHYT' ? (
						<Input
							onChangeText={(text) => {
								this.onChangeBHYT(text);
							}}
							autoCapitalize="characters"
							value={this.state.bhyt}
							inputContainerStyle={styles.input}
							maxLength={15}
							returnKeyType="done"
							inputStyle={styles.inputStyle}
							placeholder="Nh???p m?? s??? th??? b???o hi???m y t???"
						/>
					) : (
						<Input
							onChangeText={(text) => {
								this.onChangeCMND(text);
							}}
							value={this.state.cmnd}
							inputContainerStyle={styles.input}
							inputStyle={{ fontSize: this.state.cmnd ? textFontSize * 1.3 : textFontSize }}
							maxLength={12}
							numberOfLines={1}
							keyboardType="numeric"
							returnKeyType="done"
							placeholder="Nh???p s??? ch???ng minh nh??n d??n / c??n c?????c c??ng d??n"
						/>
					)}
					<Input
						placeholder="Ch???n ng??y sinh"
						keyboardType="numeric"
						returnKeyType="done"
						maxLength={10}
						inputContainerStyle={styles.input}
						inputStyle={{ fontSize: 14 }}
						editable={false}
						value={this.state.date ? dateDDMMYYYY(this.state.date) : ''}
						leftIcon={this.customInputIcon(birthday, true)}
						rightIcon={
							<TouchableOpacity
								onPress={() => {
									this.setState({ showDatePicker: true });
								}}
								style={{
									width: 50,
									height: 40,
									justifyContent: 'center',
									alignItems: 'center'
								}}
							>
								<IconPro name="angle-down" color="#3384c5" size={textFontSize * 2} />
							</TouchableOpacity>
						}
					/>
					<Text style={{ textAlign: 'center', color: TEXT_COLOR, marginHorizontal: 10 }}>
						L??u ??: T??i kho???n s??? ???????c t???o d???a tr??n ng??y sinh c???a b???n, b???n ph???i nh???p ng??y sinh ch??nh x??c
					</Text>
					<DateTimePicker
						locale="vi-VN"
						mode={'date'}
						confirmTextIOS="X??c nh???n"
						cancelTextIOS="Hu???"
						display="spinner"
						headerTextIOS="Ch???n ng??y sinh"
						date={!this.state.date ? new Date('2000-01-01') : new Date(this.state.date)}
						maximumDate={new Date()}
						onConfirm={(date) => {
							this.handleBirthDayPicker(date);
							// this.setState({ showDatePicker: false });
						}}
						onCancel={() => this.setState({ showDatePicker: false })}
						// onDateChange={(time) => this.handleBirthDayPicker(time)}
						isVisible={this.state.showDatePicker}
						// minimumDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
					/>
					<View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', paddingHorizontal: 20 }}>
						<TouchableOpacity
							onPress={() => {
								this.setState({
									isAccept: !this.state.isAccept
								});
							}}
							style={{ marginRight: 10 }}
						>
							{this.state.isAccept ? (
								<IconPro name="check-square" color={COLOR_PRIMARY} size={25} light />
							) : (
								<IconPro name="square" color={COLOR_PRIMARY} size={25} light />
							)}
						</TouchableOpacity>
						<Text
							style={{
								color: TEXT_COLOR,
								flex: 1
							}}
						>
							B???ng vi???c ???n ti???p t???c, b???n ???? ?????ng ?? v???i {' '}
							<Text
								style={{ color: COLOR_PRIMARY }}
								onPress={() => {
									this.props.navigation.navigate('Policy');
								}}
							>
								ch??nh s??ch b???o m???t th??ng tin{' '}
							</Text>
							c???a ch??ng t??i
						</Text>
					</View>
					<NButton2
						isLoading={this.props.checkAccountExistReducer.isLoading}
						onPress={this.nextStage}
						text="TI???P T???C"
						style={{ backgroundColor: COLOR_PRIMARY }}
					/>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'center',
							marginVertical: width / 20
						}}
					>
						<Text style={styles.forgetPass}>???? c?? t??i kho???n</Text>
						<Text
							onPress={() =>
								this.props.navigation.dispatch(
									CommonActions.reset({
										index: 1,
										routes: [ { name: 'SigninStack' } ]
									})
								)}
							style={styles.register}
						>
							????ng nh???p
						</Text>
					</View>
				</KeyboardAwareScrollView>

				<MAlert ref={(ref) => (this.malert = ref)} />
			</MView>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		checkAccountExistReducer: state.checkAccountExistReducer
	};
};

export default connect(mapStateToProps, { checkAccountExistAction })(SignupOption);

const styles = StyleSheet.create({
	input: {
		borderBottomWidth: 0,
		borderRadius: 5,
		paddingTop: 5,
		paddingBottom: 5,
		paddingRight: 15,
		paddingLeft: 15,
		marginHorizontal: 10,
		backgroundColor: '#eeeeee'
	},
	inputleftIcon: {
		marginRight: 8,
		width: width / 15,
		height: height / 30,
		resizeMode: 'contain'
	},
	container: {
		marginHorizontal: width / 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: width / 20
	},

	image: {
		//flex: 0.5,
		width: width,
		height: 'auto',
		aspectRatio: 1.813,
		padding: width / 20,
		flexDirection: 'column',
		justifyContent: 'flex-end',
		backgroundColor: 'white',
		marginTop: -1
		//paddingBottom: height/10
	},
	title: {
		textAlign: 'center',
		alignItems: 'flex-end',
		color: 'white',
		fontSize: textFontSize * 1.5,
		fontWeight: 'bold',
		paddingBottom: width / 5
	},
	optionButtonActive: {
		//paddingHorizontal: width/6,
		paddingVertical: 15,
		borderRadius: width,
		alignItems: 'center',
		backgroundColor: '#B3E4FF'
	},
	optionButton: {
		//paddingHorizontal: width/6,
		paddingVertical: 10,
		borderRadius: width,
		alignItems: 'center'
	},
	optionText: {
		color: TEXT_COLOR
	},
	optionTextActive: {
		fontWeight: 'bold',
		color: TEXT_COLOR
	},
	optionContainer: {
		width: width / 2.5,
		marginHorizontal: width / 20
	},
	inputContainer: {
		backgroundColor: COLOR_WHITEGRAY,
		padding: 5,
		marginTop: width / 20,
		marginHorizontal: width / 20,
		borderRadius: 5,
		height: width / 7,
		alignItems: 'center',
		alignSelf: 'center',
		width: width / 1.1,
		borderBottomWidth: 0
	},
	inputContainerStyle: {
		borderBottomWidth: 0
	},
	inputStyle: {
		fontSize: textFontSize * 1.3

		// letterSpacing: 1
	},
	register: {
		color: '#3a3839',
		justifyContent: 'center',
		textAlign: 'center',
		fontWeight: 'bold',
		marginLeft: 5,
		fontSize: textFontSize * 1.1
	},
	forgetPass: {
		color: '#d9d9da',
		justifyContent: 'center',
		textAlign: 'center',
		marginRight: 5,
		fontSize: textFontSize * 1.1
	},
	inputIcon: {
		width: width / 25,
		height: width / 25,
		resizeMode: 'contain'
	}
});
