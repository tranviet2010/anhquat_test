import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import {
	height,
	width,
	TEXT_COLOR,
	COLOR_PRIMARY,
	isIphoneX,
	COLOR_GREEN,
	COLOR_ORANGE,
	COLOR_LIGHT_BLUE,
	COLOR_WHITEGRAY,
	COLOR_GRAY,
	COLOR_KETCHUP
} from '../../utilities/config';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { textFontSize } from '../../utilities/Styles';
import { Badge, Avatar } from 'react-native-elements';
import MView from '../../components/MView';
import { add_dot_number, datehhmm } from '../../utilities/StringHelper';
import OneLine, { OneLineColumn } from '../../components/OneLine';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import moment from 'moment';
const cho_xac_nhan = require('../../assets/img/img_meetings/cho_xac_nhan.png');
const duyet = require('../../assets/img/img_meetings/duyet.png');
const huy = require('../../assets/img/img_meetings/huy.png');
const dathen = require('../../assets/img/datlichkham.png');
const taikham = require('../../assets/img/lichtaikham.png');

import 'moment/locale/vi';
moment.locale('vi');
const get_color_text_meeting = (type) => {
	switch (type) {
		case 2:
			return COLOR_GREEN;
		case 1:
			return COLOR_PRIMARY;
		case 3:
			return 'red';
		default:
			return COLOR_PRIMARY;
	}
};
const view_date = (color, size, time, is_show_difftime) => {
	let date = moment(time).format('DD/MM');
	let year = moment(time).format('YYYY');
	const date1 = new Date(time);
	const date2 = new Date();
	const diffDays = moment(date1).diff(moment(date2), 'days');
	const diffTime = moment().to(moment(date1));
	const diffHours = moment(date1).diff(moment(date2), 'hours');
	return (
		<View style={{ justifyContent: 'space-between', height: '100%', minWidth: width * 0.15 }}>
			<View
				style={{
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<Text
					style={{
						fontSize: size + 10,
						color,
						fontWeight: 'bold',
						textAlign: 'center'
					}}
				>
					{date}
				</Text>
				<OneLine color={color} />
				<Text
					style={{
						fontSize: size + 5,
						color,
						letterSpacing: 3
					}}
				>
					{year}
				</Text>
			</View>
			{is_show_difftime &&
			diffDays > 0 && (
				<Text
					style={{
						fontSize: textFontSize - 3,
						color: 'red',
						textAlign: 'center'
					}}
				>
					Còn {diffDays} ngày
				</Text>
			)}
			{is_show_difftime &&
			diffDays == 0 && (
				<Text
					style={{
						fontSize: textFontSize - 3,
						color: 'red',
						textAlign: 'center'
					}}
				>
					{diffTime}
				</Text>
			)}
			{is_show_difftime &&
			diffDays < 0 && (
				<Text
					style={{
						fontSize: textFontSize - 3,
						color: 'red',
						textAlign: 'center'
					}}
				>
					{diffDays} ngày trước
				</Text>
			)}
		</View>
	);
};

export const view_status = (status, note) => {
	switch (status) {
		case 1:
			return (
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center'
					}}
				>
					<Avatar source={duyet} size={20} />
					<Text
						style={{
							fontSize: textFontSize - 3,
							color: COLOR_GREEN,
							textAlign: 'center',
							marginLeft: 5
						}}
					>
						Đã xác nhận
					</Text>
				</View>
			);
		case 0:
			return (
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center'
					}}
				>
					<Avatar source={cho_xac_nhan} size={20} />
					<Text
						style={{
							fontSize: textFontSize - 3,
							color: COLOR_ORANGE,
							textAlign: 'center',
							marginLeft: 5
						}}
					>
						Chờ xác nhận
					</Text>
				</View>
			);
		case 2:
			return (
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center'
					}}
				>
					<Avatar source={huy} size={20} />
					<Text
						style={{
							fontSize: textFontSize - 3,
							color: 'red',
							textAlign: 'center',
							marginLeft: 5
						}}
					>
						Đã huỷ {note ? '(' + note + ')' : ''}
					</Text>
				</View>
			);
		case 3:
			return (
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center'
					}}
				>
					<Avatar source={duyet} size={20} />
					<Text
						style={{
							fontSize: textFontSize - 3,
							color: COLOR_GREEN,
							textAlign: 'center',
							marginLeft: 5
						}}
					>
						Đã khám
					</Text>
				</View>
			);
		default:
			break;
	}
};
export default class MeetingItem extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const item = this.props.item;
		const meeting = this.props.meeting;
		let ten_dich_vu = '';
		if (item.loai == 0) {
			ten_dich_vu = 'Khám chữa bệnh';
		}
		if (item.loai == 1) {
			ten_dich_vu = 'Khám sức khoẻ';
		}
		if (item.type == 3) {
			ten_dich_vu = 'Gọi cấp cứu';
		}
		return (
			<View key={item._id + ''} style={styles.meetingReminder}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginBottom: 5
					}}
				>
					<View>
						{meeting ? (
							<Text
								style={{
									fontSize: textFontSize + 2,
									color: get_color_text_meeting(item.type),
									fontWeight: 'bold'
								}}
							>
								{item.type_title}
							</Text>
						) : (
							<View />
						)}
						{item.badge ? (
							<Badge
								value={item.badge + ''}
								status="error"
								containerStyle={{ position: 'absolute', top: -8, right: -15 }}
								badgeStyle={{ width: 18, height: 18, borderRadius: 30 }}
								textStyle={{ fontSize: textFontSize }}
							/>
						) : (
							<View />
						)}
					</View>

					{meeting ? (
						<TouchableOpacity style={{}} onPress={() => this.props.item.onPress()}>
							<Text
								style={{
									color: '#1393ea',
									fontSize: textFontSize,
									textDecorationLine: 'underline',
									fontWeight: '500'
								}}
							>
								Xem tất cả
							</Text>
						</TouchableOpacity>
					) : (
						<View />
					)}
				</View>

				<View style={styles.meetingDetail}>
					{view_date(
						get_color_text_meeting(item.type),
						textFontSize,
						// new Date().setDate(new Date().getDate() + 1),
						moment(item.thoi_gian),
						meeting
					)}
					<View
						style={{
							flex: 2,
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							paddingLeft: 15
						}}
					>
						<View style={{ flex: 1 }}>
							<Text
								style={{
									color: TEXT_COLOR,
									fontWeight: 'bold',
									marginBottom: 2
								}}
							>
								{item.title}
							</Text>
							<Text
								style={{
									color: TEXT_COLOR,
									marginBottom: 2,
									fontSize: textFontSize
								}}
							>
								{ten_dich_vu}
							</Text>
							<Text
								style={{
									color: '#585959',
									marginBottom: 2
								}}
							>
								Thời gian:
								<Text
									style={{
										color: COLOR_ORANGE
									}}
								>
									{' ' + datehhmm(item.thoi_gian)}
								</Text>
							</Text>
						</View>
						{/* <View style={{ top: width / 20 }}>
							{meeting ? (
								<Text
									style={{
										fontSize: textFontSize - 3,
										color: 'red'
									}}
								>
									Còn {diffDays} ngày
								</Text>
							) : (
								<View />
							)}
						</View> */}
						{/* <View
              style={{
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Avatar size={40} source={item.avatar} />
              <View
                style={{
                  backgroundColor: COLOR_LIGHT_BLUE,
                  borderRadius: 10,
                  width: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 2,
                  marginTop: -5
                }}
              >
                <Text
                  style={{
                    color: COLOR_PRIMARY,
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
                  fontWeight: "bold",
                  marginTop: 5
                }}
              >
                {item.name}
              </Text>
            </View> */}
					</View>
				</View>
			</View>
		);
	}
}
export class LichSuKhamBVKhacItem extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const item = this.props.item;
		const meeting = this.props.meeting;
		let ten_dich_vu = '';
		if (item.loai == 0) {
			ten_dich_vu = 'Khám chữa bệnh';
		}
		if (item.loai == 1) {
			ten_dich_vu = 'Khám sức khoẻ';
		}
		if (item.type == 3) {
			ten_dich_vu = 'Gọi cấp cứu';
		}
		return (
			<View key={item._id + ''} style={styles.meetingReminder}>
				<View style={styles.meetingDetail}>
					{view_date(
						get_color_text_meeting(item.type),
						textFontSize,
						// new Date().setDate(new Date().getDate() + 1),
						moment(item.thoi_gian),
						false
					)}
					<View
						style={{
							flex: 2,
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							paddingLeft: 15
						}}
					>
						<View style={{ flex: 1 }}>
							<Text
								style={{
									color: TEXT_COLOR,
									fontWeight: 'bold',
									marginBottom: 2
								}}
							>
								{item.title ? item.title : 'Kết quả khám'}
							</Text>
							<Text
								style={{
									color: TEXT_COLOR,
									marginBottom: 2,
									fontSize: textFontSize
								}}
							>
								{item.note}
							</Text>
						</View>
					</View>
				</View>
			</View>
		);
	}
}

export class LichSuKhamItem extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const item = this.props.item;

		return (
			<View key={item._id + ''} style={styles.meetingReminder}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginBottom: 5
					}}
				>
					<View>
						{
							<Text
								style={{
									fontSize: textFontSize + 2,
									color: COLOR_PRIMARY,
									fontWeight: 'bold'
								}}
							>
								Mã đợt khám: {item.kb_ma_dot_kham}
							</Text>
						}
					</View>
				</View>

				<View style={styles.meetingDetail}>
					{view_date(get_color_text_meeting(item.type), textFontSize, item.kb_ngay_kham.substr(0, 8), false)}
					<View
						style={{
							flex: 2,
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							paddingLeft: 15
						}}
					>
						<View style={{ flex: 1 }}>
							<Text
								style={{
									color: TEXT_COLOR,
									fontWeight: 'bold',
									marginBottom: 2
								}}
							>
								BS. {item.benh_nhan.bn_ho_va_ten}
							</Text>
							<Text
								style={{
									color: TEXT_COLOR,
									marginBottom: 2,
									fontSize: textFontSize
								}}
							>
								Chức vụ. {item.bac_si.bs_chuc_vu}
							</Text>
							<Text
								style={{
									color: TEXT_COLOR,
									marginBottom: 2,
									fontSize: textFontSize
								}}
							>
								Bệnh nhân. {item.bac_si.bs_ho_va_ten}
							</Text>
						</View>
					</View>
				</View>
			</View>
		);
	}
}
export class TaiKhamHome extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const item = this.props.item;
		const meeting = this.props.meeting;
		let ten_dich_vu = '';
		if (item.loai == 0) {
			ten_dich_vu = 'Khám chữa bệnh';
		}
		if (item.loai == 1) {
			ten_dich_vu = 'Khám sức khoẻ';
		}
		if (item.type == 3) {
			ten_dich_vu = 'Gọi cấp cứu';
		}
		return (
			<TouchableOpacity
				onPress={() => this.props.item.onPress()}
				key={item._id + ''}
				style={{
					flex: 1,
					borderRadius: 10,
					backgroundColor: COLOR_GREEN,
					paddingVertical: 10
				}}
			>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginBottom: 5,
						paddingLeft: 10
					}}
				>
					<View
						style={{
							backgroundColor: 'white',
							borderRadius: 10,
							flexDirection: 'row',
							justifyContent: 'space-between',
							flex: 1,
							alignItems: 'center',
							paddingHorizontal: 10,
							marginRight: 10
						}}
					>
						{item.type_title ? (
							<Text
								style={{
									fontSize: textFontSize + 2,
									color: COLOR_GREEN,
									fontWeight: 'bold'
								}}
							>
								{item.type_title}
							</Text>
						) : (
							<View />
						)}
						{item.badge ? (
							<Badge
								value={item.badge + ''}
								status="error"
								containerStyle={{}}
								badgeStyle={{ width: 18, height: 18, borderRadius: 30 }}
								textStyle={{ fontSize: textFontSize }}
							/>
						) : (
							<View />
						)}
					</View>

					{item.badge > 0 ? (
						<View style={{ width: 20 }}>
							<Icon name="chevron-right" size={20} color="white" />
						</View>
					) : (
						<View style={{ width: 20 }} />
					)}
				</View>
				{item.badge > 0 ? (
					<View
						style={{
							flex: 1,
							marginTop: 20
						}}
					>
						{view_date(
							'white',
							textFontSize - 4,
							// new Date().setDate(new Date().getDate() + 1),
							moment(item.thoi_gian),
							false
						)}
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								paddingLeft: 15
							}}
						>
							<View style={{ flex: 1 }}>
								<Text
									style={{
										color: TEXT_COLOR,
										fontWeight: 'bold',
										marginBottom: 2
									}}
								>
									{item.title}
								</Text>
								<Text
									style={{
										color: TEXT_COLOR,
										marginBottom: 2,
										fontSize: textFontSize
									}}
								>
									{ten_dich_vu}
								</Text>
								<View
									style={{
										flexDirection: 'row',
										marginTop: 5
									}}
								>
									<Image
										source={cho_xac_nhan}
										style={{
											height: 15,
											width: 15
										}}
									/>
									<Text
										style={{
											color: 'white',
											marginLeft: 5
										}}
									>
										{datehhmm(item.thoi_gian)}
									</Text>
								</View>
							</View>
						</View>
					</View>
				) : (
					<View style={styles.meetingDetail}>
						<Image
							source={taikham}
							style={{
								height: '70%',
								width: 'auto',
								aspectRatio: 1.36
							}}
						/>
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								paddingLeft: 15
							}}
						>
							<Text
								style={{
									color: 'white',
									fontSize: textFontSize - 1
								}}
							>
								Bạn chưa có Lịch tái khám
							</Text>
						</View>
					</View>
				)}
			</TouchableOpacity>
		);
	}
}
export class DatHenHome extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const item = this.props.item;
		const meeting = this.props.meeting;
		let ten_dich_vu = '';
		if (item.loai == 0) {
			ten_dich_vu = 'Khám chữa bệnh';
		}
		if (item.loai == 1) {
			ten_dich_vu = 'Khám sức khoẻ';
		}
		if (item.type == 3) {
			ten_dich_vu = 'Gọi cấp cứu';
		}
		return (
			<TouchableOpacity
				onPress={() => this.props.item.onPress()}
				key={item._id + ''}
				style={{
					flex: 1,
					borderRadius: 10,
					backgroundColor: COLOR_PRIMARY,
					paddingVertical: 10
				}}
			>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginBottom: 5,
						paddingLeft: 10
					}}
				>
					<View
						style={{
							backgroundColor: 'white',
							borderRadius: 10,
							flexDirection: 'row',
							justifyContent: 'space-between',
							flex: 1,
							alignItems: 'center',
							paddingHorizontal: 10,
							marginRight: 10
						}}
					>
						{item.type_title ? (
							<Text
								style={{
									fontSize: textFontSize + 2,
									color: COLOR_PRIMARY,
									fontWeight: 'bold'
								}}
							>
								{item.type_title}
							</Text>
						) : (
							<View />
						)}
						{item.badge ? (
							<Badge
								value={item.badge + ''}
								status="error"
								containerStyle={{}}
								badgeStyle={{ width: 18, height: 18, borderRadius: 30 }}
								textStyle={{ fontSize: textFontSize }}
							/>
						) : (
							<View />
						)}
					</View>

					{item.badge > 0 ? (
						<View
							style={{
								width: 20
							}}
						>
							<Icon name="chevron-right" size={20} color="white" />
						</View>
					) : (
						<View
							style={{
								width: 20
							}}
						/>
					)}
				</View>
				{item.badge > 0 ? (
					<View
						style={{
							flex: 1,
							marginTop: 10,
							flexDirection: 'row',
							paddingLeft: 5
						}}
					>
						{view_date(
							'white',
							textFontSize - 4,
							// new Date().setDate(new Date().getDate() + 1),
							moment(item.thoi_gian),
							false
						)}

						<View style={{ flex: 1, paddingLeft: 5 }}>
							<Text
								style={{
									color: 'white',
									marginBottom: 2,
									fontSize: textFontSize
								}}
							>
								{ten_dich_vu}
							</Text>
							<View
								style={{
									flexDirection: 'row',
									marginTop: 5
								}}
							>
								<Image
									source={cho_xac_nhan}
									style={{
										height: 15,
										width: 15
									}}
								/>
								<Text
									style={{
										color: 'white',
										marginLeft: 5
									}}
								>
									{datehhmm(item.thoi_gian)}
								</Text>
							</View>
						</View>
					</View>
				) : (
					<View style={styles.meetingDetail}>
						<Image
							source={dathen}
							style={{
								height: '70%',
								width: 'auto',
								aspectRatio: 1.36
							}}
						/>
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								paddingLeft: 15
							}}
						>
							<Text
								style={{
									color: 'white',
									fontSize: textFontSize - 1
								}}
							>
								Bạn chưa có Lịch đặt hẹn
							</Text>
						</View>
					</View>
				)}
			</TouchableOpacity>
		);
	}
}
export class LichHenKhamItem extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	onCancel = () => {
		this.props.onPressCancel();
	};

	render() {
		const item = this.props.item;
		const { meeting } = this.props;
		const datetime = item.thoi_gian;
		const time = datehhmm(item.thoi_gian);
		return (
			<TouchableOpacity key={item._id + ''} onPress={this.props.onPress} style={styles.meetingReminder}>
				{item.status == 0 ? (
					<TouchableOpacity onPress={this.onCancel} style={styles.delete}>
						<Icon name="times-circle" color={COLOR_KETCHUP} size={25} solid />
					</TouchableOpacity>
				) : null}

				<View style={styles.meetingDetail}>
					{view_date(
						get_color_text_meeting(item.title),
						textFontSize - 5,
						// new Date().setDate(new Date().getDate() + 1),
						item.thoi_gian,
						item.status != 2
					)}
					<View
						style={{
							flex: 2,
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							paddingHorizontal: 15
						}}
					>
						<View style={{ flex: 1 }}>
							<Text
								style={{
									color: TEXT_COLOR,
									fontWeight: 'bold',
									marginBottom: 2,
									fontSize: textFontSize
								}}
							>
								BN: {item.full_name}
							</Text>

							<Text
								style={{
									color: TEXT_COLOR,
									marginBottom: 2,
									fontSize: textFontSize
								}}
							>
								{item.loai == 0 ? 'Khám chữa bệnh' : 'Khám sức khoẻ'}
							</Text>
							<Text
								style={{
									color: TEXT_COLOR,
									marginBottom: 2,
									fontSize: textFontSize
								}}
							>
								Thời gian:
								<Text
									style={{
										color: COLOR_ORANGE
									}}
								>
									{' ' + time}
								</Text>
							</Text>
							<Text
								style={{
									color: TEXT_COLOR,
									marginBottom: 2,
									fontSize: textFontSize
								}}
							>
								Khai báo y tế: {' '}
								{item.to_khai_y_te ? (
									<Text
										style={{
											color: COLOR_GREEN,
											marginBottom: 2,
											fontSize: textFontSize
										}}
									>
										Đã khai báo
									</Text>
								) : (
									<Text
										style={{
											color: 'red',
											marginBottom: 2,
											fontSize: textFontSize
										}}
									>
										Chưa khai báo
									</Text>
								)}
							</Text>
							{view_status(item.status, item.note)}
						</View>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}
export class CapCuuItem extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	onCancel = () => {
		this.props.onPressCancel();
	};

	render() {
		const item = this.props.item;
		const { meeting } = this.props;
		const datetime = item.thoi_gian;
		const time = datehhmm(item.thoi_gian);
		return (
			<TouchableOpacity
				key={item._id + ''}
				onPress={this.props.onPress}
				style={[ styles.meetingReminder, { paddingVertical: 10 } ]}
			>
				<View style={styles.meetingDetail}>
					{view_date(
						get_color_text_meeting(item.title),
						textFontSize - 5,
						// new Date().setDate(new Date().getDate() + 1),
						item.thoi_gian,
						item.status != 2
					)}
					<View
						style={{
							flex: 2,
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							paddingHorizontal: 15
						}}
					>
						<View style={{ flex: 1 }}>
							<Text
								style={{
									color: TEXT_COLOR,
									fontWeight: 'bold',
									marginBottom: 2,
									fontSize: textFontSize
								}}
							>
								Bn: {item.full_name}
							</Text>

							<Text
								style={{
									color: TEXT_COLOR,
									marginBottom: 2,
									fontSize: textFontSize
								}}
							>
								Gọi cấp cứu
							</Text>
							<Text
								style={{
									color: TEXT_COLOR,
									marginBottom: 2,
									fontSize: textFontSize
								}}
							>
								Thời gian gọi:
								<Text
									style={{
										color: COLOR_ORANGE
									}}
								>
									{' ' + time}
								</Text>
							</Text>

							{view_status(item.status, item.note)}
						</View>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}
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
		height: isIphoneX() ? width / 2.7 : width / 3.7,
		paddingHorizontal: 20
	},
	money: {
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		height: width / 4,
		width: width / 1.12,
		marginTop: -height / 25,
		borderRadius: 10
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
		flex: 1,
		marginHorizontal: 4,
		marginVertical: 4,
		backgroundColor: 'white',
		marginBottom: height / 50,
		padding: 10,
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
	meetingDetail: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 10
	},
	delete: {
		position: 'absolute',
		right: 0,
		top: -2
	}
});
