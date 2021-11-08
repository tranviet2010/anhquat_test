import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, Share, TouchableOpacity, TextInput } from 'react-native';
import MView from '../../../components/MView';
import {
	width,
	height,
	COLOR_PRIMARY,
	TEXT_COLOR,
	isIphoneX,
	COLOR_GREEN,
	COLOR_ORANGE,
	COLOR_LIGHT_BLUE,
	COLOR_MINT,
	COLOR_KETCHUP,
	COLOR_GRAY,
	COLOR_WHITEGRAY,
	COLOR_BACKGROUND_TEXT_INPUT
} from '../../../utilities/config';
import { Avatar } from 'react-native-elements';
import { textFontSize } from '../../../utilities/Styles';
//import { TouchableOpacity } from "react-native-gesture-handler";
import ImagePicker from 'react-native-image-crop-picker';
import MAlert from '../../../components/MAlert';
import MAsyncStorage from '../../../utilities/MAsyncStorage';
import Modal from 'react-native-modal';
import { updateAvatarAction } from '../../../redux/redux/updateAvatar';
import { deleteSubcriberAction } from '../../../redux/redux/deleteSubcriber';
import { connect } from 'react-redux';
import { BASE_API } from '../../../services/Services';
import { getUserInfoAction } from '../../../redux/redux/getUserInfo';
import { popupCointAction } from '../../../redux/redux/popupCoint';

import { ScrollView } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
const headerImg = require('../../../assets/img/img_account/nen_tren.png');
const cmnd = require('../../../assets/img/img_account/thong_tin_co_ban.png');
const baohiem = require('../../../assets/img/img_account/thong_tin_bao_hiem.png');
const suckhoe = require('../../../assets/img/img_account/thong_tin_suc_khoe.png');
const camera = require('../../../assets/img/img_account/may_anh_acc.png');
const chong = require('../../../assets/img/img_homescreen/chong.png');
const vo = require('../../../assets/img/img_homescreen/vo.png');
import ImageView from 'react-native-image-view';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const userdata = [
	{
		id: 1,
		avatar: require('../../../assets/img/img_homescreen/vo.png'),
		name: 'Linh',
		type_user: 'Vợ'
	},
	{
		id: 2,
		avatar: require('../../../assets/img/img_homescreen/con_gai.png'),
		name: 'Chi',
		type_user: 'Con'
	},
	{
		id: 3,
		avatar: require('../../../assets/img/img_homescreen/con_trai.png'),
		name: 'Nam',
		type_user: 'Con'
	},
	{
		id: 4,
		avatar: require('../../../assets/img/img_homescreen/ba.png'),
		name: 'Lan',
		type_user: 'Bà'
	}
];

class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null,
			showModal: false,
			is_view_image: false,
			images: [],
			showDetailQR: false,
			showDetailInfo: false,
			showDetailShare: false,
			showDetailPopup: false,
			showDetailChangePass: false,
			code: ''
		};
	}

	componentDidMount = () => {
		// this.props.getUserInfoAction()
	};
	chooseAvatarFromLib = () => {
		ImagePicker.openPicker({
			width: 300,
			height: 300,
			cropping: true
		})
			.then((image) => {
				var formdata = new FormData();
				formdata.append('image', {
					uri: image.path,
					type: image.mime,
					name: 'image.jpg'
				});

				console.log('aaaaaaaaaaaa', image);
				this.props.updateAvatarAction(formdata);
				this.setModalShow();
			})
			.catch((error) => {
				this.setModalShow();
			});
	};

	chooseAvatarbyTakePhoto = () => {
		setTimeout(() => {
			ImagePicker.openCamera({
				width: 300,
				height: 400,
				cropping: true
			})
				.then((image) => {
					var formdata = new FormData();
					formdata.append('image', {
						uri: image.path,
						type: image.mime,
						name: 'avatar.jpg'
					});
					this.props.updateAvatarAction(formdata);
					this.setModalShow();
				})
				.catch((error) => {
					this.setModalShow();
				});
		}, 1000);
	};

	setModalShow = () => {
		this.setState({
			showModal: !this.state.showModal
		});
	};

	componentDidUpdate = (PrevProps, PrevState) => {
		if (PrevProps.updateAvatarReducer != this.props.updateAvatarReducer) {
			if (this.props.updateAvatarReducer.isSuccess) {
				this.alert.showAlert('Cập nhật avatar thành công', () => {});
				this.setState({
					data: this.props.updateAvatarReducer.data
				});
			} else if (this.props.updateAvatarReducer.isError) {
				this.alert.showAlert('Cập nhật avatar thất bại', () => {});
			}
		}
		if (PrevProps.getUserInfoReducer != this.props.getUserInfoReducer) {
			if (this.props.getUserInfoReducer.isSuccess) {
				this.setState({ data: this.props.getUserInfoReducer.data });
			}
		}
		if (PrevProps.popupCointReducer != this.props.popupCointReducer) {
			if (this.props.popupCointReducer.isSuccess) {
				this.setState({
					code: '',
					showDetailPopup: false
				});
				this.alert.showAlert(this.props.popupCointReducer.message, () => {});
			}
			if (this.props.popupCointReducer.isError) {
				this.alert.showAlert(this.props.popupCointReducer.message, () => {});
			}
		}
	};
	onPopupCoint = () => {
		let data = {
			code: this.state.code
		};
		this.props.popupCointAction(data);
	};
	modal = () => {
		return (
			<View>
				<Modal
					animationType="fade"
					transparent={true}
					onBackdropPress={() => {
						this.setModalShow();
					}}
					isVisible={this.state.showModal}
				>
					<View
						style={{
							backgroundColor: 'white',
							height: width / 1.8,
							width: width / 1.5,
							alignSelf: 'center',
							borderRadius: 5,
							alignItems: 'center',
							justifyContent: 'space-between',
							paddingVertical: 10
						}}
					>
						<Text style={{ fontSize: textFontSize * 1.2, color: COLOR_MINT }}>Cập nhật Avatar</Text>
						<TouchableOpacity
							style={{
								backgroundColor: COLOR_WHITEGRAY,
								padding: 10,
								width: width / 1.7,
								alignSelf: 'center',
								alignItems: 'center',
								borderRadius: 5
							}}
							onPress={() => {
								this.chooseAvatarbyTakePhoto();
							}}
						>
							<Text style={{ fontSize: textFontSize * 1.1, color: TEXT_COLOR }}>Chụp ảnh</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								backgroundColor: COLOR_WHITEGRAY,
								padding: 10,
								width: width / 1.7,
								alignSelf: 'center',
								alignItems: 'center',
								borderRadius: 5
							}}
							onPress={() => {
								this.chooseAvatarFromLib();
							}}
						>
							<Text style={{ fontSize: textFontSize * 1.1, color: TEXT_COLOR }}>Chọn từ thư viện</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								backgroundColor: COLOR_KETCHUP,
								padding: 10,
								width: width / 1.7,
								alignSelf: 'center',
								alignItems: 'center',
								borderRadius: 5
							}}
							onPress={() => {
								this.setModalShow();
							}}
						>
							<Text style={{ fontSize: textFontSize * 1.1, color: 'white' }}>Huỷ</Text>
						</TouchableOpacity>
					</View>
				</Modal>
			</View>
		);
	};

	header = () => {
		const { user } = this.props.userInfoReducer.data;

		return (
			<ImageBackground style={styles.imgHeader} source={headerImg}>
				<View style={{ flex: 2 }}>
					<Text
						style={{
							color: 'white',
							fontSize: textFontSize * 1.3,
							fontWeight: 'bold',
							textTransform: 'capitalize'
						}}
					>
						{user.full_name}
					</Text>
					<Text
						style={{
							color: 'white',
							top: 10,
							fontSize: textFontSize * 1.5
						}}
					>
						{user.user_code}
					</Text>
					<Text
						style={{
							color: 'white',
							top: 10
						}}
					>
						(Đây là mã giới thiệu của bạn)
					</Text>
				</View>
				<TouchableOpacity
					onPress={() => {
						this.setState({
							is_view_image: true,
							images: [
								{
									source: user.image
										? {
												uri: BASE_API + user.image
											}
										: user.gender == 'nam' ? chong : vo
								}
							]
						});
					}}
					style={{
						flex: 1,
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					<Avatar
						size={80}
						rounded
						avatarStyle={styles.avatar}
						source={
							user.image ? (
								{
									uri: BASE_API + user.image
								}
							) : user.gender == 'nam' ? (
								chong
							) : (
								vo
							)
						}
					/>

					<TouchableOpacity onPress={() => this.setModalShow()} style={styles.cameraContainer}>
						<Image style={styles.camera} source={camera} />
					</TouchableOpacity>
				</TouchableOpacity>
			</ImageBackground>
		);
	};
	qrcode = () => {
		const { data } = this.props.userInfoReducer;
		return (
			<View style={[ styles.container ]}>
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
					<Text style={styles.title}>QR Code cá nhân</Text>
					<TouchableOpacity
						style={styles.button}
						onPress={() => {
							this.setState({ showDetailQR: !this.state.showDetailQR });
						}}
					>
						<FontAwesome5Pro
							name={this.state.showDetailQR ? 'angle-up' : 'angle-down'}
							color={TEXT_COLOR}
							size={30}
							light
						/>
					</TouchableOpacity>
				</View>
				{this.state.showDetailQR && (
					<View style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}>
						<Image style={styles.qrcode} source={{ uri: BASE_API + data.barcode }} />
					</View>
				)}
			</View>
		);
	};

	popup = () => {
		return (
			<View style={[ styles.container ]}>
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
					<Text style={styles.title}>Nạp thẻ</Text>
					<TouchableOpacity
						style={styles.button}
						onPress={() => {
							this.setState({ showDetailPopup: !this.state.showDetailPopup });
						}}
					>
						<FontAwesome5Pro
							name={this.state.showDetailPopup ? 'angle-up' : 'angle-down'}
							color={TEXT_COLOR}
							size={30}
							light
						/>
					</TouchableOpacity>
				</View>
				{this.state.showDetailPopup && (
					<View style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}>
						<View style={{ flexDirection: 'row', marginBottom: 10 }}>
							<TextInput
								keyboardType="numeric"
								returnKeyType="done"
								style={{
									backgroundColor: COLOR_BACKGROUND_TEXT_INPUT,
									borderColor: COLOR_PRIMARY,
									borderRadius: 5,
									width: '80%',
									height: 50,
									padding: 15
								}}
								placeholder="Nhập mã thẻ"
								value={this.state.code}
								onChangeText={(text) => {
									this.setState({ code: text });
								}}
							/>
						</View>
						<View style={{ flexDirection: 'row', marginBottom: 10 }}>
							<TouchableOpacity
								style={{
									backgroundColor: '#e94125',
									width: 80,
									height: 30,
									justifyContent: 'center',
									alignItems: 'center',
									borderRadius: 5
								}}
								onPress={() => {
									this.setState({
										code: '',
										showDetailPopup: false
									});
								}}
							>
								<Text style={{ color: 'white' }}>Huỷ</Text>
							</TouchableOpacity>
							<View style={{ width: 10 }} />
							<TouchableOpacity
								style={{
									backgroundColor: COLOR_PRIMARY,
									width: 80,
									height: 30,
									justifyContent: 'center',
									alignItems: 'center',
									borderRadius: 5
								}}
								onPress={() => {
									this.onPopupCoint();
								}}
							>
								<Text style={{ color: 'white' }}>Nạp ngay</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
			</View>
		);
	};
	support = () => {
		return (
			<View style={[ styles.container ]}>
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
					<Text style={styles.title}>Hỗ trợ</Text>
					<TouchableOpacity
						style={styles.button}
						onPress={() => {
							this.props.navigation.navigate('Support');
						}}
					>
						<Text style={{ color: '#3384c5' }}>Chi tiết</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	};
	information = () => {
		const { data } = this.props.userInfoReducer;
		return (
			<View style={[ styles.container ]}>
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
					<Text style={styles.title}>Thông tin cá nhân</Text>
					<TouchableOpacity
						style={styles.button}
						onPress={() => {
							this.setState({ showDetailInfo: !this.state.showDetailInfo });
						}}
					>
						<FontAwesome5Pro
							name={this.state.showDetailInfo ? 'angle-up' : 'angle-down'}
							color={TEXT_COLOR}
							size={30}
							light
						/>
					</TouchableOpacity>
				</View>
				{this.state.showDetailInfo && (
					<View style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}>
						<View style={styles.infocontainer}>
							<Image style={styles.infoimg} source={cmnd} />
							<Text
								style={{
									flex: 5,
									color: '#0e1a24',
									fontSize: textFontSize * 1.2,
									marginLeft: 8
								}}
							>
								Thông tin cơ bản
							</Text>
							<TouchableOpacity
								style={styles.button}
								onPress={() => {
									this.props.navigation.navigate('PatientInformation', {
										data
									});
								}}
							>
								<Text style={{ color: '#3384c5' }}>Chi tiết</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.infocontainer}>
							<Image style={styles.infoimg} source={baohiem} />
							<Text
								style={{
									flex: 5,
									color: '#0e1a24',
									fontSize: textFontSize * 1.2,
									marginLeft: 8
								}}
							>
								Thông tin bảo hiểm
							</Text>

							<TouchableOpacity
								style={styles.button}
								onPress={() => {
									this.props.navigation.navigate('InsuranceInformation');
								}}
							>
								<Text style={{ color: '#3384c5' }}>Chi tiết</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.infocontainer}>
							<Image style={styles.infoimg} source={suckhoe} />
							<Text
								style={{
									flex: 5,
									color: '#0e1a24',
									fontSize: textFontSize * 1.2,
									marginLeft: 8
								}}
							>
								Thông tin sức khỏe
							</Text>
							<TouchableOpacity
								style={styles.button}
								onPress={() => {
									this.props.navigation.navigate('HeathyInfomation');
								}}
							>
								<Text style={{ color: '#3384c5' }}>Chi tiết</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
			</View>
		);
	};
	familydoc = () => {
		const data = userdata;
		return (
			<View style={{ flex: 0.7, paddingHorizontal: width / 20 }}>
				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						alignItems: 'center'
					}}
				>
					<Text style={styles.title}>Hồ sơ người thân</Text>
					<Text
						onPress={() => {
							this.props.navigation.navigate('AddNewDocument');
						}}
						style={{
							flex: 1,
							color: '#3384c5',
							position: 'absolute',
							right: 0
						}}
					>
						Thêm
					</Text>
				</View>

				<View style={{ flexDirection: 'row' }}>
					{data.map((item) => (
						<TouchableOpacity
							key={item.id}
							onPress={() => {
								this.props.navigation.navigate('FamilyDetail', { item: item });
							}}
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								margin: width / 40
							}}
						>
							<Avatar size={50} source={item.avatar} />
							<View
								style={{
									backgroundColor: COLOR_PRIMARY,
									borderRadius: 10,
									width: 50,
									justifyContent: 'center',
									alignItems: 'center',
									paddingVertical: 2,
									marginTop: -5
								}}
							>
								<Text
									style={{
										color: 'white',
										fontSize: textFontSize - 3
									}}
								>
									{item.type_user}
								</Text>
							</View>
							<Text
								style={{
									color: TEXT_COLOR,
									fontSize: textFontSize,
									fontWeight: 'bold',
									marginTop: 5
								}}
							>
								{item.name}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			</View>
		);
	};
	logout = () => {
		this.alert.showAlert(
			'Bạn có muốn đăng xuất không?',
			async () => {
				const token = await MAsyncStorage.getDeviceToken();
				this.props.deleteSubcriberAction({ token });
				MAsyncStorage.logout();
				MAsyncStorage.setCountOpenApp(0);
				this.props.navigation.setParams({ typeAction: 'LOGOUT' });
				this.props.navigation.dispatch(
					CommonActions.reset({
						index: 1,
						routes: [ { name: 'SigninStack', params: { type: 'LOGOUT' } } ]
					})
				);
			},
			() => {}
		);
	};
	changepass = () => {
		return (
			<View style={[ styles.container ]}>
				<Text style={styles.title}>Đổi mật khẩu</Text>
			</View>
		);
	};
	onShare = async () => {
		try {
			const result = await Share.share({
				title: 'Chia sẻ ứng dụng Anh Quất',
				message:
					'Tải ứng dụng Anh Quất ngay để nhận 100.000 đ. IOS: https://apps.apple.com/app/id1530540304 , Android: https://play.google.com/store/apps/details?id=com.anhquat.hospital . Hãy nhập mã giới thiệu là ' +
					this.props.userInfoReducer.data.user.user_code
			});
			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					this.alert.showAlert(
						'Bạn đã chia sẻ thành công. Sau khi người dùng mới nhập mã giới thiệu của bạn, bạn sẽ được cộng 20.000đ tiền thưởng',
						() => {}
					);
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error) {
			alert(error.message);
		}
	};
	shareApp = () => {
		return (
			<View style={[ styles.container ]}>
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
					<Text style={styles.title}>Chia sẻ ứng dụng</Text>
					<TouchableOpacity
						style={styles.button}
						onPress={() => {
							this.onShare();
						}}
					>
						<Text style={{ color: '#3384c5' }}>Chia sẻ</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	};
	logout_view = () => {
		return (
			<View style={styles.signoutContainer}>
				<TouchableOpacity onPress={this.logout} style={styles.signout}>
					<Image
						style={{ flex: 1, width: width / 20, resizeMode: 'contain' }}
						source={require('../../../assets/img/img_account/log_out.png')}
					/>
					<Text
						style={{
							flex: 4,
							color: '#e94125',
							textAlign: 'center',
							fontSize: textFontSize * 1.2
						}}
					>
						Đăng xuất
					</Text>
				</TouchableOpacity>
			</View>
		);
	};
	render() {
		return (
			<View style={{ flex: 1 }}>
				{/* <MView> */}
				{this.modal()}
				{this.header()}
				<KeyboardAwareScrollView
					keyboardShouldPersistTaps="handled"
					style={{ flex: 1 }}
					contentContainerStyle={{ paddingBottom: 100 }}
				>
					{this.qrcode()}
					{this.information()}
					{this.popup()}
					{this.shareApp()}
					{this.support()}
					{this.logout_view()}
				</KeyboardAwareScrollView>
				<MAlert ref={(ref) => (this.alert = ref)} />
				{/* </MView> */}
				<ImageView
					glideAlways
					animationType={'slide'}
					images={this.state.images}
					imageIndex={0}
					isVisible={this.state.is_view_image}
					onClose={() => this.setState({ is_view_image: false })}
				/>
			</View>
		);
	}
}
const mapStatetoProps = (state) => {
	return {
		updateAvatarReducer: state.updateAvatarReducer,
		getUserInfoReducer: state.getUserInfoReducer,
		userInfoReducer: state.userInfoReducer,
		popupCointReducer: state.popupCointReducer
	};
};
export default connect(mapStatetoProps, {
	updateAvatarAction,
	deleteSubcriberAction,
	getUserInfoAction,
	popupCointAction
})(User);

const styles = StyleSheet.create({
	container: {
		//flex: 1,
		paddingHorizontal: 20,
		paddingVertical: 10,
		backgroundColor: 'white',
		marginBottom: 5
	},
	imgHeader: {
		width: width,
		height: isIphoneX() ? width / 2 : width / 3,
		padding: width / 20,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: COLOR_PRIMARY
	},
	avatar: {
		flex: 1
		// zIndex: 0
	},
	camera: {
		width: width / 15,
		resizeMode: 'contain'
	},
	cameraContainer: {
		zIndex: 1,
		right: 10,
		// backgroundColor: "red",
		alignItems: 'center',
		bottom: -10,
		position: 'absolute'
	},
	title: {
		color: COLOR_MINT,
		fontSize: textFontSize * 1.5,
		fontWeight: 'bold'
	},
	infoimg: {
		width: width / 10,
		resizeMode: 'contain'
	},
	signout: {
		flexDirection: 'row',
		alignSelf: 'center',
		backgroundColor: '#f7d7d7',
		paddingHorizontal: width / 20,
		width: width / 2.5,
		height: width / 7,
		alignItems: 'center',
		borderRadius: 8
	},
	infocontainer: {
		height: 50,
		flexDirection: 'row',
		alignItems: 'center'
	},
	signoutContainer: {
		justifyContent: 'center',
		position: 'absolute',
		alignSelf: 'center',
		bottom: 20
	},
	qrcode: {
		width: width * 0.7,
		height: width * 0.38,
		resizeMode: 'contain'
	},
	button: {
		minWidth: 50,
		height: 30,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
