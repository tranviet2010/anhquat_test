import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import MView from '../../../components/MView';
import MHeader from '../../../components/MHeader';
import { width, TEXT_COLOR, COLOR_GRAY, COLOR_PRIMARY, COLOR_KETCHUP } from '../../../utilities/config';
import { textFontSize } from '../../../utilities/Styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { getNotificationAction } from '../../../redux/redux/getNotification';
import { deleteNotificationAction } from '../../../redux/redux/deleteNotification';
import { getUserInfoAction } from '../../../redux/redux/getUserInfo';

import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import MAlert from '../../../components/MAlert';
import moment from 'moment';
import MAsyncStorage from '../../../utilities/MAsyncStorage';
import { datehhmm, dateDDMMYYYY } from '../../../utilities/StringHelper';

const newsData = [
	{
		id: 1,
		image: require('../../../assets/img/img_homescreen/chong.png'),
		title: 'Phiên hỏi đáp ngày 11/7/2020',
		content: 'Công tác chuẩn bị ra mắt ứng dụng...',
		date: '12/07'
	},
	{
		id: 2,
		image: require('../../../assets/img/logo_start.png'),
		title: 'Phiên hỏi đáp ngày 10/06/2020',
		content: 'Công tác chuẩn bị ra mắt ứng dụng...',
		date: '16/06'
	},
	{
		id: 3,
		image: require('../../../assets/img/logo_start.png'),
		title: 'Phiên hỏi đáp ngày 31/05/2020',
		content: 'Công tác chuẩn bị ra mắt ứng dụng...',
		date: '31/05'
	}
];

class Notification extends Component {
	constructor(props) {
		super(props);
		this.notif = {
			page: 1,
			perPage: 10
		};
		this.state = {
			chosen: 1,
			otherMeetingdata: null,
			notif: this.notif,
			newsData: []
		};
	}

	componentDidMount() {
		this.onRefreshNotification();
	}

	componentDidUpdate(PrevProps, PrevState) {
		if (PrevProps.getNotificationReducer != this.props.getNotificationReducer) {
			if (this.props.getNotificationReducer.isSuccess) {
				this.setState({
					newsData: this.props.getNotificationReducer.data.notifications
				});
			}
		}
		if (PrevProps.deleteDetailNotificationReducer != this.props.deleteDetailNotificationReducer) {
			if (this.props.deleteDetailNotificationReducer.isSuccess) {
				this.onRefreshNotification();
				this.props.getUserInfoAction();
			}
		}
		if (PrevProps.getDetailNotificationReducer != this.props.getDetailNotificationReducer) {
			if (this.props.getDetailNotificationReducer.isSuccess) {
				this.onRefreshNotification();
				this.props.getUserInfoAction();
			}
		}
		if (PrevProps.deleteNotificationReducer != this.props.deleteNotificationReducer) {
			if (this.props.deleteNotificationReducer.isSuccess) {
				this.onRefreshNotification();
				this.props.getUserInfoAction();
			}
		}
		if (PrevProps.getUserInfoReducer != this.props.getUserInfoReducer) {
			if (this.props.getUserInfoReducer.isSuccess) {
				this.onRefreshNotification();
			}
		}
	}

	onRefreshNotification = () => {
		this.props.getNotificationAction(this.notif);
	};

	next_page_notification = () => {
		this.setState(
			{
				notif: {
					...this.state.notif,
					page: this.state.notif.page + 1
				}
			},
			() => this.props.getNotificationAction(this.state.notif)
		);
	};

	newsList = () => {
		const data = this.state.newsData;
		if (this.props.getNotificationReducer.isLoading) {
			return <ActivityIndicator color={COLOR_PRIMARY} />;
		} else {
			if (data.toString() != []) {
				return (
					<FlatList
						refreshControl={
							<RefreshControl
								refreshing={this.props.getNotificationReducer.isLoading}
								onRefresh={this.onRefreshNotification}
							/>
						}
						onEndReachedThreshold={0.2}
						onEndReached={({ distanceFromEnd }) => {
							if (this.props.getNotificationReducer.canLoadMore) {
								this.next_page_notification();
							}
						}}
						initialNumToRender={10}
						maxToRenderPerBatch={10}
						windowSize={10}
						legacyImplementation={false}
						updateCellsBatchingPeriod={50}
						keyExtractor={(item) => item._id.toString()}
						style={styles.newsContainer}
						contentContainerStyle={{
							paddingHorizontal: 10,
							paddingVertical: 10
						}}
						data={data}
						renderItem={({ item, index }) => {
							const datetime = item.createdAt;
							const time = datehhmm(datetime) + ' ' + dateDDMMYYYY(datetime);
							if (item.thong_bao.length > 0) {
								return (
									<TouchableOpacity
										onPress={() => {
											this.props.navigation.navigate('NotificationDetail', {
												id: item._id
											});
										}}
										activeOpacity={1}
									>
										<View key={item.id} style={styles.newsItem}>
											{/* <Image style={styles.img} source={item.image} /> */}
											{item.readed ? (
												<Icon
													style={{ alignSelf: 'center', marginHorizontal: 8 }}
													name="envelope"
													color={COLOR_PRIMARY}
													size={25}
													solid
												/>
											) : (
												<View style={{ alignSelf: 'center', marginHorizontal: 8 }}>
													<Icon name="envelope" color={COLOR_PRIMARY} size={25} solid />
													<Icon
														style={{ position: 'absolute', right: -2, top: 2 }}
														name="circle"
														color={COLOR_KETCHUP}
														size={5}
														solid
													/>
												</View>
											)}
											<View
												style={{
													flex: 6,
													justifyContent: 'center',
													margin: 10
												}}
											>
												<Text
													numberOfLines={1}
													style={{
														fontWeight: 'bold',
														fontSize: textFontSize * 1.1,
														flex: 1
													}}
												>
													{item.thong_bao[0].title}
												</Text>
												<View
													style={{
														flexDirection: 'row',
														flex: 1
													}}
												>
													<Text
														numberOfLines={1}
														style={{
															fontSize: textFontSize * 0.9,
															color: '#626363',
															flex: 3
														}}
													>
														{item.thong_bao[0].content}
													</Text>
													<Text
														style={{
															top: 2,
															right: -10,
															fontSize: textFontSize * 0.8,
															color: '#aaaaaa',
															flex: 1
														}}
													>
														{time}
													</Text>
												</View>
											</View>
										</View>
									</TouchableOpacity>
								);
							}
						}}
					/>
				);
			} else {
				return (
					<View style={{ flex: 1, alignItems: 'center' }}>
						<Text
							style={{
								fontSize: textFontSize,
								color: TEXT_COLOR,
								top: width / 2
							}}
						>
							Bạn hiện tại không có thông báo nào!
						</Text>
					</View>
				);
			}
		}
	};
	deleteAllAlert = () => {
		this.Malert.showAlert(
			'Bạn chắc chắn muốn xóa tất cả?',
			() => {
				this.props.deleteNotificationAction({});
			},
			() => {}
		);
	};

	render() {
		return (
			<MView>
				<MHeader
					rightComponent={
						this.props.getNotificationReducer.isSuccess &&
						this.props.getNotificationReducer.data.notifications.length > 0 && (
							<TouchableOpacity
								onPress={() => {
									this.deleteAllAlert();
								}}
								style={{ right: 5 }}
							>
								<Icon name="trash-alt" color="white" size={18} solid />
							</TouchableOpacity>
						)
					}
					onPress={() => {
						this.props.navigation.pop();
					}}
					text="THÔNG BÁO"
				/>
				{this.newsList()}
				<MAlert ref={(ref) => (this.Malert = ref)} />
			</MView>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		getNotificationReducer: state.getNotificationReducer,
		deleteNotificationReducer: state.deleteNotificationReducer,
		deleteDetailNotificationReducer: state.deleteDetailNotificationReducer,
		getDetailNotificationReducer: state.getDetailNotificationReducer,
		getUserInfoReducer: state.getUserInfoReducer
	};
};
export default connect(mapStateToProps, { getNotificationAction, deleteNotificationAction, getUserInfoAction })(
	Notification
);
const styles = StyleSheet.create({
	newsContainer: {
		width: width,
		alignSelf: 'center',
		flex: 1
	},
	newsItem: {
		alignItems: 'center',
		flexDirection: 'row',
		padding: 10,
		backgroundColor: 'white',
		marginBottom: width / 40,
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3
	},
	img: {
		flex: 1,
		width: width / 10,
		height: undefined,
		resizeMode: 'contain'
	}
});
