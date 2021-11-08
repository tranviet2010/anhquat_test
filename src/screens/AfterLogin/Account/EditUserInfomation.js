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
	COLOR_BACKGROUND_TEXT_INPUT,
	COLOR_GRAY
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
import { getListNgheNghiepAction } from '../../../redux/redux/getListNgheNghiep';
import { getListDanTocAction } from '../../../redux/redux/getListDanToc';

import { connect } from 'react-redux';
class EditUserInfomation extends Component {
	constructor(props) {
		super(props);
		this.dan_toc = {
			bv_ma_dan_toc: null,
			bv_dan_toc: null
		};
		this.nghe_nghiep = {
			bv_ma_nghe_nghiep: null,
			bv_nghe_nghiep: null
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
			dan_toc: this.dan_toc,
			nghe_nghiep: this.nghe_nghiep
		};
	}
	componentDidMount() {
		this.get_dan_toc();
		this.get_nghe_nghiep();

		if (this.props.userInfoReducer.data.user.gender == 'nam') {
			this.pickGender('male');
		} else {
			this.pickGender('female');
		}
	}
	get_dan_toc = () => {
		this.props.getListDanTocAction();
	};
	get_nghe_nghiep = () => {
		this.props.getListNgheNghiepAction();
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

	pickGender = (gender) => {
		if (gender === 'male') {
			this.setState({
				gender: 'nam',
				genderFemaleColor: 'white',
				genderMaleColor: COLOR_LIGHT_BLUE
			});
		} else {
			this.setState({
				gender: 'nu',
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
						<Text style={styles.text_title}>Thông tin cơ bản</Text>
					</View>
					<Text style={{ fontSize: textFontSize, color: '#c9c9cb' }}>
						Vui lòng nhập chính xác thông tin cá nhân
					</Text>
				</View>
				<View style={styles.inputPadding}>
					<Input
						containerStyle={styles.inputContainer}
						inputContainerStyle={styles.inputContainerStyle}
						inputStyle={styles.inputStyle}
						value={this.state.fullname}
						onChangeText={(text) => {
							this.setState({ fullname: text });
						}}
						autoCapitalize="words"
						placeholder="Họ và tên"
						leftIcon={this.customInputIcon(account, true)}
					/>
				</View>
				<View style={{ paddingHorizontal: width / 20, marginTop: 10 }}>
					<Text style={styles.text}>
						Giới tính <Text style={{ color: 'red' }}>*</Text>
					</Text>
					<View style={{ flexDirection: 'row', alignSelf: 'center' }}>
						<TouchableOpacity
							activeOpacity={1}
							onPress={() => this.pickGender('male')}
							style={[ styles.gender, { backgroundColor: this.state.genderMaleColor } ]}
						>
							<Image style={styles.genderImg} source={female} />
							<Text style={styles.text}>Nam</Text>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={1}
							onPress={() => this.pickGender('female')}
							style={[ styles.gender, { backgroundColor: this.state.genderFemaleColor } ]}
						>
							<Image style={styles.genderImg} source={male} />
							<Text style={styles.text}>Nữ</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View style={{ marginTop: width / 25, marginHorizontal: width / 25 }}>
					{this.props.getListDanTocReducer.isSuccess ? (
						<View
							style={{
								marginTop: 0,
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								marginBottom: 5
							}}
						>
							<Text style={[ styles.titleText, { marginBottom: 5 } ]}>Dân tộc</Text>
							<TouchableOpacity
								onPress={() =>
									this.props.navigation.navigate('SelectDanToc', {
										data: this.props.getListDanTocReducer.data,
										picked: this.state.dan_toc,
										ma: 'bv_ma_dan_toc',
										name: 'bv_dan_toc',
										header: 'Chọn dân tộc',
										action_choose: (dan_toc) =>
											this.setState({ dan_toc }, () => {
												console.log(dan_toc);
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
								{this.state.dan_toc.bv_dan_toc ? (
									<Text style={{ fontSize: textFontSize, color: TEXT_COLOR, fontWeight: 'bold' }}>
										{this.state.dan_toc.bv_dan_toc}
									</Text>
								) : (
									<Text style={{ fontSize: textFontSize, color: COLOR_GRAY }}>Chọn dân tộc</Text>
								)}
							</TouchableOpacity>
						</View>
					) : null}
					{this.props.getListNgheNghiepReducer.isSuccess ? (
						<View
							style={{
								marginTop: 0,
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								marginBottom: 5
							}}
						>
							<Text style={[ styles.titleText, { marginBottom: 5 } ]}>Nghề nghiệp</Text>
							<TouchableOpacity
								onPress={() =>
									this.props.navigation.navigate('SelectNgheNghiep', {
										data: this.props.getListNgheNghiepReducer.data,
										picked: this.state.nghe_nghiep,
										ma: 'bv_ma_nghe_nghiep',
										name: 'bv_nghe_nghiep',
										header: 'Chọn nghề nghiệp',
										action_choose: (nghe_nghiep) => this.setState({ nghe_nghiep })
									})}
								style={{
									backgroundColor: COLOR_BACKGROUND_TEXT_INPUT,
									padding: 10,
									borderRadius: 3,
									flex: 1,
									marginLeft: 20
								}}
							>
								{this.state.nghe_nghiep.bv_nghe_nghiep ? (
									<Text style={{ fontSize: textFontSize, color: TEXT_COLOR, fontWeight: 'bold' }}>
										{this.state.nghe_nghiep.bv_nghe_nghiep}
									</Text>
								) : (
									<Text style={{ fontSize: textFontSize, color: COLOR_GRAY }}>Chọn nghề nghiệp</Text>
								)}
							</TouchableOpacity>
						</View>
					) : null}
				</View>

				<View style={styles.inputPadding}>
					<Input
						containerStyle={styles.inputContainer}
						inputContainerStyle={styles.inputContainerStyle}
						inputStyle={styles.inputStyle}
						placeholder="Email"
						value={this.state.email}
						onChangeText={(text) => {
							this.setState({ email: text });
						}}
						leftIcon={this.customInputIcon(email)}
					/>
				</View>
			</View>
		);
	};
	cmnd = () => {
		return <View style={styles.container} />;
	};
	insurance = () => {
		return <View style={styles.container} />;
	};

	setBloodGroup = (bloodGroup) => {
		this.setState({
			bloodGroup: bloodGroup
		});
	};
	onpenChooseBloodGroup = () => {
		this.setState({
			isShowModal: true
		});
	};

	toggleStartDatePicker() {
		this.setState({ showDatePicker: !this.state.showDatePicker });
	}
	handleBirthDayPicker(time) {
		this.setState({
			date: time,
			showDatePicker: false
		});
	}
	toggleNgayCapCMNDPicker() {
		this.setState({ showNgayCapCMNDPicker: !this.state.showNgayCapCMNDPicker });
	}
	handleNgayCapCMNDPicker(time) {
		this.setState({
			ngay_cap_cmnd: time,
			showNgayCapCMNDPicker: false
		});
	}
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
	}
	submit = () => {
		switch (true) {
			case !this.state.fullname:
				this.malert.showAlert('Vui lòng nhập họ và tên  ', () => {});
				break;
			case !this.state.fullname.includes(' '):
				this.malert.showAlert('Vui lòng nhập đầy đủ họ và tên', () => {});
				break;

			default:
				let data = {
					full_name: this.state.fullname,
					gender: this.state.gender
				};
				if (this.state.email) {
					data.email = this.state.email;
				}
				if (this.state.nghe_nghiep) {
					data.nghe_nghiep = {
						id: this.state.nghe_nghiep.bv_ma_nghe_nghiep,
						name: this.state.nghe_nghiep.bv_nghe_nghiep
					};
				}
				if (this.state.dan_toc) {
					data.dan_toc = {
						id: this.state.dan_toc.bv_ma_dan_toc,
						name: this.state.dan_toc.bv_dan_toc
					};
				}
				this.props.updateAccountAction(data);
				break;
		}
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
				<Modal
					propagateSwipe={true}
					onModalShow={() => {
						this.setState({ isShowModal: true });
					}}
					onModalHide={() => {
						this.setState({ isShowModal: false });
					}}
					onBackdropPress={() => this.setState({ isShowModal: false })}
					onSwipeComplete={() => {}}
					swipeDirection="down"
					animationInTiming={500}
					isVisible={this.state.isShowModal}
					style={{
						top: 0,
						bottom: 0,
						left: 0,
						right: 0,
						position: 'absolute',
						margin: 0
					}}
				>
					<TouchableOpacity
						onPress={() => {
							this.setState({ isShowModal: false });
						}}
						style={{
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						{/* <View style={{ flex: 1 }} /> */}
						<View
							style={{
								// height: 0.25 * height,
								width: 0.7 * width,
								backgroundColor: 'white',
								// marginBottom: 50,
								borderRadius: 5
							}}
						>
							{this.state.content_modal}
						</View>
						{/* <View style={{ flex: 2 }} /> */}
					</TouchableOpacity>
				</Modal>

				<DateTimePicker
					locale="vi-VN"
					mode={'date'}
					confirmTextIOS="Xác nhận"
					cancelTextIOS="Huỷ"
					display="spinner"
					headerTextIOS="Chọn ngày cấp"
					date={!this.state.ngay_cap_cmnd ? new Date('2010-01-01') : new Date(this.state.ngay_cap_cmnd)}
					maximumDate={new Date()}
					onConfirm={(date) => {
						this.handleNgayCapCMNDPicker(date);
						// this.setState({ showDatePicker: false });
					}}
					onCancel={() => this.setState({ showNgayCapCMNDPicker: false })}
					// onDateChange={(time) => this.handleBirthDayPicker(time)}
					isVisible={this.state.showNgayCapCMNDPicker}
					// minimumDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
				/>
				<MAlert ref={(ref) => (this.malert = ref)} />
			</MView>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		updateAccountReducer: state.updateAccountReducer,
		userInfoReducer: state.userInfoReducer,
		getListNgheNghiepReducer: state.getListNgheNghiepReducer,
		getListDanTocReducer: state.getListDanTocReducer
	};
};

export default connect(mapStateToProps, {
	updateAccountAction,
	getUserInfoAction,
	getListNgheNghiepAction,
	getListDanTocAction
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
