import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import MView from '../../../components/MView';
import MHeader from '../../../components/MHeader';
import { width, COLOR_LIGHT_BLUE, COLOR_PRIMARY, TEXT_COLOR, height, HOSPITAL_ID } from '../../../utilities/config';
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
import { updateBHYTAction } from '../../../redux/redux/updateBHYT';
import { createBHYTAction } from '../../../redux/redux/createBHYT';

import { getUserInfoAction } from '../../../redux/redux/getUserInfo';

import { connect } from 'react-redux';
class EditIdentityInfomation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bloodGroup: '',
			genderMaleColor: COLOR_LIGHT_BLUE,
			genderFemaleColor: 'white',
			gender: this.props.userInfoReducer.data.user.gender == 'nam' ? 'nam' : 'nu',
			date: null,
			showDatePicker: false,
			isShowModal: false,
			content_modal: this.view_bloods(),
			fullname: this.props.userInfoReducer.data.user.full_name,
			address: this.props.userInfoReducer.data.user.address,
			email: this.props.userInfoReducer.data.user.email,
			chieu_cao: '',
			can_nang: '',
			so_bhyt: this.props.userInfoReducer.data.bhyt ? this.props.userInfoReducer.data.bhyt.so_bhyt : '',
			ngay_cap_cmnd: this.props.userInfoReducer.data.identity
				? new Date(this.props.userInfoReducer.data.identity.ngay_cap)
				: null,
			noi_cap_cmnd: this.props.userInfoReducer.data.identity
				? this.props.userInfoReducer.data.identity.noi_cap
				: ''
		};
	}
	componentDidMount() {}
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

	bhyt = () => {
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
					<Text style={styles.text_title}>Thông tin Bảo hiểm y tế</Text>
				</View>
				<View style={styles.insurance}>
					<Text style={[ styles.text, { width: width / 3 } ]}>
						Số BHYT<Text style={{ color: 'red' }}>*</Text>
					</Text>
					<Input
						containerStyle={[ styles.inputContainer, { flex: 1, padding: 0 } ]}
						inputContainerStyle={styles.inputContainerStyle}
						inputStyle={styles.inputStyle}
						value={this.state.so_bhyt}
						onChangeText={(text) => {
							this.setState({ so_bhyt: text });
						}}
						maxLength={15}
						placeholder="Nhập số BHYT"
					/>
				</View>
				{/* <View style={styles.insurance}>
					<Text style={[ styles.text, { width: width / 3 } ]}>
						Ngày cấp <Text style={{ color: 'red' }}>*</Text>
					</Text>
					<Input
						containerStyle={[ styles.inputContainer, { flex: 1 } ]}
						inputContainerStyle={styles.inputContainerStyle}
						inputStyle={styles.inputStyle}
						editable={false}
						placeholder="Ngày cấp cmnd/cccd"
						value={this.state.ngay_cap_cmnd ? dateDDMMYYYY(this.state.ngay_cap_cmnd) : ''}
						rightIcon={
							<TouchableOpacity
								style={{
									width: 50,
									justifyContent: 'center',
									alignItems: 'center'
								}}
								onPress={() => {
									this.setState({ showNgayCapCMNDPicker: true });
								}}
							>
								<IonIcon name="chevron-down-outline" color="#3384c5" size={textFontSize * 2} />
							</TouchableOpacity>
						}
					/>
				</View>
				<View style={styles.insurance}>
					<Text style={[ styles.text, { width: width / 3 } ]}>
						Nơi cấp <Text style={{ color: 'red' }}>*</Text>
					</Text>
					<Input
						containerStyle={[ styles.inputContainer, { flex: 1, padding: 0 } ]}
						inputContainerStyle={styles.inputContainerStyle}
						inputStyle={styles.inputStyle}
						value={this.state.noi_cap_cmnd}
						onChangeText={(text) => {
							this.setState({ noi_cap_cmnd: text });
						}}
						placeholder="Nơi cấp cmnd/cccd"
					/>
				</View> */}
			</View>
		);
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
	view_bloods = () => {
		return (
			<FlatList
				data={bloods}
				keyExtractor={(item, index) => item}
				renderItem={({ item, index }) => {
					return (
						<TouchableOpacity
							key={item}
							onPress={() => {
								this.setState({ bloodGroup: item, isShowModal: false });
							}}
						>
							<Text
								style={{
									marginLeft: 20,
									marginVertical: 15,
									fontSize: 18,
									color: this.state.bloodGroup == item ? COLOR_PRIMARY : TEXT_COLOR
								}}
							>
								{item}
							</Text>
							<OneLine />
						</TouchableOpacity>
					);
				}}
			/>
		);
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
		if (PrevProps.updateBHYTReducer != this.props.updateBHYTReducer) {
			if (this.props.updateBHYTReducer.isSuccess) {
				this.props.getUserInfoAction();
			}
			if (this.props.updateBHYTReducer.isError) {
				this.malert.showAlert(this.props.updateBHYTReducer.message, () => {});
			}
		}
		if (PrevProps.createBHYTReducer != this.props.createBHYTReducer) {
			if (this.props.createBHYTReducer.isSuccess) {
				this.props.getUserInfoAction();
			}
			if (this.props.createBHYTReducer.isError) {
				this.malert.showAlert(this.props.createBHYTReducer.message, () => {});
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
			case !this.state.so_bhyt:
				this.malert.showAlert(`Bạn chưa điền mã số bảo hiểm y tế`, () => {});
				break;
			case this.state.so_bhyt.length != 15:
				this.malert.showAlert(`Vui lòng điền đúng mã số bảo hiểm y tế. VD: DN4010116152716`, () => {});
				break;
			default:
				let data = {
					so_bhyt: this.state.so_bhyt
				};
				if (this.props.userInfoReducer.data.bhyt) {
					this.props.updateBHYTAction(data);
				} else {
					this.props.createBHYTAction(data);
				}
				break;
		}
	};
	render() {
		console.log("abccc",acb);
		return (
			<MView>
				<MHeader
					onPress={() => {
						this.props.navigation.pop();
					}}
					text="Hoàn thiện thông tin"
				/>
				<KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
					{this.bhyt()}
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
		updateBHYTReducer: state.updateBHYTReducer,
		createBHYTReducer: state.createBHYTReducer,
		userInfoReducer: state.userInfoReducer
	};
};

export default connect(mapStateToProps, { updateBHYTAction, getUserInfoAction, createBHYTAction })(
	EditIdentityInfomation
);

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
	}
});
