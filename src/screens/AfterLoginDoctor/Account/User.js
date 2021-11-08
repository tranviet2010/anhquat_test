import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
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
	COLOR_WHITEGRAY
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
import { ScrollView } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
const headerImg = require('../../../assets/img/img_account/nen_tren.png');
const cmnd = require('../../../assets/img/img_account/thong_tin_co_ban.png');
const baohiem = require('../../../assets/img/img_account/thong_tin_bao_hiem.png');
const suckhoe = require('../../../assets/img/img_account/thong_tin_suc_khoe.png');
const camera = require('../../../assets/img/img_account/may_anh_acc.png');
const chong = require('../../../assets/img/img_homescreen/chong.png');
const vo = require('../../../assets/img/img_homescreen/vo.png');

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
			showModal: false
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
							<Text style={{ fontSize: textFontSize * 1.1, color: 'white' }}>Cancel</Text>
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
				</View>
				<View
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
				</View>
			</ImageBackground>
		);
	};
	qrcode = () => {
		const { data } = this.props.userInfoReducer;

		return (
			<View style={styles.container}>
				<Text style={styles.title}>QR Code cá nhân</Text>
				<View style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}>
					<Image style={styles.qrcode} source={{ uri: BASE_API + data.barcode }} />
				</View>
			</View>
		);
	};
	information = () => {
		const { data } = this.props.userInfoReducer;
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Thông tin</Text>
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
							// this.props.navigation.navigate("PatientInformation");
						}}
					>
						<Text style={{ color: '#3384c5' }}>Chi tiết</Text>
					</TouchableOpacity>
				</View>
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
				// this.props.navigation.navigate('BeforeLoginStack', {
				// 	screen: 'SigninScreen'
				// });
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
				<ScrollView contentContainerStyle={{ flex: 1, paddingBottom: 100 }}>
					{/* {this.qrcode()} */}
					{/* {this.information()} */}
					{/* {this.familydoc()} */}
					{/* {this.changepass()} */}
					{this.logout_view()}
				</ScrollView>
				<MAlert ref={(ref) => (this.alert = ref)} />
				{/* </MView> */}
			</View>
		);
	}
}
const mapStatetoProps = (state) => {
	return {
		updateAvatarReducer: state.updateAvatarReducer,
		getUserInfoReducer: state.getUserInfoReducer,
		userInfoReducer: state.userInfoReducer
	};
};
export default connect(mapStatetoProps, { updateAvatarAction, deleteSubcriberAction, getUserInfoAction })(User);

const styles = StyleSheet.create({
	container: {
		//flex: 1,
		paddingHorizontal: width / 20,
		paddingTop: width / 30
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
		width: 100,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
