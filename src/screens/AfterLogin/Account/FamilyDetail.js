import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import MView from '../../../components/MView';
import { Avatar } from 'react-native-elements';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { width, COLOR_PRIMARY } from '../../../utilities/config';
import { textFontSize } from '../../../utilities/Styles';
const cmnd = require('../../../assets/img/img_account/thong_tin_co_ban.png');
const baohiem = require('../../../assets/img/img_account/thong_tin_bao_hiem.png');
const suckhoe = require('../../../assets/img/img_account/thong_tin_suc_khoe.png');
const camera = require('../../../assets/img/img_account/may_anh_acc.png');
export default class FamilyDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	header = () => {
		return (
			<View
				style={{
					flex: 0.5,
					backgroundColor: '#12a8f2',
					flexDirection: 'row',
					alignItems: 'center'
				}}
			>
				<IonIcon
					onPress={() => {
						this.props.navigation.pop();
					}}
					name="chevron-back-outline"
					style={{
						alignSelf: 'center',
						color: 'white',
						fontSize: textFontSize * 1.5,
						marginLeft: 10
					}}
				/>

				<Text
					style={{
						color: 'white',
						padding: width / 20,
						fontSize: textFontSize * 1.5,
						textAlign: 'center',
						fontWeight: 'bold'
					}}
				>
					Hồ sơ người thân
				</Text>
			</View>
		);
	};
	avatar = () => {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					paddingBottom: width / 20,
					width: width
				}}
			>
				<Image style={styles.avatar} source={this.props.route.params.item.avatar} />
				<Image style={styles.minicon} source={camera} />
				<Text style={{ color: '#3384c5' }}>Nguyễn Khánh Linh</Text>
			</View>
		);
	};
	relationship = () => {
		return (
			<View style={{ paddingHorizontal: width / 20 }}>
				<View style={{ flexDirection: 'row', paddingBottom: width / 20 }}>
					<Text style={styles.title}>Mối quan hệ</Text>
					<View style={{ alignSelf: 'center', flex: 2, alignItems: 'center' }}>
						<Text
							style={{
								backgroundColor: COLOR_PRIMARY,
								width: width / 5,
								padding: 5,
								borderRadius: 10,
								color: 'white',
								textAlign: 'center'
							}}
						>
							Con
						</Text>
					</View>
					<Text style={styles.bluetext}>Sửa</Text>
				</View>
			</View>
		);
	};
	information = () => {
		return (
			<View
				style={{
					flex: 1,
					paddingHorizontal: width / 20
				}}
			>
				<Text style={styles.title}>Thông tin</Text>
				<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
					<Image style={styles.infoimg} source={cmnd} />
					<Text
						style={{
							flex: 5,
							color: '#0e1a24',
							fontSize: textFontSize * 1.2,
							marginLeft: 8
						}}
					>
						Thông tin cơ bản
					</Text>
					<Text
						style={{
							flex: 1,
							position: 'absolute',
							right: 0,
							color: '#3384c5'
						}}
					>
						Chi tiết
					</Text>
				</View>
				<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
					<Image style={styles.infoimg} source={baohiem} />
					<Text
						style={{
							flex: 5,
							color: '#0e1a24',
							fontSize: textFontSize * 1.2,
							marginLeft: 8
						}}
					>
						Thông tin bảo hiểm
					</Text>
					<Text
						style={{
							flex: 1,
							position: 'absolute',
							right: 0,
							color: '#3384c5'
						}}
					>
						Chi tiết
					</Text>
				</View>
				<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
					<Image style={styles.infoimg} source={suckhoe} />
					<Text
						style={{
							flex: 5,
							color: '#0e1a24',
							fontSize: textFontSize * 1.2,
							marginLeft: 8
						}}
					>
						Thông tin sức khỏe
					</Text>
					<Text
						style={{
							flex: 1,
							position: 'absolute',
							right: 0,
							color: '#3384c5'
						}}
					>
						Chi tiết
					</Text>
				</View>
			</View>
		);
	};
	deleteDocument = () => {
		return (
			<View style={{ flex: 2, justifyContent: 'center' }}>
				<TouchableOpacity style={styles.signout}>
					<Image
						style={{ flex: 1, width: width / 30, resizeMode: 'contain' }}
						source={require('../../../assets/img/img_account/xoa.png')}
					/>
					<Text
						style={{
							flex: 4,
							color: '#e94125',
							textAlign: 'center',
							fontSize: textFontSize * 1
						}}
					>
						Xóa hồ sơ
					</Text>
				</TouchableOpacity>
			</View>
		);
	};
	render() {
		return (
			<MView>
				{this.header()}
				{/* <Text>{this.props.route.params.item.name}</Text> */}
				{this.avatar()}
				{this.relationship()}
				{this.information()}
				{this.deleteDocument()}
			</MView>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	avatar: {
		flex: 1,
		resizeMode: 'contain',
		width: width / 4
	},
	minicon: {
		width: width / 12,
		resizeMode: 'contain',
		position: 'absolute',
		//bottom: -width/20,
		right: width / 3
	},
	title: {
		//flex: 1,
		color: '#069889',
		fontSize: textFontSize * 1.3,
		fontWeight: 'bold'
	},
	bluetext: {
		color: COLOR_PRIMARY,
		alignSelf: 'center',
		fontSize: textFontSize
	},
	infoimg: {
		width: width / 10,
		resizeMode: 'contain'
	},
	signout: {
		flexDirection: 'row',
		alignSelf: 'center',
		backgroundColor: '#f7d7d7',
		paddingHorizontal: width / 20,
		width: width / 2.5,
		alignItems: 'center',
		borderRadius: 10
	}
});
