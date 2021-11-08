import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MView from '../../../components/MView';
import MHeader from '../../../components/MHeader';
import { COLOR_MINT, width, TEXT_COLOR, COLOR_PRIMARY } from '../../../utilities/config';
import { textFontSize } from '../../../utilities/Styles';
import { view_status } from '../../../components/customize/MeetingItem';
import { connect } from 'react-redux';
import { getDetailAppointmentAction } from '../../../redux/redux/getDetailAppointment';
import { CommonActions, StackActions } from '@react-navigation/native';
import MAsyncStorage from '../../../utilities/MAsyncStorage';
import { dateDDMMYYYY, datehhmm } from '../../../utilities/StringHelper';
import MAlert from '../../../components/MAlert';
import { ActivityIndicator } from 'react-native-paper';
import { deleteAppointmentAction } from '../../../redux/redux/deleteAppointment';
import { ScrollView } from 'react-native-gesture-handler';

class DetailAppointment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: {}
		};
	}

	componentDidMount = () => {
		this.props.getDetailAppointmentAction(this.props.route.params.appointment_id);
	};
	componentDidUpdate = (PrevProps) => {
		if (this.props.getDetailAppointmentReducer != PrevProps.getDetailAppointmentReducer) {
			if (this.props.getDetailAppointmentReducer.isError) {
				this.malert.showAlert('Có lỗi xảy ra. Vui lòng thử lại sau');
			}
		}
		if (PrevProps.deleteAppointmentReducer != this.props.deleteAppointmentReducer) {
			if (this.props.deleteAppointmentReducer.isSuccess) {
				this.props.getDetailAppointmentAction(this.props.route.params.appointment_id);
			}
		}
	};

	onDelete = (id) => {
		this.props.deleteAppointmentAction(id);
	};

	onShowModalCancel = (id) => {
		this.malert.showAlert(
			'Bạn có chắc chắn muốn huỷ lịch hẹn khám này?',
			() => {
				this.onDelete(id);
			},
			() => {}
		);
	};
	render() {
		let data = this.props.getDetailAppointmentReducer.data;
		let user_data = this.props.userInfoReducer.data;
		return (
			<MView>
				<MHeader
					onPress={() => {
						this.props.navigation.pop();
					}}
					text="Thông tin đặt hẹn"
					rightComponent={
						data.status == 0 ? (
							<TouchableOpacity onPress={() => this.onShowModalCancel(data._id)}>
								<Text style={[ styles.title, { color: 'white' } ]}>Huỷ</Text>
							</TouchableOpacity>
						) : null
					}
				/>
				<ScrollView>
					{this.props.getDetailAppointmentReducer.isLoading ? (
						<ActivityIndicator
							size="large"
							color={COLOR_PRIMARY}
							style={{ margin: 200, alignSelf: 'center' }}
						/>
					) : null}
					{this.props.getDetailAppointmentReducer.isSuccess ? (
						<View style={[ styles.container2 ]}>
							{/* <View style={styles.titleContainer}>
							<Text style={styles.title}>Thông tin đặt hẹn</Text>
						</View> */}
							<View style={styles.card}>
								{data.loai == 0 ? (
									<View style={{ alignItems: 'center', marginTop: 10 }}>
										<Text
											style={{
												color: COLOR_PRIMARY,
												fontSize: textFontSize + 4,
												fontWeight: 'bold'
											}}
										>
											Khám bệnh
										</Text>
										<Text
											style={{
												fontSize: textFontSize,
												color: TEXT_COLOR
											}}
										>
											(Khám chữa bệnh)
										</Text>
									</View>
								) : null}
								{data.loai == 1 ? (
									<View style={{ alignItems: 'center', marginTop: 10 }}>
										<Text
											style={{
												color: COLOR_PRIMARY,
												fontSize: textFontSize + 4,
												fontWeight: 'bold'
											}}
										>
											Khám sức khoẻ
										</Text>
										<Text
											style={{
												fontSize: textFontSize,
												color: TEXT_COLOR,
												textAlign: 'center'
											}}
										>
											(Được cấp giấy chứng nhận sức khoẻ)
										</Text>
									</View>
								) : null}
								<View style={{ flexDirection: 'row' }}>
									<View style={styles.container}>
										<Text style={styles.titleText}>Họ và tên</Text>
										{data.full_name ? (
											<Text style={styles.contentText}>{data.full_name}</Text>
										) : (
											<View />
										)}
									</View>
									<View style={styles.container}>
										<Text style={styles.titleText}>Số điện thoại</Text>
										{user_data.user.phone ? (
											<Text style={styles.contentText}>{user_data.user.phone}</Text>
										) : (
											<View />
										)}
									</View>
								</View>
								<View style={{ flexDirection: 'row' }}>
									<View style={styles.container}>
										<Text style={styles.titleText}>Số thẻ BHYT</Text>
										{data.so_bhyt ? (
											<Text style={styles.contentText}>{data.so_bhyt}</Text>
										) : (
											<Text style={styles.contentText}>Chưa có BHYT</Text>
										)}
									</View>
									<View style={styles.container}>
										<Text style={styles.titleText}>CMT/CCCD</Text>
										{user_data.identity ? (
											<Text style={styles.contentText}>
												{user_data.identity.so_cmt}
												<Text style={{ fontSize: textFontSize }}>
													{'\n' + 'Cấp ngày: ' + dateDDMMYYYY(user_data.identity.ngay_cap)}
												</Text>
											</Text>
										) : (
											<Text style={styles.contentText}>Chưa có số CMT</Text>
										)}
									</View>
								</View>
								<View style={{ flexDirection: 'row' }}>
									<View style={styles.container}>
										<Text style={styles.titleText}>Chiều cao</Text>
										{user_data.user.chieu_cao ? (
											<Text style={styles.contentText}>{user_data.user.chieu_cao} cm</Text>
										) : (
											<Text style={styles.contentText}>Chưa rõ</Text>
										)}
									</View>
									<View style={styles.container}>
										<Text style={styles.titleText}>Cân nặng</Text>
										{user_data.user.can_nang ? (
											<Text style={styles.contentText}>{user_data.user.can_nang} kg</Text>
										) : (
											<Text style={styles.contentText}>Chưa rõ</Text>
										)}
									</View>
								</View>
								<View style={{ flexDirection: 'row' }}>
									<View style={styles.container}>
										<Text style={styles.titleText}>Giới tính</Text>
										{user_data.user.gender == 'nam' ? (
											<Text style={styles.contentText}>Nam</Text>
										) : (
											<Text style={styles.contentText}>Nữ</Text>
										)}
									</View>
									<View style={styles.container}>
										<Text style={styles.titleText}>Ngày sinh</Text>
										{user_data.user.date_of_bird ? (
											<Text style={styles.contentText}>
												{dateDDMMYYYY(user_data.user.date_of_bird)}
											</Text>
										) : (
											<Text style={styles.contentText}>Chưa rõ</Text>
										)}
									</View>
								</View>
								<View style={{ flexDirection: 'row' }}>
									<View style={styles.container}>
										<Text style={styles.titleText}>Ngày hẹn</Text>
										<Text style={styles.contentText}>{dateDDMMYYYY(data.thoi_gian)}</Text>
									</View>
									<View style={styles.container}>
										<Text style={styles.titleText}>Giờ hẹn</Text>
										<Text style={styles.contentText}>{datehhmm(data.thoi_gian)}</Text>
									</View>
								</View>
								<View
									style={{
										marginTop: width / 25,
										marginHorizontal: width / 25,
										flexDirection: 'row'
										// justifyContent: 'space-between'
									}}
								>
									<Text style={styles.titleText}>Trạng thái</Text>
									<View style={{ width: 10 }} />
									<Text style={styles.contentText}>{view_status(data.status)}</Text>
								</View>
								<View style={{ marginTop: width / 25, marginHorizontal: width / 25 }}>
									<Text style={styles.titleText}>Khám tại</Text>
									<Text style={styles.contentText}>Bệnh viện Anh Quất, Tân Yên, Bắc Giang</Text>
								</View>
								<View style={{ marginTop: width / 25, marginHorizontal: width / 25 }}>
									<Text style={styles.titleText}>Lý do hẹn</Text>
									<Text style={styles.contentText}>{data.ly_do}</Text>
								</View>
							</View>
						</View>
					) : null}
					{this.props.getDetailAppointmentReducer.isSuccess ? (
						<View style={[ styles.container2 ]}>
							<View style={styles.card}>
								<View style={{ alignItems: 'center', marginTop: 10 }}>
									<Text
										style={{ color: COLOR_PRIMARY, fontSize: textFontSize + 4, fontWeight: 'bold' }}
									>
										Khai báo y tế
									</Text>
								</View>
								{data.to_khai_y_te ? (
									<View
										style={{
											marginTop: width / 25,
											marginHorizontal: width / 25,
											flexDirection: 'row',
											alignItems: 'center',
											justifyContent: 'space-between'
										}}
									>
										<Text style={styles.titleText}>Thời gian khai báo</Text>
										<Text style={styles.contentText}>
											{datehhmm(data.to_khai_y_te.createdAt) +
												' ' +
												dateDDMMYYYY(data.to_khai_y_te.createdAt)}
										</Text>
									</View>
								) : (
									<View
										style={{
											marginTop: width / 25,
											marginHorizontal: width / 25,
											alignItems: 'center'
										}}
									>
										<Text style={[ styles.titleText, { color: 'red', textAlign: 'center' } ]}>
											Chưa khai báo
										</Text>
									</View>
								)}
								<View style={{ marginTop: width / 25, marginHorizontal: width / 25 }}>
									{data.to_khai_y_te ? (
										<TouchableOpacity
											style={{
												backgroundColor: COLOR_PRIMARY,
												height: 35,
												width: 120,
												justifyContent: 'center',
												alignItems: 'center',
												borderRadius: 10,
												alignSelf: 'center'
											}}
											onPress={() => {
												this.props.navigation.navigate('DetailKhaiBaoYTe', {
													data: data,
													is_lich_hen: true
												});
											}}
										>
											<Text style={{ color: 'white' }}>Xem chi tiết</Text>
										</TouchableOpacity>
									) : data.status == 0 ? (
										<TouchableOpacity
											style={{
												backgroundColor: COLOR_PRIMARY,
												height: 35,
												width: 120,
												justifyContent: 'center',
												alignItems: 'center',
												borderRadius: 10,
												alignSelf: 'center'
											}}
											onPress={() => {
												this.props.navigation.navigate('EditKhaiBaoYTe', {
													data: data,
													is_lich_hen: true,
													action: () =>
														this.props.getDetailAppointmentAction(
															this.props.route.params.appointment_id
														)
												});
											}}
										>
											<Text style={{ color: 'white' }}>Khai báo ngay</Text>
										</TouchableOpacity>
									) : null}
								</View>
							</View>
						</View>
					) : null}
				</ScrollView>

				{/* <NButton
					onPress={() => {
						// this.props.navigation.navigate("DetailInformation")
						this.onCreate();
					}}
					top={width / 3}
					text="TIẾP TỤC"
					style={{ marginTop: width / 20 }}
					bgCl={COLOR_PRIMARY}
				/> */}
				<MAlert ref={(ref) => (this.malert = ref)} />
			</MView>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		getDetailAppointmentReducer: state.getDetailAppointmentReducer,
		userInfoReducer: state.userInfoReducer,
		deleteAppointmentReducer: state.deleteAppointmentReducer
	};
};

export default connect(mapStateToProps, { getDetailAppointmentAction, deleteAppointmentAction })(DetailAppointment);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: width / 25,
		marginHorizontal: width / 25
	},
	container2: {
		marginTop: width / 25,
		marginHorizontal: width / 25
	},
	title: {
		color: COLOR_MINT,
		fontSize: textFontSize * 1.3,
		fontWeight: 'bold'
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	titleText: {
		fontSize: textFontSize,
		color: '#211f20'
	},
	contentText: {
		fontSize: textFontSize * 1.2,
		color: TEXT_COLOR,
		fontWeight: 'bold'
	},
	card: {
		backgroundColor: 'white',
		marginTop: width / 20,
		paddingBottom: width / 30
	}
});
