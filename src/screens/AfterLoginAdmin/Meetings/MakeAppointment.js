import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import MView from '../../../components/MView';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {
	width,
	COLOR_PRIMARY,
	COLOR_GRAY,
	COLOR_WHITEGRAY,
	TEXT_COLOR,
	COLOR_BACKGROUND_TEXT_INPUT
} from '../../../utilities/config';
import { textFontSize } from '../../../utilities/Styles';
import { styles } from '../Home/StylelocationbyX';
import { Input } from 'react-native-elements';
import NButton, { NButton2 } from '../../../components/NButton';
import moment from 'moment';
import { connect } from 'react-redux';
import { createAppointmentAction } from '../../../redux/redux/createAppointment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MHeader from '../../../components/MHeader';
import DateTimePicker from 'react-native-modal-datetime-picker';

class MakeAppointment extends Component {
	constructor(props) {
		super(props);
		this.today = new Date();
		this.tomorrow = new Date(this.today);
		// this.tomorrow.setDate(this.tomorrow.getDate() + 1);

		this.time = new Date();
		// this.time.setHours(7, 0, 0, 0);

		this.state = {
			date: moment(this.tomorrow).format('DD/MM/YYYY'),
			showDatePicker: false,
			showTimePicker: false,
			bodyDate: moment(this.tomorrow).format('YYYY-M-DD'),
			time: moment(this.time).format('hh:mm'),
			reason: '',
			loai: 0
		};
	}

	onChangeDate = (selectedDate) => {
		let currentDate;
		let bodyDate;
		this.tomorrow.setDate(new Date(selectedDate).getDate());
		if (selectedDate) {
			currentDate = moment(selectedDate).format('DD/MM/YYYY');
			bodyDate = moment(selectedDate).format('YYYY-M-DD');
		} else {
			currentDate = this.state.date;
			bodyDate = this.state.bodyDate;
		}
		if(moment(selectedDate)>moment(new Date())){
			this.time.setHours(7, 0, 0, 0);

		}

		this.setState({
			time: moment(this.time).format('hh:mm'),

			date: currentDate,
			showDatePickerStart: false,
			bodyDate: bodyDate
		});
	};

	onChangeTime = (selectedTime) => {
		this.time.setTime(new Date(selectedTime).getTime());

		let currentTime;
		if (selectedTime) {
			currentTime = moment(selectedTime).format('HH:mm');
		} else {
			currentTime = this.state.time;
		}
		this.setState({ time: currentTime, showTimePicker: false });
	};

	onChangeReason = (text) => {
		this.setState({ reason: text });
	};

	onCreate = () => {
		let timedate = this.state.bodyDate + ' ' + this.state.time;

		let body = {
			thoi_gian: timedate,
			ly_do: this.state.reason ? this.state.reason : '',
			loai: this.state.loai
		};
		this.props.navigation.navigate('ConfirmInformation', {
			timedatedata: body
		});
		//this.props.createAppointmentAction(body);
	};
	loai_kham = () => {
		return (
			<View style={mastyles.container}>
				<Text
					style={{
						fontSize: textFontSize * 1.5,
						color: TEXT_COLOR,
						fontWeight: 'bold'
					}}
				>
					Chọn dịch vụ khám
				</Text>
				<Text
					style={{
						fontSize: textFontSize - 2,
						color: 'red'
					}}
				>
					Vui lòng chọn 1 trong 2 lựa chọn dưới đây
				</Text>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
						width: '100%'
					}}
				>
					<TouchableOpacity
						onPress={() => {
							this.setState({ loai: 0 });
						}}
						style={this.state.loai == 0 ? mastyles.button_loai_active : mastyles.button_loai_inactive}
					>
						<Text
							style={{
								fontSize: textFontSize-1,
								color: this.state.loai == 0 ? 'white' : TEXT_COLOR,
								fontWeight: 'bold',
								textAlign: 'center'
							}}
						>
							Khám bệnh
						</Text>
						<Text
							style={{
								fontSize: textFontSize-1,
								color: this.state.loai == 0 ? 'white' : TEXT_COLOR,
								textAlign: 'center'
							}}
						>
							Khám chữa bệnh
						</Text>
					</TouchableOpacity>
					<View style={{ width: 10 }} />
					<TouchableOpacity
						onPress={() => {
							this.setState({ loai: 1 });
						}}
						style={this.state.loai == 1 ? mastyles.button_loai_active : mastyles.button_loai_inactive}
					>
						<Text
							style={{
								fontSize: textFontSize -1,
								color: this.state.loai == 1 ? 'white' : TEXT_COLOR,
								fontWeight: 'bold',
								textAlign: 'center'

							}}
						>
							Khám sức khoẻ
						</Text>
						<Text
							style={{
								fontSize: textFontSize-1,
								color: this.state.loai == 1 ? 'white' : TEXT_COLOR,
								textAlign: 'center'
							}}
						>
							Được cấp giấy chứng nhận sức khoẻ
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	};
	location = () => {
		return (
			<View style={mastyles.container}>
				<Text
					style={{
						fontSize: textFontSize * 1.5,
						color: TEXT_COLOR,
						fontWeight: 'bold'
					}}
				>
					Địa điểm
				</Text>
				<Input
					editable={false}
					containerStyle={[ styles.inputContainer, { backgroundColor: COLOR_WHITEGRAY } ]}
					inputContainerStyle={[ styles.inputContainerStyle, { width: width / 1.1 } ]}
					inputStyle={styles.inputStyle}
					value="Bệnh viện Anh Quất"
				/>
			</View>
		);
	};
	date = () => {
		let minTime = new Date(this.tomorrow);
		minTime.setHours(10);
		minTime.setMinutes(0);
		minTime.setMilliseconds(0);

		let maxTime = new Date(this.tomorrow);
		maxTime.setHours(22);
		maxTime.setMinutes(0);
		maxTime.setMilliseconds(0);
		return (
			<View style={mastyles.container}>
				<Text
					style={{
						fontSize: textFontSize * 1.5,
						color: TEXT_COLOR,
						fontWeight: 'bold'
					}}
				>
					Thời gian
				</Text>
				<View style={{ flexDirection: 'row' }}>
					<View
						style={{
							flex: 2,
							flexDirection: 'column',
							alignItems: 'center'
						}}
					>
						<Text style={[ styles.text, { marginBottom: 5 } ]}>Ngày/tháng/năm</Text>
						<TouchableOpacity
							onPress={() => {
								this.setState({
									showDatePickerStart: true
								});
							}}
							style={{
								backgroundColor: COLOR_PRIMARY,
								width: width * 0.5,
								paddingVertical: 10,
								borderRadius: 5,
								justifyContent: 'center',
								alignItems: 'center'
							}}
						>
							<Text
								style={{
									fontSize: textFontSize + 2,
									fontWeight: 'bold',
									alignItems: 'center',
									color: 'white'
								}}
							>
								{this.state.date}
							</Text>
						</TouchableOpacity>
					</View>
					<View
						style={{
							flex: 1,
							flexDirection: 'column',
							alignItems: 'center'
						}}
					>
						<Text style={[ styles.text, { marginBottom: 5 } ]}>Giờ</Text>
						<TouchableOpacity
							onPress={() => {
								this.setState({ showTimePicker: true });
							}}
							style={{
								backgroundColor: COLOR_PRIMARY,
								width: width * 0.2,
								paddingVertical: 10,
								borderRadius: 5,
								justifyContent: 'center',
								alignItems: 'center'
							}}
						>
							<Text
								style={{
									fontSize: textFontSize + 2,
									fontWeight: 'bold',
									alignItems: 'center',
									color: 'white'
								}}
							>
								{this.state.time}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	};
	reason = () => {
		return (
			<View style={mastyles.container}>
				<Text
					style={{
						fontSize: textFontSize * 1.5,
						color: TEXT_COLOR,
						fontWeight: 'bold'
					}}
				>
					Triệu chứng, lý do khám
				</Text>
				<Text
					style={{
						fontSize: textFontSize - 2,
						color: 'red',
						marginBottom: 10
					}}
				>
					Bạn cần miêu tả kỹ triệu chứng của mình và nêu lý do khám
				</Text>
				<Input
					value={this.state.reason}
					onChangeText={(text) => this.onChangeReason(text)}
					multiline={true}
					containerStyle={[ styles.inputContainer, { backgroundColor: COLOR_WHITEGRAY, height: width / 4 } ]}
					inputContainerStyle={[
						styles.inputContainerStyle,
						{
							width: width / 1.1,
							textAlignVertical: 'top'
						}
					]}
					inputStyle={[ styles.inputStyle, { textAlignVertical: 'top' } ]}
					placeholder="VD: Đau nhức xương khớp, đau bụng, ..."
				/>
			</View>
		);
	};
	render() {
		return (
			<MView style={{ backgroundColor: 'white' }}>
				<MHeader
					onPress={() => {
						this.props.navigation.pop();
					}}
					text="Đặt hẹn"
				/>
				<KeyboardAwareScrollView
					keyboardShouldPersistTaps="handled"
					contentContainerStyle={{
						// flex: 1,
						backgroundColor: 'white',

						paddingBottom: 100
					}}
				>
					{this.loai_kham()}
					{this.location()}
					{this.date()}
					{this.reason()}
					<NButton2
						isLoading={this.props.createAppointmentReducer.isLoading}
						onPress={() => {
							// this.props.navigation.navigate("ConfirmInformation")
							this.onCreate();
						}}
						top={width / 3}
						text="TIẾP TỤC"
						style={{ position: 'absolute', alignSelf: 'center', bottom: 10, width: width * 0.9 }}
						bgCl={COLOR_PRIMARY}
					/>
				</KeyboardAwareScrollView>
				<DateTimePicker
					locale="vi-VN"
					mode={'date'}
					confirmTextIOS="Xác nhận"
					cancelTextIOS="Huỷ"
					display="spinner"
					headerTextIOS="Chọn ngày khám"
					date={this.tomorrow}
					minimumDate={this.tomorrow}
					onConfirm={(date) => {
						this.onChangeDate(date);
					}}
					onCancel={() => this.setState({ showDatePickerStart: false })}
					isVisible={this.state.showDatePickerStart}
				/>
				<DateTimePicker
					locale="vi-VN"
					mode={'time'}
					confirmTextIOS="Xác nhận"
					cancelTextIOS="Huỷ"
					display="spinner"
					headerTextIOS="Chọn giờ khám"
					date={this.time}
					timePickerModeAndroid="spinner"
					minimumDate={this.time}
					onConfirm={(date) => {
						this.onChangeTime(date);
					}}
					onCancel={() => this.setState({ showTimePicker: false })}
					isVisible={this.state.showTimePicker}
				/>
			</MView>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		createAppointmentReducer: state.createAppointmentReducer
	};
};

export default connect(mapStateToProps, { createAppointmentAction })(MakeAppointment);

const mastyles = StyleSheet.create({
	container: {
		marginHorizontal: width / 20,
		marginTop: width / 20
	},
	inputContainer: {
		backgroundColor: COLOR_WHITEGRAY,
		borderRadius: 5,
		height: width / 10,
		alignItems: 'center',
		alignSelf: 'center',
		width: width / 3,
		marginHorizontal: width / 20,
		backgroundColor: COLOR_PRIMARY
	},
	inputContainerStyle: {
		borderBottomWidth: 0
	},
	inputStyle: {
		fontSize: textFontSize * 1.1,
		color: 'white',
		fontWeight: 'bold',
		letterSpacing: 1
	},
	button_loai_active: {
		backgroundColor: COLOR_PRIMARY,
		borderRadius: 30,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 10,
		flex: 1,
		marginVertical: 10,
		height: 60
	},
	button_loai_inactive: {
		backgroundColor: COLOR_BACKGROUND_TEXT_INPUT,
		borderRadius: 30,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 10,
		flex: 1,
		marginVertical: 10,
		height: 60
	}
});
