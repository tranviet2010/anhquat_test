import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,ScrollView } from 'react-native';
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

class PatientInformation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null,
			data_city: [],
			data_district: [],
			data_ward: []
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
					<Text style={styles.title}>Thông tin cá nhân</Text>
					<Text onPress={() => this.props.navigation.navigate('EditUserInfomation')} style={styles.add}>
						Sửa
					</Text>
				</View>

				<View style={styles.card}>
					<View style={{ flexDirection: 'row' }}>
						<View style={styles.container}>
							<Text style={styles.titleText}>Họ và tên</Text>
							<Text style={styles.contentText}>{data.user.full_name}</Text>
						</View>
						<View style={styles.container}>
							<Text style={styles.titleText}>Giới tính</Text>
							<Text style={styles.contentText}>{data.user.gender == 'nam' ? 'Nam' : 'Nữ'}</Text>
						</View>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<View style={styles.container}>
							<Text style={styles.titleText}>Ngày sinh</Text>
							<Text style={styles.contentText}>{birthday}</Text>
						</View>
						<View style={styles.container}>
							<Text style={styles.titleText}>Số điện thoại</Text>
							<Text style={styles.contentText}>{data.user.phone}</Text>
						</View>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<View style={styles.container}>
							<Text style={styles.titleText}>Dân tộc</Text>
							{data.user.dan_toc && data.user.dan_toc.name ? (
								<Text style={styles.contentText}>{data.user.dan_toc.name}</Text>
							) : (
								this.missing_info()
							)}
						</View>
						<View style={styles.container}>
							<Text style={styles.titleText}>Nghề nghiệp</Text>
							{data.user.nghe_nghiep && data.user.nghe_nghiep.name ? (
								<Text style={styles.contentText}>{data.user.nghe_nghiep.name}</Text>
							) : (
								this.missing_info()
							)}
						</View>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<View style={styles.container}>
							<Text style={styles.titleText}>Email</Text>
							{data.user.email ? (
								<Text style={styles.contentText}>{data.user.email}</Text>
							) : (
								this.missing_info()
							)}
						</View>
					</View>
				</View>
			</View>
		);
	};

	IDInformation = (data) => {
		return (
			<View
				onStartShouldSetResponder={() => {
					this.setState({ isShownUD: 0 });
				}}
				style={{ marginTop: width / 25, marginHorizontal: width / 25 }}
			>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Thông tin CMT/CCCD</Text>
					<Text onPress={() => this.props.navigation.navigate('EditIdentityInfomation')} style={styles.add}>
						{data.identity ? 'Sửa' : 'Thêm'}
					</Text>
				</View>
				{data.identity ? (
					<View style={styles.card}>
						<View style={[ styles.container, { flex: 0 } ]}>
							<Text style={styles.titleText}>Số chứng minh thư/căn cước công dân</Text>
							<Text style={styles.contentText}>{data.identity.so_cmt}</Text>
						</View>
						<View style={{ flexDirection: 'row' }}>
							<View style={styles.container}>
								<Text style={styles.titleText}>Ngày cấp</Text>
								<Text style={styles.contentText}>{dateDDMMYYYY(data.identity.ngay_cap)}</Text>
							</View>
							<View style={styles.container}>
								<Text style={styles.titleText}>Nơi cấp</Text>
								<Text style={styles.contentText}>{data.identity.noi_cap}</Text>
							</View>
						</View>
						{/* <View style={[ styles.container, { flex: 0 } ]}>
						<Text style={styles.titleText}>Ảnh chứng minh thư/căn cước công dân</Text>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center'
							}}
						>
							<View style={styles.imageContainer}>
								<Text>Mặt trước </Text>
								<View style={styles.imgBorder}>
									<Image style={styles.image} source={camera} />
								</View>
							</View>
							<View style={styles.imageContainer}>
								<Text>Mặt sau </Text>
								<View style={styles.imgBorder}>
									<Image style={styles.image} source={camera} />
								</View>
							</View>
						</View>
					</View> */}
					</View>
				) : (
					<View style={styles.card}>
						<View style={[ styles.container, { flex: 0 } ]}>
							<Text style={{ textAlign: 'center' }}>Bạn chưa thêm CMND</Text>
						</View>
					</View>
				)}
			</View>
		);
	};
	missing_info = () => {
		return (
			<Text numberOfLines={1} style={styles.contentMissing}>
				Thiếu thông tin
			</Text>
		);
	};
	AddressInformation = (data) => {
		return (
			<View
				onStartShouldSetResponder={() => {
					this.setState({ isShownUD: 0 });
				}}
				style={{ marginTop: width / 25, marginHorizontal: width / 25 }}
			>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Thông tin địa chỉ</Text>
					<Text onPress={() => this.props.navigation.navigate('EditAddressInfomation')} style={styles.add}>
						{'Sửa'}
					</Text>
				</View>
				<View style={styles.card}>
					{/* <View style={[ styles.container, { flex: 0 } ]} /> */}
					<View style={{ flexDirection: 'row' }}>
						<View style={styles.container}>
							<Text style={styles.titleText}>Tỉnh/TP</Text>
							{data.user.tinh && data.user.tinh.name ? (
								<Text numberOfLines={1} style={styles.contentText}>
									{data.user.tinh.name}
								</Text>
							) : (
								this.missing_info()
							)}
						</View>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<View style={styles.container}>
							<Text style={styles.titleText}>Quận/huyện</Text>
							{data.user.huyen && data.user.huyen.name ? (
								<Text numberOfLines={1} style={styles.contentText}>
									{data.user.huyen.name}
								</Text>
							) : (
								this.missing_info()
							)}
						</View>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<View style={styles.container}>
							<Text style={styles.titleText}>Xã/Phường</Text>
							{data.user.xa && data.user.xa.name ? (
								<Text numberOfLines={1} style={styles.contentText}>
									{data.user.xa.name}
								</Text>
							) : (
								this.missing_info()
							)}
						</View>
					</View>

					<View style={[ styles.container, { flex: 0 } ]}>
						<Text style={styles.titleText}>Chi tiết địa chỉ</Text>
						<Text style={styles.contentText}>{data.user.address}</Text>
					</View>
				</View>
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
				<ScrollView>
				{this.PrimaryInformation(data)}
				{this.IDInformation(data)}
				{this.AddressInformation(data)}
				</ScrollView>
				
			</MView>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		userInfoReducer: state.userInfoReducer
	};
};

export default connect(mapStateToProps)(PatientInformation);

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
	contentMissing: {
		fontSize: textFontSize,
		color: 'red'
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
