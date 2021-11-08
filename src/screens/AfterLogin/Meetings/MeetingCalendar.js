import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	ImageBackground,
	FlatList,
	Image,
	RefreshControl,
	StatusBar,
	Platform
} from 'react-native';
import {
	height,
	width,
	TEXT_COLOR,
	COLOR_PRIMARY,
	isIphoneX,
	COLOR_GREEN,
	COLOR_ORANGE,
	COLOR_LIGHT_BLUE
} from '../../../utilities/config';
import { textFontSize } from '../../../utilities/Styles';
import MView from '../../../components/MView';
import { LichHenKhamItem } from '../../../components/customize/MeetingItem';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { getAppointmentListAction } from '../../../redux/redux/getAppointmentList';
import { deleteAppointmentAction } from '../../../redux/redux/deleteAppointment';
import MAlert from '../../../components/MAlert';
const con_gai = require('../../../assets/img/img_homescreen/con_gai.png');
const chong = require('../../../assets/img/img_homescreen/chong.png');
const dat_lich = require('../../../assets/img/img_meetings/dat_lich.png');
const dathen = require('../../../assets/img/datlichkham.png');
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { ActivityIndicator } from 'react-native-paper';

const meetingdata_1 = [
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
		status: 1
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
		type: 1,
		status: 2
	}
];
const meetingdata_2 = [
	{
		id: 1,
		title: 'Lịch khám nam khoa',
		content: 'Lịch khám Nội tổng quát',
		address: 'Bệnh viện Anh Quất, Tân Yên, Bắc Giang',
		doctor: 'BS. Nguyễn Văn A',
		time: new Date(),
		avatar: chong,
		name: 'Quất',
		type_user: 'Bạn',
		type: 2,
		status: 3,
		note: 'Không liên lạc được'
	},
	{
		id: 2,
		title: 'Lịch khám nội khoa',
		message: 'Còn 4 ngày',
		content: 'Lịch khám mắt',
		address: 'Bệnh viện Anh Quất, Tân Yên, Bắc Giang',
		doctor: 'BS. Nguyễn Văn A',
		time: new Date(),
		avatar: con_gai,
		name: 'Quất',
		type_user: 'Bạn',
		type: 2,
		status: 2
	}
];
class MeetingCalendar extends Component {
	constructor(props) {
		super(props);
		(this.params_appointmentlist = {
			page: 1,
			perPage: 10
		}),
			(this.state = {
				username: 'NGUYỄN THẾ QUẤT',
				meetingtitlecolor: '',
				tab: 'Lịch đặt hẹn',
				meetingdata: [],
				params_appointmentlist: this.params_appointmentlist
			});
	}

	componentDidMount = () => {
		this.props.getAppointmentListAction({});
		this.onRefreshAppointmentList();
	};

	onRefreshAppointmentList = () => {
		this.props.getAppointmentListAction(this.params_appointmentlist);
	};

	componentDidUpdate = (PrevProps, PrevState) => {
		if (PrevProps.getAppointmentListReducer != this.props.getAppointmentListReducer) {
			if (this.props.getAppointmentListReducer.isSuccess) {
				const data = this.props.getAppointmentListReducer.data;
				this.setState({ meetingdata: data });
			}
		}
		if (PrevProps.createAppointmentReducer != this.props.createAppointmentReducer) {
			if (this.props.createAppointmentReducer.isSuccess) {
				this.props.getAppointmentListAction({});
				this.onRefreshAppointmentList();
			}
		}
		if (PrevProps.deleteAppointmentReducer != this.props.deleteAppointmentReducer) {
			if (this.props.deleteAppointmentReducer.isSuccess) {
				this.props.getAppointmentListAction({});
			}
		}
		if (PrevProps.userInfoReducer != this.props.userInfoReducer) {
			this.props.getAppointmentListAction({});
		}
		if (PrevProps.updateKhaiBaoYTeReducer != this.props.updateKhaiBaoYTeReducer) {
			if (this.props.updateKhaiBaoYTeReducer.isSuccess) {
				this.props.getAppointmentListAction({});
				this.onRefreshAppointmentList();
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
	view_tab = () => {
		return (
			<View style={{ flexDirection: 'row', paddingHorizontal: 14, justifyContent: 'space-between' }}>
				<TouchableOpacity
					activeOpacity={1}
					onPress={() => {
						this.setState({ tab: 'Lịch đặt hẹn' });
					}}
					style={this.state.tab == 'Lịch đặt hẹn' ? styles.active_button : styles.disable_button}
				>
					<Text style={this.state.tab == 'Lịch đặt hẹn' ? styles.active_text : styles.disable_text}>
						Lịch đặt hẹn
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					activeOpacity={1}
					onPress={() => {
						this.setState({ tab: 'Lịch tái khám' });
					}}
					style={this.state.tab == 'Lịch tái khám' ? styles.active_button : styles.disable_button}
				>
					<Text style={this.state.tab == 'Lịch tái khám' ? styles.active_text : styles.disable_text}>
						Lịch tái khám
					</Text>
				</TouchableOpacity>
			</View>
		);
	};
	view_tab_2 = () => {
		return (
			<View style={{ flexDirection: 'row', paddingHorizontal: 14, justifyContent: 'space-between' }}>
				{this.state.tab == 'Lịch đặt hẹn' && (
					<TouchableOpacity
						activeOpacity={1}
						onPress={() => {
							this.setState({ tab: 'Lịch đặt hẹn' });
						}}
						style={this.state.tab == 'Lịch đặt hẹn' ? styles.active_button : styles.disable_button}
					>
						<Text style={this.state.tab == 'Lịch đặt hẹn' ? styles.active_text : styles.disable_text}>
							Lịch đặt hẹn
						</Text>
					</TouchableOpacity>
				)}
				{this.state.tab == 'Lịch tái khám' && (
					<TouchableOpacity
						activeOpacity={1}
						onPress={() => {
							this.setState({ tab: 'Lịch tái khám' });
						}}
						style={this.state.tab == 'Lịch tái khám' ? styles.active_button : styles.disable_button}
					>
						<Text style={this.state.tab == 'Lịch tái khám' ? styles.active_text : styles.disable_text}>
							Lịch tái khám
						</Text>
					</TouchableOpacity>
				)}
				<TouchableOpacity
					onPress={() => {
						this.props.navigation.navigate('MakeAppointment');
					}}
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						borderRadius: 30,
						backgroundColor: COLOR_ORANGE,
						paddingHorizontal: 25,
						paddingVertical: 11
					}}
				>
					<Text
						style={{
							fontSize: textFontSize,
							color: 'white',
							fontWeight: 'bold'
						}}
					>
						Đặt lịch
					</Text>
				</TouchableOpacity>
			</View>
		);
	};
	header = () => {
		return (
			<View style={{}}>
				<ImageBackground style={styles.header} resizeMode="contain" source={dat_lich} />
				{this.view_tab()}
				<View
					style={{
						paddingHorizontal: 14,
						position: 'absolute',
						paddingTop: isIphoneX() ? 40 : 10,
						flexDirection: 'row',
						justifyContent: 'space-between',
						width: '100%'
					}}
				>
					<Text style={[ styles.active_text, { fontSize: textFontSize + 10 } ]}>Lịch hẹn</Text>
					<TouchableOpacity
						onPress={() => {
							this.props.navigation.navigate('MakeAppointment');
						}}
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							borderRadius: 30,
							backgroundColor: COLOR_ORANGE,
							paddingHorizontal: 25,
							paddingVertical: 11,
							marginTop: 15
						}}
					>
						<Text
							style={{
								fontSize: textFontSize,
								color: 'white',
								fontWeight: 'bold'
							}}
						>
							Đặt lịch
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	};
	next_page_appointment_list = () => {
		this.setState(
			{
				params_appointmentlist: {
					...this.state.params_appointmentlist,
					page: this.state.params_appointmentlist.page + 1
				}
			},
			() => this.props.getAppointmentListAction(this.state.params_appointmentlist)
		);
	};
	goDetail = (id) => {
		this.props.navigation.navigate('DetailAppointment', { appointment_id: id });
	};
	view_appointment = () => {
		if (this.props.getAppointmentListReducer.isLoading) {
			return <ActivityIndicator size="small" color={COLOR_PRIMARY} />;
		} else {
			if (this.state.meetingdata.toString() != []) {
				return (
					<FlatList
						refreshControl={
							<RefreshControl
								refreshing={this.props.getAppointmentListReducer.isLoading}
								onRefresh={this.onRefreshAppointmentList}
							/>
						}
						onEndReachedThreshold={0.2}
						onEndReached={({ distanceFromEnd }) => {
							if (this.props.getAppointmentListReducer.canLoadMore) {
								this.next_page_appointment_list();
							}
						}}
						initialNumToRender={10}
						maxToRenderPerBatch={10}
						windowSize={10}
						legacyImplementation={false}
						updateCellsBatchingPeriod={50}
						data={this.state.meetingdata}
						keyExtractor={(item, index) => index + ''}
						renderItem={({ item, index }) => {
							return (
								<LichHenKhamItem
									onPressCancel={() => {
										this.onShowModalCancel(item._id);
									}}
									onPress={() => {
										this.goDetail(item._id);
									}}
									item={item}
								/>
							);
						}}
						contentContainerStyle={{ paddingHorizontal: 10 }}
					/>
				);
			} else {
				return (
					<View style={styles.imgContainer}>
						<Text
							style={{
								textAlign: 'center',
								fontSize: textFontSize,
								color: TEXT_COLOR
							}}
						>
							Bạn chưa có lịch hẹn nào!
						</Text>
						<TouchableOpacity
							onPress={() => {
								this.props.navigation.navigate('MakeAppointment');
							}}
						>
							<Text
								style={{
									textAlign: 'center',
									color: COLOR_ORANGE,
									fontWeight: 'bold',
									fontSize: textFontSize * 1.2
								}}
							>
								Đặt lịch ngay
							</Text>
						</TouchableOpacity>
					</View>
				);
			}
		}
	};
	view_reschedule = () => {
		const data = [];
		if (data.toString() != []) {
			return (
				<FlatList
					initialNumToRender={10}
					maxToRenderPerBatch={10}
					windowSize={10}
					legacyImplementation={false}
					updateCellsBatchingPeriod={50}
					data={data}
					keyExtractor={(item, index) => index + ''}
					renderItem={({ item, index }) => {
						return (
							<LichHenKhamItem
								onPressCancel={() => {
									this.onShowModalCancel(item._id);
								}}
								onPress={() => {
									this.goDetail(item._id);
								}}
								item={item}
							/>
						);
					}}
					contentContainerStyle={{ paddingHorizontal: 10 }}
				/>
			);
		} else {
			return (
				<View style={styles.imgContainer}>
					<Text
						style={{
							textAlign: 'center',
							fontSize: textFontSize,
							color: TEXT_COLOR
						}}
					>
						Bạn chưa có lịch tái khám nào!
					</Text>
				</View>
			);
		}
	};
	render() {
		return (
			// <MView>
			// 	{/* <StatusBar barStyle="dark-content" /> */}
			// 	<ParallaxScrollView
			// 		backgroundColor="#fff"
			// 		// onScroll={Animated.event([ { nativeEvent: { contentOffset: { y: this.state.scrollY } } } ], {
			// 		// 	useNativeDriver: false
			// 		// })}
			// 		//headerBackgroundColor="#000"
			// 		backgroundColor="#fff"
			// 		stickyHeaderHeight={Platform.OS == 'android' ? 75 : isIphoneX() ? 85 : 75}
			// 		parallaxHeaderHeight={width * 0.7}
			// 		backgroundSpeed={10}
			// 		// renderForeground={() => (
			// 		// 	<TouchableOpacity style={styles.create_1}>
			// 		// 		<Text
			// 		// 			onPress={() => this.props.navigation.navigate('ChatBox')}
			// 		// 			style={{
			// 		// 				color: 'white',
			// 		// 				textAlign: 'center',
			// 		// 				fontWeight: 'bold',
			// 		// 				fontSize: textFontSize * 1.1
			// 		// 			}}
			// 		// 		>
			// 		// 			Tạo mới
			// 		// 		</Text>
			// 		// 	</TouchableOpacity>
			// 		// )}
			// 		// renderFixedHeader={() => {
			// 		// 	return (
			// 		// 		<View>
			// 		// 			<Text style={{ color: '#000' }}>Back</Text>
			// 		// 		</View>
			// 		// 	);
			// 		// }}
			// 		renderStickyHeader={() => {
			// 			return (
			// 				<View
			// 					style={{
			// 						flexDirection: 'row',
			// 						backgroundColor: COLOR_PRIMARY,
			// 						alignItems: 'center',
			// 						paddingHorizontal: 15,
			// 						height: Platform.OS == 'android' ? 65 : isIphoneX() ? 85 : 70,
			// 						paddingTop: Platform.OS == 'android' ? 0 : isIphoneX() ? 5 : 15
			// 					}}
			// 				>
			// 					<Text style={[ styles.active_text, { fontSize: textFontSize + 10, color: 'white' } ]}>
			// 						Lịch hẹn
			// 					</Text>
			// 					{this.view_tab_2()}
			// 				</View>
			// 			);
			// 		}}
			// 		renderBackground={this.header}
			// 	>
			// 		{this.state.tab == 'Lịch đặt hẹn' ? this.view_appointment() : this.view_reschedule()}
			// 	</ParallaxScrollView>
			// 	<MAlert ref={(ref) => (this.malert = ref)} />
			// </MView>
			<MView>
				<View
					style={{
						flexDirection: 'row',
						backgroundColor: COLOR_PRIMARY,
						alignItems: 'center',
						justifyContent: 'space-between',
						paddingHorizontal: 15,
						height: Platform.OS == 'android' ? 65 : isIphoneX() ? 100 : 70,
						paddingTop: Platform.OS == 'android' ? 0 : isIphoneX() ? 30 : 15
					}}
				>
					<Text style={[ styles.active_text, { fontSize: textFontSize + 10, color: 'white' } ]}>
						Lịch hẹn
					</Text>
					<TouchableOpacity
						onPress={() => {
							this.props.navigation.navigate('MakeAppointment');
						}}
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							borderRadius: 30,
							backgroundColor: COLOR_ORANGE,
							paddingHorizontal: 25,
							paddingVertical: 11
						}}
					>
						<Text
							style={{
								fontSize: textFontSize,
								color: 'white',
								fontWeight: 'bold'
							}}
						>
							Đặt lịch
						</Text>
					</TouchableOpacity>
				</View>
				{this.view_tab()}

				{this.state.tab == 'Lịch đặt hẹn' ? this.view_appointment() : this.view_reschedule()}
				<MAlert ref={(ref) => (this.malert = ref)} />
			</MView>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		getAppointmentListReducer: state.getAppointmentListReducer,
		createAppointmentReducer: state.createAppointmentReducer,
		deleteAppointmentReducer: state.deleteAppointmentReducer,
		userInfoReducer: state.userInfoReducer,
		updateKhaiBaoYTeReducer: state.updateKhaiBaoYTeReducer
	};
};

export default connect(mapStateToProps, { getAppointmentListAction, deleteAppointmentAction })(MeetingCalendar);

const styles = StyleSheet.create({
	imageBackground: {
		flex: 1,
		width: width,
		height: height / 4,
		flexDirection: 'column-reverse'
	},
	header: {
		width: width / 1.4,
		height: isIphoneX() ? width / 1.5 : width / 2,
		alignSelf: 'center',
		marginTop: 35
	},
	active_button: {
		backgroundColor: COLOR_LIGHT_BLUE,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 10,
		marginRight: 20,
		flex: 1,
		marginVertical: 10
	},
	disable_button: {
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 10,
		marginRight: 20,
		flex: 1,
		marginVertical: 10
	},
	active_text: {
		fontSize: textFontSize + 2,
		color: COLOR_PRIMARY,
		fontWeight: 'bold'
	},
	disable_text: {
		fontSize: textFontSize + 2,
		color: TEXT_COLOR
	},
	imgContainer: {
		alignSelf: 'center',
		top: width / 3
	}
});
