import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MView from '../../../components/MView';
import MHeader from '../../../components/MHeader';
import { textFontSize } from '../../../utilities/Styles';
import {
	width,
	TEXT_COLOR,
	COLOR_GRAY,
	COLOR_LIGHT_BLUE,
	COLOR_RED,
	COLOR_MINT,
	COLOR_PRIMARY,
	COLOR_WHITEGRAY
} from '../../../utilities/config';
import { Input } from 'react-native-elements';
const camera = require('../../../assets/img/img_account/may_anh_acc.png');
import Ionicons from 'react-native-vector-icons/Ionicons';
import MAsyncStorage from '../../../utilities/MAsyncStorage';
import moment from 'moment';
import { connect } from 'react-redux';
import { dateDDMMYYYY } from '../../../utilities/StringHelper';

class HeathyInfomation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null
		};
	}

	customheaderRight = () => {
		return (
			<View>
				<Text style={{ color: '#f0f4f6', fontSize: textFontSize + 3 }}>Sửa</Text>
			</View>
		);
	};
	PrimaryInformation = (data) => {
		const birthday = moment(data.user.date_of_bird).format('DD/MM/YYYY');
		return (
			<View
				onStartShouldSetResponder={() => {
					this.setState({ isShownUD: 0 });
				}}
				style={{ marginTop: width / 25, marginHorizontal: width / 25 }}
			>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Thông tin sức khoẻ</Text>
					<Text onPress={() => this.props.navigation.navigate('EditHeathyInfomation')} style={styles.add}>
						Sửa
					</Text>
				</View>

				<View style={styles.card}>
					<View style={{ flexDirection: 'row' }}>
						<View style={styles.container}>
							<Text style={styles.titleText}>Nhóm máu</Text>
							<Text style={styles.contentText}>
								{data.user.nhom_mau ? data.user.nhom_mau : 'Chưa có'}
							</Text>
						</View>
						<View style={styles.container}>
							<Text style={styles.titleText}>Chiều cao</Text>
							<Text style={styles.contentText}>
								{data.user.chieu_cao ? data.user.chieu_cao + ' Cm' : 'Chưa có'}
							</Text>
						</View>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<View style={styles.container}>
							<Text style={styles.titleText}>Cân nặng</Text>
							<Text style={styles.contentText}>
								{data.user.can_nang ? data.user.can_nang + ' Kg' : 'Chưa có'}
							</Text>
						</View>
					</View>
				</View>
			</View>
		);
	};

	AddressInformation = () => {
		const data = this.props.route.params ? this.props.route.params.dataCity : null;
		return (
			<View
				onStartShouldSetResponder={() => {
					this.setState({ isShownUD: 0 });
				}}
				style={{ marginTop: width / 25, marginHorizontal: width / 25 }}
			>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Thông tin địa chỉ</Text>
					<Text onPress={() => this.props.navigation.navigate('AddHealthInsurance')} style={styles.add}>
						Sửa
					</Text>
				</View>
				<View
					style={{
						marginTop: width / 20
					}}
				>
					<Text style={[ styles.titleText, { marginBottom: 5 } ]}>Tỉnh/Thành phố</Text>
					<TouchableOpacity
						onPress={() => this.props.navigation.navigate('InputAddress', { data: data })}
						style={{
							backgroundColor: 'white',
							padding: 10,
							borderRadius: 3
						}}
					>
						<Text style={{ fontSize: textFontSize, color: COLOR_GRAY }}>
							{data ? data.title : 'Nhap thong tin tinh, xa, phuong'}
						</Text>
					</TouchableOpacity>
				</View>

				{data ? (
					<View style={{ flexDirection: 'row', marginTop: width / 40 }}>
						<View style={{ flex: 1 }}>
							<Text style={[ styles.titleText, { marginBottom: 5 } ]}>Quận, Huyện</Text>
							<TouchableOpacity
								onPress={() => this.props.navigation.navigate('InputAddress', { data: data })}
								style={{
									backgroundColor: 'white',
									padding: 10,
									borderRadius: 3,
									width: width / 2.3
								}}
							>
								<Text style={{ fontSize: textFontSize, color: COLOR_GRAY }}>
									{data ? data.title : 'Nhap thong tin tinh, xa, phuong'}
								</Text>
							</TouchableOpacity>
						</View>
						<View style={{ flex: 1 }}>
							<Text style={[ styles.titleText, { marginBottom: 5 } ]}>Xã, Phường</Text>
							<TouchableOpacity
								onPress={() => this.props.navigation.navigate('InputAddress', { data: data })}
								style={{
									backgroundColor: 'white',
									padding: 10,
									borderRadius: 3
								}}
							>
								<Text style={{ fontSize: textFontSize, color: COLOR_GRAY }}>
									{data ? data.title : 'Nhap thong tin tinh, xa, phuong'}
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				) : (
					<View />
				)}
				{/* <Input
          editable={false}
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={styles.inputStyle}
          placeholder="VD: điểm mốc, số nhà ..."
        /> */}
			</View>
		);
	};
	render() {
		const data = this.props.userInfoReducer.data;
		return (
			<MView>
				<MHeader
					onPress={() => {
						this.props.navigation.pop();
					}}
					text="Thông tin cơ bản"
				/>
				{this.PrimaryInformation(data)}
			</MView>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		userInfoReducer: state.userInfoReducer
	};
};

export default connect(mapStateToProps)(HeathyInfomation);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: width / 25,
		marginHorizontal: width / 25
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
	image: {
		width: width / 5,
		resizeMode: 'contain'
	},
	imageContainer: {
		flex: 1,
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	imgBorder: {
		borderWidth: 1,
		borderColor: COLOR_GRAY,
		paddingVertical: 10,
		paddingHorizontal: width / 15
	},
	title: {
		color: COLOR_MINT,
		fontSize: textFontSize * 1.5,
		fontWeight: 'bold'
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	add: {
		position: 'absolute',
		right: 0,
		color: COLOR_PRIMARY
	},
	card: {
		backgroundColor: 'white',
		marginTop: width / 20,
		paddingBottom: width / 30
	},
	text: {
		color: TEXT_COLOR,
		fontSize: textFontSize * 1.1
	},
	more: {
		fontSize: textFontSize * 1.5,
		color: COLOR_PRIMARY,
		// position: "absolute",
		right: 0
	},
	btnUD: {
		backgroundColor: COLOR_LIGHT_BLUE,
		paddingHorizontal: width / 30,
		borderRadius: 10,
		position: 'absolute',
		right: width / 30,
		top: width / 40,
		alignItems: 'center'
	},
	update: {
		fontSize: textFontSize,
		color: COLOR_PRIMARY,
		marginVertical: 5
	},
	delete: {
		fontSize: textFontSize,
		color: COLOR_RED,
		marginVertical: 5
	},
	inputContainer: {
		backgroundColor: 'white',
		marginHorizontal: width / 20,
		borderRadius: 5,
		height: width / 8,
		alignItems: 'center',
		alignSelf: 'center',
		width: width / 1.1,
		marginTop: 10
	},
	inputContainerStyle: {
		borderBottomWidth: 0,
		paddingHorizontal: 10
	},
	inputStyle: {
		fontSize: textFontSize * 1
	}
});
