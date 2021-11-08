import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import MView from '../../../components/MView';
import MHeader from '../../../components/MHeader';
import {
	width,
	COLOR_MINT,
	COLOR_PRIMARY,
	TEXT_COLOR,
	COLOR_LIGHT_BLUE,
	COLOR_RED,
	COLOR_GRAY
} from '../../../utilities/config';
import { textFontSize } from '../../../utilities/Styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { dateDDMMYYYY } from '../../../utilities/StringHelper';

const healthinsurancedata = [
	{
		id: 1,
		number: 'DN4010123456789',
		place: 'Bệnh viện Bưu Điện',
		type: 1,
		expiredate: ''
	},
	{
		id: 2,
		number: 'CH5010123789456',
		place: 'Công ty cổ phần Bệnh viện Giao Thông Vận Tải',
		type: 1,
		expiredate: ''
	},
	{
		id: 3,
		number: 'CD5010123789456',
		place: 'Công ty cổ phần Bệnh viện Giao Thông Vận Tải',
		type: 2,
		expiredate: '10/01/2020'
	}
];

class InsuranceInformation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShownUD: ''
		};
	}

	showOption = (id) => {
		this.setState({
			isShownUD: id
		});
	};

	healthInsurance = () => {
		return (
			<View
				onStartShouldSetResponder={() => {
					this.setState({ isShownUD: 0 });
				}}
				style={styles.container}
			>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Bảo hiểm y tế</Text>
					<Text onPress={() => this.props.navigation.navigate('AddHealthInsurance')} style={styles.add}>
						Thêm
					</Text>
				</View>
				{healthinsurancedata.map((item) => {
					if (item.type === 1) {
						return (
							<View key={item.id} style={styles.card}>
								<View>
									<View style={{ marginBottom: 10 }}>
										<Text style={styles.text}>Số thẻ</Text>
										<Text style={styles.text}>{item.number}</Text>
									</View>
									<View>
										<Text style={styles.text}>Nơi cấp</Text>
										<Text style={styles.text}>{item.place}</Text>
									</View>
								</View>
								<View style={styles.btnUD}>
									<TouchableOpacity onPress={() => this.showOption(item.id)} key={item.id}>
										<Ionicons style={styles.more} name="ellipsis-horizontal-outline" />
									</TouchableOpacity>
									{this.state.isShownUD == item.id ? (
										<View>
											<Text style={styles.update}>Sửa</Text>
											<Text style={styles.delete}>Xóa</Text>
										</View>
									) : (
										<View />
									)}
								</View>
							</View>
						);
					}
				})}
			</View>
		);
	};

	privateInsurance = () => {
		return (
			<View
				onStartShouldSetResponder={() => {
					this.setState({ isShownUD: 0 });
				}}
				style={styles.container}
			>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Bảo hiểm tư nhân</Text>
					<Text
						onPress={() => {
							this.props.navigation.navigate('AddPrivateInsurance');
						}}
						style={styles.add}
					>
						Thêm
					</Text>
				</View>
				<View key={item.id} style={styles.card}>
					<View>
						<View style={{ marginBottom: 10 }}>
							<Text style={styles.text}>Số thẻ</Text>
							<Text style={styles.text}>{item.number}</Text>
						</View>
						<View style={{ marginBottom: 10 }}>
							<Text style={styles.text}>Nơi cấp</Text>
							<Text style={styles.text}>{item.place}</Text>
						</View>
						<View>
							<Text style={styles.text}>Ngày hết hạn</Text>
							<Text style={styles.text}>{item.expiredate}</Text>
						</View>
					</View>
					<View style={styles.btnUD}>
						<TouchableOpacity key={item.id} onPress={() => this.showOption(item.id)}>
							<Ionicons style={styles.more} name="ellipsis-horizontal-outline" />
						</TouchableOpacity>

						{this.state.isShownUD === item.id ? (
							<View>
								<Text style={styles.update}>Sửa</Text>
								<Text style={styles.delete}>Xóa</Text>
							</View>
						) : (
							<View />
						)}
					</View>
				</View>
			</View>
		);
	};
	healthInsurance2 = (data) => {
		return (
			<View
				onStartShouldSetResponder={() => {
					this.setState({ isShownUD: 0 });
				}}
				style={{ marginTop: width / 25, marginHorizontal: width / 25 }}
			>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Thông tin Bảo hiểm y tế</Text>
					<Text onPress={() => this.props.navigation.navigate('EditBHYT')} style={styles.add}>
						{data.bhyt ? 'Sửa' : 'Thêm'}
					</Text>
				</View>
				{data.bhyt ? (
					<View style={styles.card}>
						<View style={[ styles.container, { flex: 0 } ]}>
							<Text style={styles.titleText}>Số BHYT</Text>
							<Text style={styles.contentText}>{data.bhyt.so_bhyt}</Text>
						</View>
						{/* <View style={{ flexDirection: 'row' }}>
						<View style={styles.container}>
							<Text style={styles.titleText}>Ngày cấp</Text>
							<Text style={styles.contentText}>{dateDDMMYYYY(data.identity.ngay_cap)}</Text>
						</View>
						<View style={styles.container}>
							<Text style={styles.titleText}>Nơi cấp</Text>
							<Text style={styles.contentText}>{data.identity.noi_cap}</Text>
						</View>
					</View> */}
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
							<Text style={{ textAlign: 'center' }}>Bạn chưa thêm BHYT</Text>
						</View>
					</View>
				)}
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
					text="Thông tin bảo hiểm"
				/>
				<ScrollView>
					{this.healthInsurance2(data)}
					{/* {this.privateInsurance()} */}
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

export default connect(mapStateToProps)(InsuranceInformation);

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
