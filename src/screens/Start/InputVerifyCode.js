import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import MView from '../../components/MView';
import { width, TEXT_COLOR, COLOR_PRIMARY, COLOR_WHITEGRAY } from '../../utilities/config';
import { textFontSize } from '../../utilities/Styles';
import { Input } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NButtonGoBack, NButton2 } from '../../components/NButton';
import { sendSMSOTPAction } from '../../redux/redux/sendSMSOTP';
const nen = require('../../assets/img/nen_tren.png');
const BACKSPACE = 'Backspace';
import { connect } from 'react-redux';
import MAlert from '../../components/MAlert';

class InputVerifyCode extends Component {
	constructor(props) {
		super(props);
		this.input = React.createRef();
		this.otp = this.create_otp() + '';
		this.state = {
			n1: '',
			n2: '',
			n3: '',
			n4: '',
			n5: '',
			n6: '',
			content: 'Ma so xac thuc cua ban la ' + this.otp
		};
	}
	submit = () => {
		const { n1, n2, n3, n4, n5, n6 } = this.state;
		if (n1 && n2 && n3 && n4 && n5 && n6) {
			let otp = n1 + n2 + n3 + n4 + n5 + n6;
			if (otp == this.otp) {
				let data = this.props.route.params.data;
				this.props.navigation.navigate('UserInformation', {
					data
				});
			} else {
				this.malert.showAlert('Mã xác thực không đúng. Vui lòng kiểm tra lại', () => {});
			}
		} else {
			this.malert.showAlert('Vui lòng nhập đúng mã xác thực', () => {});
		}
	};
	create_otp = () => {
		return Math.floor(100000 + Math.random() * 900000);
	};
	componentDidMount() {
		let data = this.props.route.params.data;
		let phone = data.phone;
		if (phone[0] == '0') {
			phone = '84' + phone.substr(1);
		}
		if (phone[0] == '+') {
			phone = phone.substr(1);
		}
		// alert(phone);
		this.props.sendSMSOTPAction({
			content: this.state.content,
			numberphone: phone
		});
	}

	onChangeInput1 = (text) => {
		if (text) {
			this.input2.focus();
		}
		this.setState({ n1: text });
	};
	onChangeInput2 = (text) => {
		if (text) {
			this.input3.focus();
		}
		this.setState({ n2: text });
	};
	onChangeInput3 = (text) => {
		if (text) {
			this.input4.focus();
		}
		this.setState({ n3: text });
	};
	onChangeInput4 = (text) => {
		if (text) {
			this.input5.focus();
		}
		this.setState({ n4: text });
	};
	onChangeInput5 = (text) => {
		if (text) {
			this.input6.focus();
		}
		this.setState({ n5: text });
	};
	onChangeInput6 = (text) => {
		this.setState({ n6: text });
	};
	handleKeyPress = ({ nativeEvent: { key: keyValue } }, number_input) => {
		// let a = { nativeEvent: { key: keyValue } };
		if (keyValue === BACKSPACE) {
			this.handleKeyPressed(number_input);
		}
	};

	handleKeyPressed = (number_input) => {
		switch (number_input) {
			case 1:
				this.setState({ n1: '', n2: '', n3: '', n4: '', n5: '', n6: '' }, () => {
					this.input1.focus();
				});
				break;
			case 2:
				if (this.state.n2) {
					this.setState({ n2: '', n3: '', n4: '', n5: '', n6: '' }, () => {
						this.input2.focus();
					});
				} else {
					this.setState({ n1: '', n2: '', n3: '', n4: '', n5: '', n6: '' }, () => {
						this.input1.focus();
					});
				}
				break;
			case 3:
				if (this.state.n3) {
					this.input3.focus();
					this.setState({ n3: '', n4: '', n5: '', n6: '' });
				} else {
					this.input2.focus();
					this.setState({ n2: '', n3: '', n4: '', n5: '', n6: '' });
				}
				break;
			case 4:
				if (this.state.n4) {
					this.input4.focus();
					this.setState({ n4: '', n5: '', n6: '' });
				} else {
					this.input3.focus();
					this.setState({ n3: '', n4: '', n5: '', n6: '' });
				}
				break;
			case 5:
				if (this.state.n5) {
					this.input5.focus();
					this.setState({ n5: '', n6: '' });
				} else {
					this.input4.focus();
					this.setState({ n4: '', n5: '', n6: '' });
				}
				break;
			case 6:
				if (this.state.n6) {
					this.input6.focus();
					this.setState({ n6: '' });
				} else {
					this.input5.focus();
					this.setState({ n5: '', n6: '' });
				}
				break;
			default:
				break;
		}
	};

	inputCode = () => {
		return (
			<View
				style={[
					styles.container,
					{
						flexDirection: 'row',
						margin: 0,
						alignItems: 'center',
						justifyContent: 'center'
					}
				]}
			>
				<Input
					keyboardType="numeric"
					maxLength={1}
					containerStyle={styles.inputContainer}
					inputContainerStyle={styles.inputContainerStyle}
					inputStyle={styles.inputStyle}
					placeholder="-"
					textAlign={'center'}
					autoFocus
					ref={(input) => {
						this.input1 = input;
					}}
					value={this.state.n1}
					onChangeText={(text) => {
						this.onChangeInput1(text);
					}}
					onKeyPress={(e) => this.handleKeyPress(e, 1)}
				/>
				<Input
					keyboardType="numeric"
					maxLength={1}
					containerStyle={styles.inputContainer}
					inputContainerStyle={styles.inputContainerStyle}
					inputStyle={styles.inputStyle}
					placeholder="-"
					textAlign={'center'}
					value={this.state.n2}
					ref={(input) => {
						this.input2 = input;
					}}
					onChangeText={(text) => {
						this.onChangeInput2(text);
					}}
					onKeyPress={(e) => this.handleKeyPress(e, 2)}
				/>
				<Input
					keyboardType="numeric"
					maxLength={1}
					containerStyle={styles.inputContainer}
					inputContainerStyle={styles.inputContainerStyle}
					inputStyle={styles.inputStyle}
					placeholder="-"
					textAlign={'center'}
					value={this.state.n3}
					ref={(input) => {
						this.input3 = input;
					}}
					onChangeText={(text) => {
						this.onChangeInput3(text);
					}}
					onKeyPress={(e) => this.handleKeyPress(e, 3)}
				/>
				<Input
					keyboardType="numeric"
					maxLength={1}
					containerStyle={styles.inputContainer}
					inputContainerStyle={styles.inputContainerStyle}
					inputStyle={styles.inputStyle}
					placeholder="-"
					textAlign={'center'}
					value={this.state.n4}
					ref={(input) => {
						this.input4 = input;
					}}
					onChangeText={(text) => {
						this.onChangeInput4(text);
					}}
					onKeyPress={(e) => this.handleKeyPress(e, 4)}
				/>
				<Input
					keyboardType="numeric"
					maxLength={1}
					containerStyle={styles.inputContainer}
					inputContainerStyle={styles.inputContainerStyle}
					inputStyle={styles.inputStyle}
					placeholder="-"
					textAlign={'center'}
					value={this.state.n5}
					ref={(input) => {
						this.input5 = input;
					}}
					onChangeText={(text) => {
						this.onChangeInput5(text);
					}}
					onKeyPress={(e) => this.handleKeyPress(e, 5)}
				/>
				<Input
					keyboardType="numeric"
					maxLength={1}
					containerStyle={styles.inputContainer}
					inputContainerStyle={styles.inputContainerStyle}
					inputStyle={styles.inputStyle}
					placeholder="-"
					value={this.state.n6}
					ref={(input) => {
						this.input6 = input;
					}}
					onChangeText={(text) => {
						this.onChangeInput6(text);
					}}
					textAlign={'center'}
					onKeyPress={(e) => this.handleKeyPress(e, 6)}
				/>
			</View>
		);
	};
	render() {
		return (
			<MView style={{ backgroundColor: 'white' }}>
				<KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
					<ImageBackground source={nen} style={styles.topimg}>
						<NButtonGoBack {...this.props} />
						<Text style={styles.title}>Nhập mã xác thực</Text>
					</ImageBackground>
					<View style={styles.container}>
						<Text style={styles.text}>Vui lòng nhập mã xác thực được trả về</Text>
						{this.inputCode()}
						<Text style={styles.text}>
							<Text style={[ styles.text, { color: 'red' } ]}>Lưu ý:</Text> Mã xác thực chỉ có hiệu lực
							trong vòng 3 phút kể từ khi bạn nhận được tin nhắn, quá thời gian trên vui lòng gửi lại tin
							nhắn xác thực
						</Text>
					</View>
					<NButton2
						onPress={() => {
							this.submit();
						}}
						text="XÁC THỰC"
						style={styles.button}
					/>
				</KeyboardAwareScrollView>
				<MAlert ref={(ref) => (this.malert = ref)} />
			</MView>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		sendSMSOTPReducer: state.sendSMSOTPReducer
	};
};

export default connect(mapStateToProps, { sendSMSOTPAction })(InputVerifyCode);
const styles = StyleSheet.create({
	container: {
		marginHorizontal: width / 20,
		marginVertical: width / 20
	},
	topimg: {
		height: width / 1.8,
		flexDirection: 'column',
		justifyContent: 'flex-end',
		backgroundColor: 'white',
		marginTop: -1
	},
	title: {
		textAlign: 'center',
		alignItems: 'flex-end',
		color: 'white',
		fontSize: width / 18,
		fontWeight: 'bold',
		paddingBottom: width / 5
	},
	text: {
		fontSize: textFontSize,
		color: TEXT_COLOR
	},
	inputContainer: {
		backgroundColor: COLOR_WHITEGRAY,
		padding: 5,
		marginTop: width / 20,
		marginHorizontal: 5,
		borderRadius: 5,
		height: width / 8,
		alignItems: 'center',
		alignSelf: 'center',
		width: width / 9
	},
	inputContainerStyle: {
		borderBottomWidth: 0
	},
	inputStyle: {
		fontSize: textFontSize * 1.1
	},
	button: {
		backgroundColor: COLOR_PRIMARY,
		marginHorizontal: width / 20,
		borderRadius: 5,
		marginBottom: 5,
		alignItems: 'center',
		padding: 10,
		marginTop: width / 10,
		fontWeight: 'bold'
	}
});
