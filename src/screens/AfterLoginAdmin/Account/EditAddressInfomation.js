import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import MView from '../../../components/MView';
import MHeader from '../../../components/MHeader';
import {
	width,
	COLOR_LIGHT_BLUE,
	COLOR_PRIMARY,
	TEXT_COLOR,
	height,
	HOSPITAL_ID,
	COLOR_GRAY,
	COLOR_BACKGROUND_TEXT_INPUT
} from '../../../utilities/config';
import IonIcon from 'react-native-vector-icons/Ionicons';
import IconPro from 'react-native-vector-icons/FontAwesome5Pro';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { textFontSize } from '../../../utilities/Styles';
import { Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
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
import DateTimePicker from 'react-native-modal-datetime-picker';
import Modal from 'react-native-modal';
import OneLine from '../../../components/OneLine';
import { NButton2 } from '../../../components/NButton';
import { dateDDMMYYYY, dateYYYYMMDD } from '../../../utilities/StringHelper';
import MAlert from '../../../components/MAlert';
const bloods = [ 'A', 'AB', 'B', 'O' ];
import { updateAccountAction } from '../../../redux/redux/updateAccount';
import { getUserInfoAction } from '../../../redux/redux/getUserInfo';
import { getListCityAction } from '../../../redux/redux/getListCity';
import { getListDistrictAction } from '../../../redux/redux/getListDistrict';
import { getListWardAction } from '../../../redux/redux/getListWard';

import { connect } from 'react-redux';
class EditUserInfomation extends Component {
	constructor(props) {
		super(props);
		this.tinh = {
			bv_ma_tinh: null,
			bv_tinh: null
		};
		this.huyen = {
			bv_ma_huyen: null,
			bv_huyen: null
		};
		this.xa = {
			bv_ma_xa: null,
			bv_xa: null
		};
		this.state = {
			bloodGroup: '',
			genderMaleColor: COLOR_LIGHT_BLUE,
			genderFemaleColor: 'white',
			gender: this.props.userInfoReducer.data.user.gender == 'nam' ? 'nam' : 'nu',
			date: null,
			showDatePicker: false,
			isShowModal: false,
			fullname: this.props.userInfoReducer.data.user.full_name,
			address: this.props.userInfoReducer.data.user.address,
			email: this.props.userInfoReducer.data.user.email,
			chieu_cao: '',
			can_nang: '',
			ngay_cap_cmnd: null,
			noi_cap_cmnd: '',
			tinh: this.tinh,
			huyen: this.huyen,
			xa: this.xa
		};
	}
	componentDidMount() {
		this.get_city();
		let tinh = this.tinh;
		let huyen = this.huyen;
		let xa = this.xa;

		if (this.props.userInfoReducer.data.user.tinh && this.props.userInfoReducer.data.user.tinh.name) {
			tinh = {
				bv_ma_tinh: this.props.userInfoReducer.data.user.tinh.id,
				bv_tinh: this.props.userInfoReducer.data.user.tinh.name
			};
		}
		if (this.props.userInfoReducer.data.user.huyen && this.props.userInfoReducer.data.user.huyen.name) {
			huyen = {
				bv_ma_huyen: this.props.userInfoReducer.data.user.huyen.id,
				bv_huyen: this.props.userInfoReducer.data.user.huyen.name
			};
		}
		if (this.props.userInfoReducer.data.user.xa && this.props.userInfoReducer.data.user.xa.name) {
			xa = {
				bv_ma_xa: this.props.userInfoReducer.data.user.xa.id,
				bv_xa: this.props.userInfoReducer.data.user.xa.name
			};
		}
		this.setState(
			{
				tinh,
				huyen,
				xa
			},
			() => {
				if (tinh.bv_tinh) {
					this.get_district();
				}
				if (huyen.bv_huyen) {
					this.get_ward();
				}
			}
		);
	}
	get_city = () => {
		this.props.getListCityAction();
	};
	get_district = () => {
		this.props.getListDistrictAction(this.state.tinh.bv_ma_tinh);
	};
	get_ward = () => {
		this.props.getListWardAction(this.state.huyen.bv_ma_huyen);
	};

	customInputIcon = (source, require = false) => {
		return (
			<View style={{ flexDirection: 'row', width: width / 14 }}>
				<Image style={styles.inputIcon} source={source} />
				{require && <Text style={{ color: 'red' }}>*</Text>}
			</View>
		);
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
						<Text style={styles.text_title}>Thông tin địa chỉ</Text>
					</View>
					<Text style={{ fontSize: textFontSize, color: '#c9c9cb' }}>
						Vui lòng nhập chính xác thông tin địa chỉ
					</Text>
				</View>
				<View style={styles.inputPadding}>
					{this.AddressInformation()}
					<Input
						containerStyle={styles.inputContainer}
						inputContainerStyle={styles.inputContainerStyle}
						inputStyle={styles.inputStyle}
						value={this.state.address}
						onChangeText={(text) => {
							this.setState({ address: text });
						}}
						placeholder="Địa chỉ"
						leftIcon={this.customInputIcon(address, true)}
						// rightIcon={this.customMap(map)}
					/>
				</View>
			</View>
		);
	};
	componentDidUpdate(PrevProps, PrevState) {
		if (PrevProps.updateAccountReducer != this.props.updateAccountReducer) {
			if (this.props.updateAccountReducer.isSuccess) {
				this.props.getUserInfoAction();
			}
			if (this.props.updateAccountReducer.isError) {
				this.malert.showAlert(this.props.updateAccountReducer.message, () => {});
			}
		}
		if (PrevProps.userInfoReducer != this.props.userInfoReducer) {
			if (this.props.userInfoReducer.data.user) {
				this.props.navigation.pop();
			}
		}
		if (PrevProps.getListCityReducer != this.props.getListCityReducer) {
			if (this.props.getListCityReducer.isSuccess) {
			}
		}
	}
	submit = () => {
		switch (true) {
			case !this.state.address:
				this.malert.showAlert('Vui lòng nhập địa chỉ', () => {});
				break;
			default:
				let data = {
					address: this.state.address
				};
				if (this.state.tinh) {
					data.tinh = {
						id: this.state.tinh.bv_ma_tinh,
						name: this.state.tinh.bv_tinh
					};
				}
				if (this.state.huyen) {
					data.huyen = {
						id: this.state.huyen.bv_ma_huyen,
						name: this.state.huyen.bv_huyen
					};
				}
				if (this.state.xa) {
					data.xa = {
						id: this.state.xa.bv_ma_xa,
						name: this.state.xa.bv_xa
					};
				}
				this.props.updateAccountAction(data);
				break;
		}
	};

	AddressInformation = () => {
		return (
			<View
				onStartShouldSetResponder={() => {
					this.setState({ isShownUD: 0 });
				}}
				style={{ marginTop: width / 25, marginHorizontal: width / 25 }}
			>
				{this.props.getListCityReducer.isSuccess ? (
					<View
						style={{
							marginTop: 0,
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginBottom: 5
						}}
					>
						<Text style={[ styles.titleText, { marginBottom: 5 } ]}>Tỉnh / Thành phố</Text>
						<TouchableOpacity
							onPress={() =>
								this.props.navigation.navigate('InputAddress', {
									data_tinh: this.props.getListCityReducer.data,
									picked_tinh: this.state.tinh,
									action_choose_tinh: (tinh) =>
										this.setState({ tinh, huyen: this.huyen, xa: this.xa }, () => {
											this.get_district();
										})
								})}
							style={{
								backgroundColor: COLOR_BACKGROUND_TEXT_INPUT,
								padding: 10,
								borderRadius: 3,
								flex: 1,
								marginLeft: 20
							}}
						>
							{this.state.tinh.bv_tinh ? (
								<Text style={{ fontSize: textFontSize, color: TEXT_COLOR, fontWeight: 'bold' }}>
									{this.state.tinh.bv_tinh}
								</Text>
							) : (
								<Text style={{ fontSize: textFontSize, color: COLOR_GRAY }}>Chọn tỉnh / thành phố</Text>
							)}
						</TouchableOpacity>
					</View>
				) : null}
				{this.props.getListDistrictReducer.isSuccess && this.state.tinh.bv_tinh ? (
					<View
						style={{
							marginTop: 0,
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginBottom: 5
						}}
					>
						<Text style={[ styles.titleText, { marginBottom: 5 } ]}>Quận / Huyện</Text>
						<TouchableOpacity
							onPress={() =>
								this.props.navigation.navigate('InputAddress', {
									data_huyen: this.props.getListDistrictReducer.data,
									picked_huyen: this.state.huyen,
									action_choose_huyen: (huyen) =>
										this.setState({ huyen, xa: this.xa }, () => {
											this.get_ward();
										})
								})}
							style={{
								backgroundColor: COLOR_BACKGROUND_TEXT_INPUT,
								padding: 10,
								borderRadius: 3,
								flex: 1,
								marginLeft: 20
							}}
						>
							{this.state.huyen.bv_huyen ? (
								<Text style={{ fontSize: textFontSize, color: TEXT_COLOR, fontWeight: 'bold' }}>
									{this.state.huyen.bv_huyen}
								</Text>
							) : (
								<Text style={{ fontSize: textFontSize, color: COLOR_GRAY }}>Chọn quận / huyện</Text>
							)}
						</TouchableOpacity>
					</View>
				) : null}
				{this.props.getListWardReducer.isSuccess && this.state.huyen.bv_huyen ? (
					<View
						style={{
							marginTop: 0,
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginBottom: 5
						}}
					>
						<Text style={[ styles.titleText, { marginBottom: 5 } ]}>Xã / Phường</Text>
						<TouchableOpacity
							onPress={() =>
								this.props.navigation.navigate('InputAddress', {
									data_xa: this.props.getListWardReducer.data,
									picked_xa: this.state.xa,
									action_choose_xa: (xa) => this.setState({ xa }, () => {})
								})}
							style={{
								backgroundColor: COLOR_BACKGROUND_TEXT_INPUT,
								padding: 10,
								borderRadius: 3,
								flex: 1,
								marginLeft: 20
							}}
						>
							{this.state.xa.bv_xa ? (
								<Text style={{ fontSize: textFontSize, color: TEXT_COLOR, fontWeight: 'bold' }}>
									{this.state.xa.bv_xa}
								</Text>
							) : (
								<Text style={{ fontSize: textFontSize, color: COLOR_GRAY }}>Chọn xã / phường</Text>
							)}
						</TouchableOpacity>
					</View>
				) : null}
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
					text="Hoàn thiện thông tin"
				/>
				<KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
					{this.information()}
					<NButton2 onPress={this.submit} text="HOÀN TẤT" />
				</KeyboardAwareScrollView>
				<MAlert ref={(ref) => (this.malert = ref)} />
			</MView>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		updateAccountReducer: state.updateAccountReducer,
		userInfoReducer: state.userInfoReducer,
		getListCityReducer: state.getListCityReducer,
		getListDistrictReducer: state.getListDistrictReducer,
		getListWardReducer: state.getListWardReducer
	};
};

export default connect(mapStateToProps, {
	updateAccountAction,
	getUserInfoAction,
	getListCityAction,
	getListDistrictAction,
	getListWardAction
})(EditUserInfomation);

const styles = StyleSheet.create({
	textBlood: {
		marginVertical: 10,
		textAlign: 'center',
		fontWeight: 'bold'
	},
	container: {
		//paddingHorizontal: width / 20,
		backgroundColor: 'white',
		marginBottom: width / 30
	},
	infoimg: {
		width: width / 10,
		resizeMode: 'contain',
		height: width / 8
	},
	inputIcon: {
		width: width / 25,
		height: width / 12,
		resizeMode: 'contain'
	},
	inputContainerStyle: {
		borderBottomColor: '#c7c7c9',
		height: width / 7
	},
	inputContainer: {
		height: width / 8
	},
	inputPadding: {
		paddingHorizontal: width / 40
	},
	inputStyle: {
		fontSize: textFontSize + 2
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
		marginBottom: 5,
		alignItems: 'center'
	},
	text_title: {
		flex: 1,
		color: '#069889',
		fontSize: textFontSize * 1.3,
		marginLeft: 8,
		fontWeight: 'bold'
	},
	text_value: {
		fontWeight: 'bold',
		fontSize: textFontSize + 2,
		color: TEXT_COLOR,
		textAlign: 'right',
		flex: 1,
		letterSpacing: 1
	},
	titleText: {
		fontSize: textFontSize,
		color: '#211f20',
		width: 150
	}
});
