import React, { Component } from 'react';
import { View, Text, StyleSheet, RefreshControl, TouchableOpacity, FlatList } from 'react-native';
import MView from '../../../components/MView';
import MHeader from '../../../components/MHeader';
import MeetingItem, { LichSuKhamItem, LichSuKhamBVKhacItem } from '../../../components/customize/MeetingItem';
import {
	width,
	TEXT_COLOR,
	COLOR_LIGHT_BLUE,
	COLOR_GRAY,
	COLOR_WHITEGRAY,
	COLOR_PRIMARY
} from '../../../utilities/config';
import { textFontSize } from '../../../utilities/Styles';
import { connect } from 'react-redux';
const chong = require('../../../assets/img/img_homescreen/chong.png');
import { getHistoryAction } from '../../../redux/redux/getHistory';
import { getLichSuKhamAction } from '../../../redux/redux/getLichSuKham';
import { ActivityIndicator } from 'react-native-paper';
import { cleanSingle } from 'react-native-image-crop-picker';

const meetingdata = [
	{
		_id: 1,
		title: 'Khám mắt',
		content: 'Khám Nội tổng quát',
		address: 'Tân Yên, Bắc Giang',
		doctor: 'BS. Nguyễn Văn A',
		time: new Date(),
		avatar: chong,
		name: 'Quất',
		type_user: 'Bạn',
		type: 1,
		type_title: 'Lịch đặt hẹn'
	},
	{
		_id: 2,
		title: 'Khám răng hàm mặt',
		content: 'Khám mắt',
		address: 'Tân Yên, Bắc Giang',
		doctor: 'BS. Nguyễn Văn A',
		time: new Date(),
		avatar: chong,
		name: 'Quất',
		type_user: 'Bạn',
		type: 1,
		type_title: 'Lịch tái khám'
	}
];
class ExamineHistory extends Component {
	constructor(props) {
		super(props);
		this.params_history = {
			page: 1,
			perPage: 10
		};
		this.params_lich_su_kham = {
			bh_sothebhyt: this.get_bh_sothebhyt(),
			bn_so_cmnd: this.get_bn_so_cmnd()
			// kb_tgian_bdau: '20200100',
			// kb_tgian_kthuc: '20201030',
			// phan_trang: {
			// 	trang_hien_tai: 1,
			// 	so_ban_ghi_tren_trang: 20
			// }
		};
		this.state = {
			tab: 1,
			otherMeetingdata: null,
			params_history: this.params_history,
			params_lich_su_kham: this.params_lich_su_kham
		};
	}
	get_bh_sothebhyt = () => {
		const data = this.props.userInfoReducer.data;
		if (data.bhyt) {
			return data.bhyt.so_bhyt;
		} else {
			return null;
		}
	};
	get_bn_so_cmnd = () => {
		const data = this.props.userInfoReducer.data;
		if (data.identity) {
			if (data.bhyt) {
				return null;
			} else {
				return data.identity.so_cmt;
			}
		} else {
			return null;
		}
	};
	componentDidMount = () => {
		this.onRefreshImageHistory();
		this.onRefreshLichSuKham();
	};
	onRefreshLichSuKham = () => {
		this.props.getLichSuKhamAction(this.params_lich_su_kham);
	};
	onRefreshImageHistory = () => {
		this.props.getHistoryAction(this.params_history);
	};
	componentDidUpdate = (PrevProps, PrevState) => {
		if (PrevProps.createNewExamineHistoryReducer != this.props.createNewExamineHistoryReducer) {
			if (this.props.createNewExamineHistoryReducer.isSuccess) {
				this.onRefreshImageHistory();
			}
		}
		if (PrevProps.deleteHistoryReducer != this.props.deleteHistoryReducer) {
			if (this.props.deleteHistoryReducer.isSuccess) {
				this.onRefreshImageHistory();
			}
		}
	};

	onChoose = (key) => {
		this.setState({
			tab: key
		});
	};

	view_tab = () => {
		return (
			<View style={{ flexDirection: 'row', paddingHorizontal: 14, justifyContent: 'space-between' }}>
				<TouchableOpacity
					activeOpacity={1}
					onPress={() => this.onChoose(1)}
					style={this.state.tab == 1 ? styles.active_button : styles.disable_button}
				>
					<Text style={this.state.tab == 1 ? styles.active_text : styles.disable_text}>Tại BVAQ</Text>
				</TouchableOpacity>
				<TouchableOpacity
					activeOpacity={1}
					onPress={() => this.onChoose(2)}
					style={this.state.tab == 2 ? styles.active_button : styles.disable_button}
				>
					<Text style={this.state.tab == 2 ? styles.active_text : styles.disable_text}>Tại BV Khác</Text>
				</TouchableOpacity>
			</View>
		);
	};
	atBVAQ = () => {
		const data = this.props.getLichSuKhamReducer.data;
		if (this.props.getLichSuKhamReducer.isLoading) {
			return <ActivityIndicator size="small" color={COLOR_PRIMARY} style={{ marginTop: 100 }} />;
		} else {
			if (this.props.getLichSuKhamReducer.isSuccess) {
				let new_data = [];

				if (this.props.userInfoReducer.data.user.user_code == '290419920001') {
					new_data = data;
				} else {
					new_data = data.filter(
						(value) =>
							new Date(value.kb_ngay_kham.substr(0, 8)).toUTCString() > new Date('20201119').toUTCString()
					);
				}

				return (
					<View style={{ flex: 1 }}>
						<FlatList
							refreshControl={
								<RefreshControl
									refreshing={this.props.getLichSuKhamReducer.isLoading}
									onRefresh={this.onRefreshLichSuKham}
								/>
							}
							ListEmptyComponent={
								<View style={{ alignItems: 'center', justifyContent: 'center', top: width / 2 }}>
									<Text style={{ color: TEXT_COLOR, fontSize: textFontSize }}>
										Bạn chưa có lịch sử khám nào!
									</Text>
								</View>
							}
							initialNumToRender={10}
							maxToRenderPerBatch={10}
							windowSize={10}
							legacyImplementation={false}
							updateCellsBatchingPeriod={50}
							keyExtractor={(item) => item.kb_ma_dot_kham}
							style={styles.appointment}
							contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 10 }}
							data={data}
							renderItem={({ item, index }) => {
								return (
									<TouchableOpacity
										onPress={() => this.props.navigation.navigate('ResultDetail', { item: item })}
									>
										<LichSuKhamItem meeting={false} item={item} />
									</TouchableOpacity>
								);
							}}
						/>
					</View>
				);
			} else {
				return (
					<View style={{ alignItems: 'center', justifyContent: 'center', top: width / 2 }}>
						<Text style={{ color: TEXT_COLOR, fontSize: textFontSize }}>Bạn chưa có lịch sử khám nào!</Text>
					</View>
				);
			}
		}
	};
	next_page_image_history = () => {
		this.setState(
			{
				params_history: {
					...this.state.params_history,
					page: this.state.params_history.page + 1
				}
			},
			() => this.props.getHistoryAction(this.state.params_history)
		);
	};
	atOther = () => {
		const data = this.props.getHistoryReducer.data;
		if (data.toString() != []) {
			return (
				<View style={{ flex: 1 }}>
					<FlatList
						refreshControl={
							<RefreshControl
								refreshing={this.props.getHistoryReducer.isLoading}
								onRefresh={this.onRefreshImageHistory}
							/>
						}
						onEndReachedThreshold={0.2}
						onEndReached={({ distanceFromEnd }) => {
							if (this.props.getHistoryReducer.canLoadMore) {
								this.next_page_image_history();
							}
						}}
						initialNumToRender={10}
						maxToRenderPerBatch={10}
						windowSize={10}
						legacyImplementation={false}
						updateCellsBatchingPeriod={50}
						keyExtractor={(item) => item._id}
						style={styles.appointment}
						contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 10 }}
						data={data}
						renderItem={({ item, index }) => {
							return (
								<TouchableOpacity
									onPress={() =>
										this.props.navigation.navigate('ImageHistoryDetail', {
											item: item
										})}
								>
									<LichSuKhamBVKhacItem meeting={false} item={item} />
								</TouchableOpacity>
							);
						}}
					/>
				</View>
			);
		} else {
			return (
				<View style={{ alignItems: 'center', justifyContent: 'center', top: width / 2 }}>
					<Text style={{ color: TEXT_COLOR, fontSize: textFontSize }}>
						Bạn chưa có lịch sử khám từ các bệnh viện khác
					</Text>
				</View>
			);
		}
	};

	render() {
		return (
			<MView>
				<MHeader
					rightComponent={() => {
						if (this.state.tab == 2) {
							return (
								<TouchableOpacity
									onPress={() => {
										this.props.navigation.navigate('AddHistory');
									}}
								>
									<Text style={styles.textAdd}>Thêm mới</Text>
								</TouchableOpacity>
							);
						} else {
							return null;
						}
					}}
					onPress={() => {
						this.props.navigation.pop();
					}}
					text="Lịch sử khám"
				/>
				{this.view_tab()}
				{/* {this.atBVAQ()} */}
				{this.state.tab === 1 ? this.atBVAQ() : this.atOther()}
			</MView>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		getHistoryReducer: state.getHistoryReducer,
		createNewExamineHistoryReducer: state.createNewExamineHistoryReducer,
		deleteHistoryReducer: state.deleteHistoryReducer,
		getLichSuKhamReducer: state.getLichSuKhamReducer,
		userInfoReducer: state.userInfoReducer
	};
};
export default connect(mapStateToProps, { getHistoryAction, getLichSuKhamAction })(ExamineHistory);
const styles = StyleSheet.create({
	appointment: {
		width: width,
		flexDirection: 'column',
		marginTop: width / 25,
		alignSelf: 'center'
	},
	chooseBtn: {
		flex: 1,
		borderRadius: 10,
		alignItems: 'center'
	},
	text: {
		color: TEXT_COLOR,
		fontSize: textFontSize * 1.2,
		paddingVertical: 5
	},
	textAdd: {
		color: 'white',
		fontSize: textFontSize + 2,
		// paddingRight: 10,
		justifyContent: 'center'
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
	}
});
