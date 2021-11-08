import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import MView from '../../../components/MView';
import MHeader from '../../../components/MHeader';
import {
	width,
	TEXT_COLOR,
	COLOR_PRIMARY,
	COLOR_MINT,
	COLOR_WHITEGRAY,
	COLOR_GRAY,
	COLOR_KETCHUP
} from '../../../utilities/config';
import { textFontSize } from '../../../utilities/Styles';
import { add_dot_number, dateDDMMYYYY } from '../../../utilities/StringHelper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Input, ListItem } from 'react-native-elements';
import moment from 'moment';
import { connect } from 'react-redux';
import { getCointHistoryAction } from '../../../redux/redux/getCointHistory';
import { ActivityIndicator } from 'react-native-paper';

const transactiondata = [
	{
		id: 1,
		date: '20/7',
		amount1: '+5.000.000',
		amount2: '',
		content: 'Nạp tiền chuyển khoản ngân hàng'
	},
	{
		id: 2,
		date: '18/7',
		amount2: '+100.000',
		amount1: '',
		content: 'Bệnh Viện Anh Quất chúc mừng sinh nhật'
	},
	{
		id: 3,
		date: '02/7',
		amount1: '-7.900.000',
		amount2: '-100.000 vnđ',
		content: 'Thanh toán phí khám bệnh'
	}
];
class Wallet extends Component {
	constructor(props) {
		super(props);
		this.params_list_message = {
			page: 1,
			perPage: 200
		};
		this.state = {
			startdate: dateDDMMYYYY(this.props.userInfoReducer.data.coint.createdAt),
			enddate: dateDDMMYYYY(new Date()),
			showDatePickerStart: false,
			showDatePickerEnd: false,
			bodyDate: new Date()
		};
	}
	componentDidMount() {
		this.props.getCointHistoryAction(this.params_list_message);
	}
	onChangeStartDate = (event, selectedDate) => {
		let currentDate;
		let bodyDate;
		if (selectedDate) {
			currentDate = moment(selectedDate).format('DD/MM/YYYY');
			bodyDate = moment(selectedDate).format('YYYY-M-DD');
		} else {
			currentDate = this.state.date;
			bodyDate = this.state.bodyDate;
		}
		this.setState({
			startdate: currentDate,
			showDatePickerStart: false,
			bodyDate: bodyDate
		});
	};

	onChangeEndDate = (event, selectedDate) => {
		let currentDate;
		let bodyDate;
		if (selectedDate) {
			currentDate = moment(selectedDate).format('DD/MM/YYYY');
			bodyDate = moment(selectedDate).format('YYYY-M-DD');
		} else {
			currentDate = this.state.date;
			bodyDate = this.state.bodyDate;
		}
		this.setState({
			enddate: currentDate,
			showDatePickerEnd: false,
			bodyDate: bodyDate
		});
	};
	money = () => {
		return (
			<View style={[ styles.container, { justifyContent: 'center' } ]}>
				<View style={styles.remainder}>
					<Text style={[ styles.text, { color: COLOR_PRIMARY } ]}>Số dư tài khoản nạp</Text>
					<Text style={[ styles.text, { color: COLOR_PRIMARY, position: 'absolute', right: 0 } ]}>
						<Text>{add_dot_number(this.props.userInfoReducer.data.coint.money_real)}</Text>
						{''} VNĐ
					</Text>
				</View>
				<View style={styles.remainder}>
					<Text style={[ styles.text, { color: COLOR_MINT } ]}>Số dư tài khoản khuyến mãi</Text>
					<Text style={[ styles.text, { color: COLOR_MINT, position: 'absolute', right: 0 } ]}>
						<Text>{add_dot_number(this.props.userInfoReducer.data.coint.money_promotion)}</Text>
						{''} VNĐ
					</Text>
				</View>
				<Text>
					Lưu ý: Tài khoản KM sẽ hết hạn vào ngày {' '}
					{dateDDMMYYYY(this.props.userInfoReducer.data.coint.end_day)}
				</Text>
			</View>
		);
	};
	history = () => {
		return (
			<View style={[ styles.container, { flex: 7 } ]}>
				<View>
					<Text
						style={[
							styles.text,
							{
								color: COLOR_MINT,
								fontWeight: 'bold',
								fontSize: textFontSize * 1.2
							}
						]}
					>
						Lịch sử thanh toán
					</Text>
				</View>
				<View style={{ flexDirection: 'row', marginVertical: width / 25 }}>
					<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
						<Text>Từ</Text>
						<TouchableOpacity
							onPress={() => {
								this.setState({
									showDatePickerStart: true
								});
							}}
						>
							<Input
								editable={false}
								value={this.state.startdate}
								containerStyle={styles.inputContainer}
								inputContainerStyle={styles.inputContainerStyle}
								inputStyle={styles.inputStyle}
								textAlign={'center'}
							/>
						</TouchableOpacity>

						{this.state.showDatePickerStart ? (
							<DateTimePicker
								testID="dateTimePicker"
								value={new Date()}
								defaultDate={new Date(2020, 4, 8)}
								is24Hour={true}
								display="default"
								onChange={(event, selectedDate) => this.onChangeStartDate(event, selectedDate)}
							/>
						) : (
							<View />
						)}
					</View>
					<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
						<Text>Đến</Text>
						<TouchableOpacity
							onPress={() => {
								this.setState({ showDatePickerEnd: true });
							}}
						>
							<Input
								editable={false}
								value={this.state.enddate}
								containerStyle={styles.inputContainer}
								inputContainerStyle={styles.inputContainerStyle}
								inputStyle={styles.inputStyle}
								textAlign={'center'}
							/>
						</TouchableOpacity>

						{this.state.showDatePickerEnd ? (
							<DateTimePicker
								testID="dateTimePicker"
								value={new Date()}
								is24Hour={true}
								display="default"
								onChange={(event, selectedDate) => this.onChangeEndDate(event, selectedDate)}
							/>
						) : (
							<View />
						)}
					</View>
				</View>

				{this.props.getCointHistoryReducer.isLoading && (
					<ActivityIndicator
						size="small"
						color={COLOR_PRIMARY}
						style={{ alignSelf: 'center', margin: 200 }}
					/>
				)}

				{this.props.getCointHistoryReducer.isSuccess && (
					<FlatList
						data={this.props.getCointHistoryReducer.data}
						renderItem={({ item, index }) => {
							let type = <Text style={{ color: COLOR_PRIMARY }}>Nạp tiền</Text>;
							let num = (
								<Text style={[ styles.text, { color: COLOR_PRIMARY } ]}>
									{add_dot_number(item.num)} {''} vnđ
								</Text>
							);
							if (item.type == 1) {
								type = <Text style={{ color: COLOR_PRIMARY }}>Nạp tiền</Text>;
								num = (
									<Text style={[ styles.text, { color: COLOR_PRIMARY } ]}>
										+{add_dot_number(item.num)} {''} vnđ
									</Text>
								);
							}
							if (item.type == 2) {
								type = <Text style={{ color: COLOR_PRIMARY }}>Rút tiền</Text>;
								num = (
									<Text style={[ styles.text, { color: '#B24018' } ]}>
										-{add_dot_number(item.num)} {''} vnđ
									</Text>
								);
							}
							if (item.type == 3) {
								type = <Text style={{ color: COLOR_PRIMARY }}>Khuyến mãi</Text>;
								num = (
									<Text style={[ styles.text, { color: COLOR_PRIMARY } ]}>
										+{add_dot_number(item.num)} {''} vnđ
									</Text>
								);
							}
							if (item.type == 4) {
								type = <Text style={{ color: '#B24018' }}>Thanh toán</Text>;
								num = (
									<Text style={[ styles.text, { color: '#B24018' } ]}>
										-{add_dot_number(item.num)} {''} vnđ
									</Text>
								);
							}
							if (item.type == 5) {
								type = <Text style={{ color: COLOR_PRIMARY }}>Hoàn tiền</Text>;
								num = (
									<Text style={[ styles.text, { color: COLOR_PRIMARY } ]}>
										+{add_dot_number(item.num)} {''} vnđ
									</Text>
								);
							}

							return (
								<View key={item.id}>
									<View
										style={{
											flexDirection: 'row',
											marginVertical: width / 30,
											alignItems: 'center'
										}}
									>
										<View>
											<Text style={{ fontSize: textFontSize, marginRight: width / 20 }}>
												{dateDDMMYYYY(item.createdAt)}
											</Text>
											{type}
										</View>

										<View>
											{num}
											<Text style={{ fontSize: textFontSize }}>{item.content}</Text>
										</View>
									</View>
									<View
										style={{
											borderBottomColor: '#b0b0b1',
											borderBottomWidth: 1
										}}
									/>
								</View>
							);
						}}
					/>
				)}
			</View>
		);
	};

	render() {
		return (
			<MView>
				<MHeader
					onPress={() => {
						this.props.navigation.pop();
					}}
					text="Số dư thanh toán"
				/>
				{this.money()}
				{this.history()}
			</MView>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		userInfoReducer: state.userInfoReducer,
		getCointHistoryReducer: state.getCointHistoryReducer
	};
};

export default connect(mapStateToProps, { getCointHistoryAction })(Wallet);
const styles = StyleSheet.create({
	container: {
		paddingHorizontal: width / 20,
		backgroundColor: 'white',
		marginBottom: 10,
		paddingVertical: width / 20
	},
	remainder: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	text: {
		color: TEXT_COLOR,
		fontSize: textFontSize * 1.3
	},
	inputContainer: {
		backgroundColor: COLOR_WHITEGRAY,
		borderRadius: 5,
		height: width / 10,
		alignItems: 'center',
		alignSelf: 'center',
		width: width / 3,
		marginHorizontal: width / 20
	},
	inputContainerStyle: {
		borderBottomWidth: 0
	},
	inputStyle: {
		fontSize: textFontSize * 1.1
	}
});
