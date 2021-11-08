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

class DetailAppointment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: {}
		};
	}
	render() {
		let data = this.props.route.params.data;
		let user_data = this.props.userInfoReducer.data;
		return (
			<MView>
				<MHeader
					onPress={() => {
						this.props.navigation.pop();
					}}
					text="Thông tin cấp cứu"
				/>
				{
					<View style={[ styles.container, { flex: 1 } ]}>
						{/* <View style={styles.titleContainer}>
							<Text style={styles.title}>Thông tin đặt hẹn</Text>
						</View> */}
						<View style={styles.card}>
							<View style={{ alignItems: 'center', marginTop: 10 }}>
								<Text style={{ color: COLOR_PRIMARY, fontSize: textFontSize + 4, fontWeight: 'bold' }}>
									Gọi cấp cứu
								</Text>
								<Text
									style={{
										fontSize: textFontSize,
										color: TEXT_COLOR,
										textAlign: 'center'
									}}
								>
									(Các bác sĩ của chúng tôi đang đến đón bạn)
								</Text>
							</View>

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
										<Text style={styles.contentText}>{user_data.identity.so_cmt}</Text>
									) : (
										<Text style={styles.contentText}>Chưa có số CMT</Text>
									)}
								</View>
							</View>
							<View style={{ flexDirection: 'row' }}>
								<View style={styles.container}>
									<Text style={styles.titleText}>Ngày gọi</Text>
									<Text style={styles.contentText}>{dateDDMMYYYY(data.thoi_gian)}</Text>
								</View>
								<View style={styles.container}>
									<Text style={styles.titleText}>Giờ gọi</Text>
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
								<Text style={styles.titleText}>Trạng thái cấp cứu</Text>
								<View style={{ width: 10 }} />
								<Text style={styles.contentText}>{view_status(data.status)}</Text>
							</View>
							<View style={{ marginTop: width / 25, marginHorizontal: width / 25 }}>
								<Text style={styles.titleText}>Địa chỉ bệnh nhân</Text>
								<Text style={styles.contentText}>{data.address}</Text>
								<Text style={styles.contentText}>{data.address_detail}</Text>
							</View>
							<View style={{ marginTop: width / 25, marginHorizontal: width / 25 }}>
								<Text style={styles.titleText}>Bệnh viện</Text>
								<Text style={styles.contentText}>Bệnh viện Anh Quất, Tân Yên, Bắc Giang</Text>
							</View>
							<View style={{ marginTop: width / 25, marginHorizontal: width / 25 }}>
								<Text style={styles.titleText}>Lý do cấp cứu</Text>
								<Text style={styles.contentText}>{data.ly_do}</Text>
							</View>
						</View>
					</View>
				}

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
		userInfoReducer: state.userInfoReducer
	};
};

export default connect(mapStateToProps, {})(DetailAppointment);

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
