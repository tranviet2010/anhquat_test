import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, AppState, Platform } from 'react-native';
import {
	height,
	width,
	TEXT_COLOR,
	COLOR_PRIMARY,
	isIphoneX,
	COLOR_GREEN,
	COLOR_ORANGE,
	COLOR_LIGHT_BLUE,
	COLOR_MINT
} from '../../../utilities/config';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { textFontSize } from '../../../utilities/Styles';
import { Badge, Avatar } from 'react-native-elements';
import MView from '../../../components/MView';
import { add_dot_number } from '../../../utilities/StringHelper';
import OneLine, { OneLineColumn } from '../../../components/OneLine';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import MeetingItem, { DatHenHome, TaiKhamHome } from '../../../components/customize/MeetingItem';
import { connect } from 'react-redux';
import MAsyncStorage from '../../../utilities/MAsyncStorage';
import { getUserInfoAction } from '../../../redux/redux/getUserInfo';
import { receiveMessageAction } from '../../../redux/redux/chat';

const chong = require('../../../assets/img/img_homescreen/chong.png');
const cap_cuu = require('../../../assets/img/img_homescreen/cap_cuu.png');
const camera = require('../../../assets/img/img_homescreen/camera.png');
const thong_bao = require('../../../assets/img/img_homescreen/thong_bao.png');

const ban_tay = require('../../../assets/img/img_homescreen/ban_tay.png');
const chuong = require('../../../assets/img/img_homescreen/chuong.png');
const dathen = require('../../../assets/img/datlichkham.png');
const taikham = require('../../../assets/img/lichtaikham.png');
import Pusher from 'pusher-js/react-native';
import VideoCall from '../QA/VideoCall';
import MAlert from '../../../components/MAlert';

const meetingdata = [
	{
		id: 1,
		title: 'Lịch khám mắt',
		content: 'Lịch khám Nội tổng quát',
		address: 'Bệnh viện Anh Quất, Tân Yên, Bắc Giang',
		doctor: 'BS. Nguyễn Văn A',
		time: new Date(),
		avatar: chong,
		name: 'Quất',
		type_user: 'Bạn',
		type: 1,
		type_title: 'Lịch đặt hẹn'
	},
	{
		id: 2,
		title: 'Lịch khám răng hàm mặt',
		message: 'Còn 4 ngày',
		content: 'Lịch khám mắt',
		address: 'Bệnh viện Anh Quất, Tân Yên, Bắc Giang',
		doctor: 'BS. Nguyễn Văn A',
		time: new Date(),
		avatar: chong,
		name: 'Quất',
		type_user: 'Bạn',
		type: 2,
		type_title: 'Lịch tái khám'
	}
];

class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			meetingtitlecolor: '',
			data: null
		};
	}

	componentDidMount = () => {
		Pusher.logToConsole = true;
		var pusher = new Pusher('12b61648fbf1c1081d54', {
			cluster: 'ap1',
			forceTLS: true
		});
		var channel = pusher.subscribe('user-' + this.props.userInfoReducer.data.user._id);

		AppState.addEventListener('change', this._handleAppStateChange);
	};
	componentWillUnmount() {
		AppState.removeEventListener('change', this._handleAppStateChange);
	}
	_handleAppStateChange = async (nextAppState) => {
		if (nextAppState == 'active') {
			this.props.getUserInfoAction();
		}
	};
	componentDidUpdate = (PrevProps, PrevState) => {
		if (PrevProps.createAppointmentReducer != this.props.createAppointmentReducer) {
			if (this.props.createAppointmentReducer.isSuccess) {
				this.props.getUserInfoAction();
			}
		}
		if (PrevProps.createCapCuuReducer != this.props.createCapCuuReducer) {
			if (this.props.createCapCuuReducer.isSuccess) {
				this.props.getUserInfoAction();
			}
		}
		if (PrevProps.updateAvatarReducer != this.props.updateAvatarReducer) {
			if (this.props.updateAvatarReducer.isSuccess) {
				this.props.getUserInfoAction();
			}
		}
	};
	header = () => {
		const { user } = this.props.userInfoReducer.data;
		const notification = this.props.userInfoReducer.data.notifications;
		return (
			<ImageBackground
				style={{
					width: width,
					height: 'auto',
					aspectRatio: isIphoneX() ? 3.05 : 3.05,
					paddingHorizontal: 20,
					marginTop: -1
				}}
				// resizeMode="contain"
				source={
					isIphoneX() ? (
						require('../../../assets/img/img_homescreen/header_s5_2.jpg')
					) : (
						require('../../../assets/img/img_homescreen/header_s5_1.jpg')
					)
				}
			>
				<SafeAreaView>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							marginTop: Platform.OS == 'android' ? 65 : isIphoneX() ? 45 : 50,
							marginLeft: width * 0.25,
							paddingVertical: 5,
							backgroundColor: 'white',
							borderRadius: 30,
							paddingHorizontal: 10,
							justifyContent: 'space-between',
							height: 33
						}}
					>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center'
							}}
						>
							<Image source={ban_tay} style={{ height: 25, width: 25, marginRight: 10 }} />
							<Text
								style={{
									color: COLOR_PRIMARY,
									fontSize: textFontSize + 1,
									fontWeight: 'bold'
								}}
							>
								{user.full_name}
							</Text>
						</View>

						<TouchableOpacity
							style={{ alignSelf: 'flex-end' }}
							onPress={() => this.props.navigation.navigate('Notification')}
						>
							<Image source={chuong} style={{ height: 25, width: 25 }} />
							{notification ? (
								<Badge
									value={notification}
									status="error"
									containerStyle={{ position: 'absolute', top: -5, right: -10 }}
									badgeStyle={{ width: 18, height: 18, borderRadius: 30 }}
									textStyle={{ fontSize: textFontSize }}
								/>
							) : (
								<View />
							)}
						</TouchableOpacity>
					</View>
				</SafeAreaView>
			</ImageBackground>
		);
	};
	money_view = () => {
		const { coint } = this.props.userInfoReducer.data;
		return (
			<ImageBackground
				style={styles.money}
				resizeMode="contain"
				source={require('../../../assets/img/img_homescreen/money.png')}
			>
				<View
					style={[
						{
							flexDirection: 'row',
							width: width / 1.12,
							height: '100%',
							paddingTop: 25,
							paddingBottom: 10
						}
					]}
				>
					<View style={{ width: width / 4.5 }} />
					<View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 10 }}>
						<Text
							style={{
								color: 'white',
								fontSize: textFontSize,
								fontWeight: 'bold',
								fontStyle: 'italic',
								textAlign: 'center'
							}}
						>
							Số dư thanh toán
						</Text>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								flex: 2,
								paddingRight: 10,
								paddingBottom: 10
							}}
						>
							<View style={{ justifyContent: 'center', alignItems: 'center' }}>
								<Text
									style={{
										color: TEXT_COLOR,
										fontSize: textFontSize,
										fontWeight: '400'
									}}
								>
									Tài khoản nạp
								</Text>
								<Text
									style={{
										color: TEXT_COLOR,
										fontSize: textFontSize + 4,
										fontWeight: 'bold'
									}}
								>
									{add_dot_number(coint.money_real)}
								</Text>
							</View>
							<View style={{ marginHorizontal: 10 }}>
								<OneLineColumn />
							</View>
							<View
								style={{
									justifyContent: 'center',
									alignItems: 'center'
								}}
							>
								<Text
									style={{
										color: TEXT_COLOR,
										fontSize: textFontSize,
										fontWeight: '400'
									}}
									numberOfLines={1}
								>
									Tài khoản KM{' '}
									<Text
										style={{
											color: TEXT_COLOR,
											fontSize: textFontSize * 0.6,
											fontStyle: 'italic'
										}}
									>
										(có thời hạn)
									</Text>
								</Text>
								<Text
									style={{
										color: TEXT_COLOR,
										fontSize: textFontSize + 4,
										fontWeight: 'bold',
										left: -width / 40
									}}
								>
									{add_dot_number(coint.money_promotion)}
								</Text>
							</View>
						</View>
					</View>
					<TouchableOpacity
						onPress={() => {
							this.props.navigation.navigate('Wallet');
						}}
						style={{ position: 'absolute', bottom: 10, right: 10 }}
					>
						<Text
							style={{
								color: '#1393ea',
								fontSize: textFontSize - 3,
								textDecorationLine: 'underline',
								fontWeight: '500'
							}}
						>
							Chi tiết thanh toán
						</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>
		);
	};
	view_complete_info = () => {
		const is_completed = this.props.userInfoReducer.data.is_completed;
		return (
			!is_completed && (
				<View style={{ height: 50, width: '100%', paddingHorizontal: 10, marginTop: 20 }}>
					<TouchableOpacity
						onPress={() => {
							this.props.navigation.navigate('PatientInformation');
						}}
						style={[ styles.card, { backgroundColor: 'white', paddingHorizontal: 20 } ]}
					>
						<Text style={[ styles.cardText, { color: 'red' } ]}>
							Bạn chưa hoàn thành thông tin cá nhân. Bấm vào đây để hoàn thành thông tin cá nhân của bạn
						</Text>
					</TouchableOpacity>
				</View>
			)
		);
	};
	view_card = () => {
		const notification = this.props.userInfoReducer.data.notifications;
		const cap_cuu_number = this.props.userInfoReducer.data.cap_cuu.length;

		return (
			<View style={styles.option}>
				<TouchableOpacity
					onPress={() => {
						this.props.navigation.navigate('Lịch hẹn');
					}}
					style={styles.card}
				>
					<Image
						style={styles.cardImg}
						source={require('../../../assets/img/img_homescreen/lich_dat_hen.png')}
					/>
					<Text style={styles.cardText}>Đặt lịch hẹn</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						this.props.navigation.navigate('ExamineHistory');
					}}
					style={styles.card}
				>
					<Image
						style={styles.cardImg}
						source={require('../../../assets/img/img_homescreen/KQ_va_ls_kham.png')}
					/>
					<Text style={styles.cardText}>Kết quả và lịch sử khám</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						// this.malert.showAlert('Hệ thống đang được nâng cấp. Xin cảm ơn',()=>{})
						this.props.navigation.navigate('DoctorList');
					}}
					style={styles.card}
				>
					<Image style={[ styles.cardImg, { width: width / 6, height: width / 6 } ]} source={camera} />
					<Text style={styles.cardText}>Gọi video với bác sĩ</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						this.props.navigation.navigate('CallEmergency');
					}}
					style={styles.card}
				>
					<Image style={[ styles.cardImg, { width: width / 5, height: width / 6 } ]} source={cap_cuu} />
					<Text style={styles.cardText}>Gọi cấp cứu</Text>
					{cap_cuu_number ? (
						<Badge
							value={cap_cuu_number}
							status="error"
							containerStyle={{ position: 'absolute', top: 4, right: 4 }}
							badgeStyle={{ width: 18, height: 18, borderRadius: 30 }}
							textStyle={{ fontSize: textFontSize }}
						/>
					) : (
						<View />
					)}
				</TouchableOpacity>
			</View>
		);
	};
	view_appointment = () => {
		return (
			<ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'space-between', paddingTop: 20 }}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						paddingHorizontal: 15,
						height: width * 0.3,
						paddingBottom: 10
					}}
				>
					{/* {this.cap_cuu()} */}
					{this.view_lich_tai_kham()}
					<View style={{ width: 10 }} />
					{this.view_lich_dat_hen()}
				</View>
				<Image
					style={{
						width: width,
						height: 'auto',
						aspectRatio: 1.68
					}}
					source={require('../../../assets/img/img_homescreen/bvanhquat.jpg')}
				/>
			</ScrollView>
		);
	};
	view_lich_dat_hen = () => {
		const data = this.props.userInfoReducer.data.lich_hen;
		// const data = meetingdata;
		let item =
			data.length > 0
				? {
						id: 1,
						title: 'Bn: ' + data[0].full_name,
						address: 'Khám tại: Bệnh viện Anh Quất, Tân Yên, Bắc Giang',
						thoi_gian: data[0].thoi_gian,
						avatar: chong,
						type: 1,
						loai: data[0].loai,
						type_title: 'Lịch đặt hẹn',
						badge: data.length,
						onPress: () => this.props.navigation.navigate('Lịch hẹn')
					}
				: {
						id: 1,
						type: 1,
						type_title: 'Lịch đặt hẹn',
						onPress: () => {}
					};
		return <DatHenHome key={item._id} meeting={true} item={item} />;
	};

	view_lich_tai_kham = () => {
		const data = this.props.userInfoReducer.data.lich_tai_kham;
		let item =
			data.length > 0
				? {
						id: 1,
						title: 'Bn: ' + data[0].full_name,
						address: 'Khám tại: Bệnh viện Anh Quất, Tân Yên, Bắc Giang',
						thoi_gian: data[0].thoi_gian,
						avatar: chong,
						type: 2,
						loai: data[0].loai,
						type_title: 'Lịch tái khám',
						badge: data.length,
						onPress: () => this.props.navigation.navigate('Lịch hẹn')
					}
				: {
						id: 1,
						type: 2,
						type_title: 'Lịch tái khám',
						onPress: () => {}
					};
		return <TaiKhamHome key={item._id} meeting={true} item={item} />;
	};

	render() {
		return (
			<MView>
				{this.header()}
				<VideoCall navigation={this.props.navigation} />
				<MAlert ref={(ref) => (this.malert = ref)} />
			</MView>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		userInfoReducer: state.userInfoReducer,
		createAppointmentReducer: state.createAppointmentReducer,
		createCapCuuReducer: state.createCapCuuReducer,
		updateAvatarReducer: state.updateAvatarReducer
	};
};
export default connect(mapStateToProps, { getUserInfoAction, receiveMessageAction })(HomeScreen);
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	imageBackground: {
		flex: 1,
		width: width,
		height: height / 4,
		flexDirection: 'column-reverse'
	},
	header: {
		width: width,
		height: isIphoneX() ? width / 2 : width / 3,
		paddingHorizontal: 20
	},
	money: {
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		height: 'auto',
		width: width * 0.9,
		marginTop: -25,
		borderRadius: 10,
		aspectRatio: 3.56
	},
	option: {
		flexDirection: 'row',
		justifyContent: 'center',
		width: '100%',
		paddingLeft: 10,
		paddingRight: 10,
		marginTop: height / 50
	},
	card: {
		backgroundColor: 'white',
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		marginHorizontal: 4,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3
	},
	cardImg: {
		height: width / 6,
		width: width / 9,
		alignSelf: 'center',
		resizeMode: 'contain'
	},
	cardText: {
		fontSize: (width + height) / 100,
		textAlign: 'center',
		justifyContent: 'center',
		paddingLeft: 5,
		paddingRight: 5,
		paddingBottom: 5
	},
	appointment: {
		width: width,
		flexDirection: 'column',
		marginTop: height / 25,
		alignSelf: 'center'
	},
	meetingReminder: {
		paddingVertical: 10,
		paddingLeft: 15,
		width: width * 0.92,
		minHeight: width * 0.3,
		marginHorizontal: 4,
		backgroundColor: 'white',
		marginBottom: 20,
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	imgContainer: {
		flex: 1,
		height: width / 3,
		top: -width / 3.5
	},
	img: {
		width: width / 2.2,
		resizeMode: 'contain'
	},
	makeappt: {
		marginTop: 10,
		padding: 10,
		backgroundColor: COLOR_PRIMARY,
		width: width / 3,
		borderRadius: 5,
		alignItems: 'center'
	}
});
