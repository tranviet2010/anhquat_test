import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Picker } from 'react-native';
import MView from '../../../components/MView';
import MHeader from '../../../components/MHeader';
import { width, COLOR_LIGHT_BLUE, COLOR_PRIMARY } from '../../../utilities/config';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { textFontSize } from '../../../utilities/Styles';
import { Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
const cmnd = require('../../../assets/img/img_account/thong_tin_co_ban.png');
const baohiem = require('../../../assets/img/img_account/thong_tin_bao_hiem.png');
const suckhoe = require('../../../assets/img/img_account/thong_tin_suc_khoe.png');
const account = require('../../../assets/img/img_account/account.png');
const birthday = require('../../../assets/img/img_account/birthday.png');
const phone = require('../../../assets/img/img_account/dien_thoai.png');
const email = require('../../../assets/img/img_account/email.png');
const relationship = require('../../../assets/img/img_account/moi_quan_he.png');
const camera = require('../../../assets/img/img_account/anh.png');
const male = require('../../../assets/img/img_account/male.png');
const female = require('../../../assets/img/img_account/female.png');
const idcard = require('../../../assets/img/img_account/cmnd-cccd.png');
const address = require('../../../assets/img/img_account/location.png');
const map = require('../../../assets/img/img_account/map.png');

export default class AddNewDocument extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bloodGroup: 'A',
			genderMaleColor: COLOR_LIGHT_BLUE,
			genderFemaleColor: 'white',
			date: new Date(),
			showDatePicker: false
		};
	}

	customInputIcon = (source) => {
		return <Image style={styles.inputIcon} source={source} />;
	};
	customMap = (source) => {
		return (
			<View>
				<Image style={{ width: width / 15, resizeMode: 'contain' }} source={source} />
				{/* <Text style={{ color: "blue", fontSize: textFontSize * 0.5 }}>
          Bản đồ
        </Text> */}
			</View>
		);
	};

	pickGender = (gender) => {
		if (gender === 'male') {
			this.setState({
				genderFemaleColor: 'white',
				genderMaleColor: COLOR_LIGHT_BLUE
			});
		} else {
			this.setState({
				genderFemaleColor: '#f7d7d7',
				genderMaleColor: 'white'
			});
		}
	};

	onChangeDate = (event, selectedDate) => {};

	information = () => {
		return (
			<View style={styles.container}>
				<View style={{ paddingHorizontal: width / 20 }}>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center'
							//paddingBottom: width / 20
						}}
					>
						<Image style={styles.infoimg} source={cmnd} />
						<Text
							style={{
								flex: 1,
								color: '#069889',
								fontSize: textFontSize * 1.3,
								marginLeft: 8
							}}
						>
							Thông tin cơ bản
						</Text>
						<Image
							style={{
								width: width / 7,
								resizeMode: 'contain',
								position: 'absolute',
								right: 5
							}}
							source={camera}
						/>
					</View>
					<Text style={{ fontSize: textFontSize * 0.9, color: '#c9c9cb' }}>
						Vui lòng nhập chính xác thông tin cá nhân
					</Text>
				</View>
				<View style={styles.inputPadding}>
					<Input
						containerStyle={styles.inputContainer}
						inputContainerStyle={styles.inputContainerStyle}
						inputStyle={styles.inputStyle}
						placeholder="Họ và tên"
						leftIcon={this.customInputIcon(account)}
					/>
					<Input
						containerStyle={styles.inputContainer}
						inputContainerStyle={styles.inputContainerStyle}
						inputStyle={styles.inputStyle}
						placeholder="Ngày sinh"
						leftIcon={this.customInputIcon(birthday)}
						rightIcon={
							<IonIcon
								onPress={() => {
									this.setState({ showDatePicker: true });
								}}
								name="chevron-down-outline"
								style={{
									color: '#3384c5',
									fontSize: textFontSize * 1.5
								}}
							/>
						}
					/>

					{this.state.showDatePicker ? (
						<DateTimePicker
							testID="dateTimePicker"
							value={this.state.date}
							is24Hour={true}
							display="default"
							onChange={this.onChangeDate}
						/>
					) : (
						<View />
					)}
					<Input
						containerStyle={styles.inputContainer}
						inputContainerStyle={styles.inputContainerStyle}
						inputStyle={styles.inputStyle}
						placeholder="Số điện thoại"
						leftIcon={this.customInputIcon(phone)}
					/>
					<Input
						containerStyle={styles.inputContainer}
						inputContainerStyle={styles.inputContainerStyle}
						inputStyle={styles.inputStyle}
						placeholder="Email"
						leftIcon={this.customInputIcon(email)}
					/>
					<Input
						containerStyle={styles.inputContainer}
						inputContainerStyle={styles.inputContainerStyle}
						inputStyle={styles.inputStyle}
						placeholder="Mối quan hệ"
						leftIcon={this.customInputIcon(relationship)}
						rightIcon={
							<IonIcon
								name="chevron-down-outline"
								style={{
									color: '#3384c5',
									fontSize: textFontSize * 1.5
								}}
							/>
						}
					/>
				</View>
				<View style={{ paddingHorizontal: width / 20 }}>
					<Text style={styles.text}>Giới tính</Text>
					<View style={{ flexDirection: 'row', alignSelf: 'center' }}>
						<TouchableOpacity
							onPress={() => this.pickGender('male')}
							style={[ styles.gender, { backgroundColor: this.state.genderMaleColor } ]}
						>
							<Image style={styles.genderImg} source={female} />
							<Text style={styles.text}>Nam</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => this.pickGender('female')}
							style={[ styles.gender, { backgroundColor: this.state.genderFemaleColor } ]}
						>
							<Image style={styles.genderImg} source={male} />
							<Text style={styles.text}>Nữ</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.inputPadding}>
					<Input
						containerStyle={styles.inputContainer}
						inputContainerStyle={styles.inputContainerStyle}
						inputStyle={styles.inputStyle}
						placeholder="Số chứng minh thư/ căn cước công dân"
						leftIcon={this.customInputIcon(idcard)}
					/>
					<Input
						containerStyle={styles.inputContainer}
						inputContainerStyle={styles.inputContainerStyle}
						inputStyle={styles.inputStyle}
						placeholder="Địa chỉ"
						leftIcon={this.customInputIcon(address)}
						rightIcon={this.customMap(map)}
					/>
				</View>
			</View>
		);
	};

	insurance = () => {
		return (
			<View style={styles.container}>
				<View
					style={{
						//flex: 1,
						flexDirection: 'row',
						alignItems: 'center',
						//paddingBottom: width / 20,
						paddingHorizontal: width / 20
					}}
				>
					<Image style={styles.infoimg} source={baohiem} />
					<Text
						style={{
							flex: 1,
							color: '#069889',
							fontSize: textFontSize * 1.3,
							marginLeft: 8
						}}
					>
						Thông tin bảo hiểm
					</Text>
				</View>
				<View style={styles.insurance}>
					<Text style={styles.text}>Bảo hiểm y tế</Text>
					<Text style={styles.add}>Thêm</Text>
				</View>
				<View style={styles.insurance}>
					<Text style={styles.text}>Bảo hiểm tư nhân</Text>
					<Text style={styles.add}>Thêm</Text>
				</View>
			</View>
		);
	};

	setBloodGroup = (bloodGroup) => {
		this.setState({
			bloodGroup: bloodGroup
		});
	};

	health = () => {
		return (
			<View style={{ backgroundColor: 'white' }}>
				<View
					style={{
						// flex: 1,
						flexDirection: 'row',
						alignItems: 'center',
						//paddingBottom: width / 20,
						paddingHorizontal: width / 20
					}}
				>
					<Image style={styles.infoimg} source={suckhoe} />
					<Text
						style={{
							flex: 1,
							color: '#069889',
							fontSize: textFontSize * 1.3,
							marginLeft: 8
						}}
					>
						Thông tin sức khỏe
					</Text>
				</View>
				<View
					style={{
						flexDirection: 'row',
						paddingHorizontal: width / 20,
						justifyContent: 'center'
					}}
				>
					<View style={styles.healthItem}>
						<Text>Nhóm máu</Text>
						<View
							style={{
								borderColor: '#c7c7c9',
								borderWidth: 1,
								height: width / 10
							}}
						>
							<Picker
								selectedValue={this.state.bloodGroup}
								style={{ width: width / 4 }}
								onValueChange={(itemValue, itemIndex) => this.setBloodGroup(itemValue)}
							>
								<Picker.Item label="A" value="A" />
								<Picker.Item label="AB" value="AB" />
								<Picker.Item label="B" value="B" />
								<Picker.Item label="O" value="O" />
							</Picker>
						</View>
					</View>
					<View style={styles.healthItem}>
						<Text>Chiều cao</Text>
						<View
							style={{
								flexDirection: 'row',
								width: width / 5,
								alignItems: 'center'
							}}
						>
							<Input
								containerStyle={styles.inputContainer}
								inputContainerStyle={{
									width: width / 7,
									borderColor: '#c7c7c9',
									borderWidth: 1,
									height: width / 10
								}}
								inputStyle={styles.inputStyle}
							/>
							<Text style={styles.text}>cm</Text>
						</View>
					</View>
					<View style={styles.healthItem}>
						<Text>Cân nặng</Text>
						<View
							style={{
								flexDirection: 'row',
								width: width / 5,
								alignItems: 'center'
							}}
						>
							<Input
								containerStyle={styles.inputContainer}
								inputContainerStyle={{
									width: width / 7,
									borderColor: '#c7c7c9',
									borderWidth: 1,
									height: width / 10
								}}
								inputStyle={styles.inputStyle}
							/>
							<Text style={styles.text}>kg</Text>
						</View>
					</View>
				</View>
				<TouchableOpacity style={styles.btnAdd}>
					<Text
						style={{
							fontSize: textFontSize,
							color: 'white',
							paddingVertical: width / 30,
							textAlign: 'center'
						}}
					>
						THÊM MỚI
					</Text>
				</TouchableOpacity>
			</View>
		);
	};

	render() {
		return (
			<MView>
				<MHeader
					onPress={() => {
						this.props.navigation.pop();
					}}
					text="Thêm hồ sơ người thân"
				/>
				<KeyboardAwareScrollView>
					{this.information()}
					{this.insurance()}
					{this.health()}
				</KeyboardAwareScrollView>
			</MView>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		//paddingHorizontal: width / 20,
		backgroundColor: 'white',
		marginBottom: width / 30
	},
	infoimg: {
		width: width / 13,
		resizeMode: 'contain'
	},
	inputIcon: {
		width: width / 25,
		resizeMode: 'contain'
	},
	inputContainerStyle: {
		borderBottomColor: '#c7c7c9',
		height: width / 12
	},
	inputContainer: {
		height: width / 8
	},
	inputPadding: {
		paddingHorizontal: width / 40
	},
	inputStyle: {
		fontSize: textFontSize * 0.9
	},
	text: {
		fontSize: textFontSize * 1.1
	},
	gender: {
		width: width / 3,
		margin: 10,
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: width,
		height: width / 10,
		justifyContent: 'center'
	},
	genderImg: {
		width: width / 15,
		resizeMode: 'contain'
	},
	add: {
		fontSize: textFontSize,
		position: 'absolute',
		right: width / 20,
		color: '#74bdf8'
	},
	insurance: {
		flexDirection: 'row',
		paddingHorizontal: width / 20,
		alignItems: 'center',
		marginBottom: 10
	},
	healthItem: {
		alignItems: 'center',
		marginHorizontal: width / 40,
		padding: 10
	},
	btnAdd: {
		backgroundColor: COLOR_PRIMARY,
		marginHorizontal: width / 20,
		borderRadius: 5,
		marginBottom: 5
	}
});
