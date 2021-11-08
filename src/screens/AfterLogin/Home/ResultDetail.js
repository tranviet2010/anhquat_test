import React, { Component } from 'react';
import MView from '../../../components/MView';
import MHeader from '../../../components/MHeader';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { width, COLOR_MINT, TEXT_COLOR, COLOR_ORANGE, COLOR_KETCHUP } from '../../../utilities/config';
import MeetingItem, { LichSuKhamItem } from '../../../components/customize/MeetingItem';
import { textFontSize } from '../../../utilities/Styles';
import OneLine from '../../../components/OneLine';
import { ScrollView } from 'react-native-gesture-handler';
import MAlert from '../../../components/MAlert';
import { deleteHistoryAction } from '../../../redux/redux/deleteHistory';
import { getChiTietLichSuKhamAction } from '../../../redux/redux/getChiTietLichSuKham';

import { connect } from 'react-redux';
import { add_dot_number } from '../../../utilities/StringHelper';

const prescript = [
	{
		id: '1',
		name: 'XXXXX',
		amount: '20 viên',
		guide: 'Trưa 2 viên, tối 2 viên sau ăn'
	},
	{
		id: '2',
		name: 'YYYYYYYY',
		amount: '20 viên',
		guide: 'Trưa 2 viên, tối 2 viên sau ăn'
	},
	{
		id: '3',
		name: 'ZZZZZZZZ',
		amount: '20 viên',
		guide: 'Trưa 1 viên, tối 1 viên sau ăn'
	}
];
class ResultDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		this.onGetDetail();
	}
	onGetDetail = (id) => {
		let body = {
			kb_ma_dot_kham: this.props.route.params.item.kb_malankham
		};
		this.props.getChiTietLichSuKhamAction(body);
	};
	onDeleteHistory = (id) => {
		let body = {
			ids: id
		};
		this.props.deleteHistoryAction(body);
	};

	componentDidUpdate = (PrevProps, PrevState) => {
		if (this.props.deleteHistoryReducer != PrevProps.deleteHistoryReducer) {
			if (this.props.deleteHistoryReducer.isSuccess) {
				this.props.navigation.goBack();
			}
		}
	};

	appointment = (item) => {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Đợt khám</Text>
				<View style={styles.appointment}>
					<LichSuKhamItem meeting={false} item={item} />
				</View>
			</View>
		);
	};
	result = () => {
		return (
			<View style={[ styles.container, { marginTop: 0 } ]}>
				<Text style={styles.title}>Kết quả khám</Text>
				<View
					elevation={2}
					style={{
						width: width / 1.05,
						height: width / 2.5,
						alignSelf: 'center',
						backgroundColor: 'white',
						borderRadius: 10,
						marginTop: 10
					}}
				>
					<View style={{ flexDirection: 'row', margin: 5 }}>
						<Text style={{ flex: 1 }}>Chẩn đoán</Text>
						<View style={{ flex: 3 }}>
							{/* <Text style={styles.text}>Chẩn đoán</Text> */}
							<Text style={styles.text}>
								Đau lưng kèm đau dây thần kinh tọa phải/ Thoái hóa cột sống thắt lưng từ L1 đến L5
							</Text>
						</View>
					</View>
				</View>
			</View>
		);
	};
	presciption = () => {
		const data = this.props.getChiTietLichSuKhamReducer.data;
		if (this.props.getChiTietLichSuKhamReducer.isSuccess) {
			return (
				<View style={[ styles.container, { marginBottom: width / 20 } ]}>
					<Text style={styles.title}>Đơn thuốc</Text>
					<View
						elevation={2}
						style={{
							width: width / 1.05,
							alignSelf: 'center',
							backgroundColor: 'white',
							borderRadius: 10,
							padding: 10,
							marginTop: 10
						}}
					>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							{/* <Text style={styles.text}>Thuốc điều trị</Text> */}
							{/* <Text style={[ styles.text, { color: COLOR_ORANGE, position: 'absolute', right: 0 } ]}>
							11:00 10/06/2020
						</Text> */}
						</View>
						{data.don_thuoc.map((item, index) => (
							<View key={index + 'thuoc'}>
								<View key={item.id} style={{ flexDirection: 'row', margin: 5 }}>
									<Text style={styles.text}>{index + 1}. </Text>
									<Text style={[ styles.text, { fontWeight: 'bold' } ]}>{item.kh_ten_thuoc} | </Text>
									<Text style={styles.text}>
										{item.kh_so_luong} {item.kh_don_vi}
									</Text>
								</View>
								<Text style={[ styles.text, {} ]}>HDSD: {item.kh_cach_uong}</Text>
								<Text style={styles.text}>{item.kh_ghi_chu}</Text>
							</View>
						))}
						<OneLine color="black" />
						{/* <View style={{ top: 5 }}>
						<Text style={styles.text}>Lời dặn:</Text>
						<Text style={{ fontSize: textFontSize }}>
							Lorem ipsum dolor sit amet, consectetuer adipisc- ing elit, sed diam nonummy nibh euismod
							tincidunt
						</Text>
					</View> */}
					</View>
				</View>
			);
		} else {
			return null;
		}
	};
	cls = () => {
		let data = this.props.getChiTietLichSuKhamReducer.data;
		let ct = {
			kb_id: '21',
			kb_loai_cls: 'CDHAC',
			kb_hinh_anh: '',
			kb_ten_cls: 'Chụp CLVT sọ não không tiêm thuốc cản quang (từ 1-32 dãy)',
			kb_phong_thuc_hien: '0',
			kb_ten_phong_thuc_hien: '',
			kb_khoa: '0',
			kb_ten_khoa: '',
			kb_phuong_phap_thuc_hien: '',
			kb_nguoi_thuc_hien: 'e9a12803-d219-4fba-a858-d962765e9c05',
			kb_ten_nguoi_thuc_hien: 'Trần Văn Nam',
			kb_ket_qua_cls: '',
			kb_ket_luan_cls: '',
			kb_loi_dan: ''
		};
		if (this.props.getChiTietLichSuKhamReducer.isSuccess) {
			var cls_parent = [];
			data.can_lam_sang.forEach((cls) => {
				if (cls.kb_madichvu_childen == '0') {
					let finded_childrens = data.can_lam_sang.filter(
						(element) => element.kb_madichvu_childen == cls.kb_madichvu_father
					);
					if (finded_childrens) {
						cls.childrens = finded_childrens;
					}
					cls_parent.push(cls);
				}
			});
		}
		console.log(cls_parent);

		if (this.props.getChiTietLichSuKhamReducer.isSuccess) {
			return (
				<View style={[ styles.container, { marginBottom: width / 20 } ]}>
					<Text style={styles.title}>Chi tiết kết quả cận lâm sàng</Text>
					<View
						elevation={2}
						style={{
							width: width / 1.05,
							alignSelf: 'center',
							backgroundColor: 'white',
							borderRadius: 10,
							padding: 10,
							marginTop: 10
						}}
					>
						<View style={{ flexDirection: 'row', margin: 5 }}>
							{/* <Text style={{ flex: 2 }}>
									{1}. {ct.kb_ten_cls} <Text style={{color:'red'}}>(Hệ thống lưu trữ hình ảnh đang nâng cấp)</Text>
								</Text> */}
							<Text style={{ flex: 2 }}>
								{1}. {ct.kb_ten_cls}
							</Text>
							<View style={{ flex: 2 }}>
								{/* {
										item.kb_ket_qua_cls ? <Text numberOfLines={1} style={{ textAlign: 'right' }}>{item.kb_ket_qua_cls}</Text>: null 
									}
									 */}
								<Text
									onPress={() => {
										this.props.navigation.navigate('CLSDetail', { item: ct });
									}}
									style={{ textAlign: 'right', color: 'blue' }}
								>
									Chi tiết
								</Text>
							</View>
						</View>
						{[ ...cls_parent ].map((item, index) => (
							<View key={index + 'cls'} style={{ flexDirection: 'row', margin: 5 }}>
								<Text style={{ flex: 2 }}>
									{index + 2}. {item.kb_ten_cls}
								</Text>
								<View style={{ flex: 2 }}>
									{/* {
										item.kb_ket_qua_cls ? <Text numberOfLines={1} style={{ textAlign: 'right' }}>{item.kb_ket_qua_cls}</Text>: null 
									}
									 */}
									<Text
										onPress={() => {
											this.props.navigation.navigate('CLSDetail', { item: item });
										}}
										style={{ textAlign: 'right', color: 'blue' }}
									>
										Chi tiết
									</Text>
								</View>
							</View>
						))}

						{/* <View style={{ flexDirection: 'row', margin: 5 }}>
							<Text style={{ flex: 2 }}>2. Định lượng Triglycerid (máu) [Máu]</Text>
							<View style={{ flex: 2 }}>
								<Text style={{ textAlign: 'right' }}>0.46-1.88 mmol/L</Text>
							</View>
						</View>
						<View style={{ flexDirection: 'row', margin: 5 }}>
							<Text style={{ flex: 2 }}>3. Urease test HP</Text>
							<View style={{ flex: 2 }}>
								<Text style={{ textAlign: 'right' }}>0.46-1.88 mmol/L</Text>
							</View>
						</View>
						<OneLine color="black" />
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ fontWeight: 'bold' }}>Thủ thuật</Text>
							<Text style={[ styles.text, { color: COLOR_ORANGE, position: 'absolute', right: 0 } ]}>
								11:00 10/06/2020
							</Text>
						</View>
						<View style={{ flexDirection: 'row', margin: 5 }}>
							<Text style={{ flex: 2 }}>1. Nhổ răng sữa</Text>
							<View style={{ flex: 2 }}>
								<Text style={{ textAlign: 'right' }}>OK</Text>
							</View>
						</View>

						<OneLine color="black" />
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ fontWeight: 'bold' }}>Siêu âm</Text>
							<Text style={[ styles.text, { color: COLOR_ORANGE, position: 'absolute', right: 0 } ]}>
								11:00 10/06/2020
							</Text>
						</View>
						<View style={{ flexDirection: 'row', margin: 5 }}>
							<Text style={{ flex: 2 }}>1. Siêu âm ổ bụng (nam)</Text>
							<View style={{ flex: 2 }}>
								<Text style={{ textAlign: 'right' }}>HÌNH ẢNH GAN NHIỄM MỠ ĐỘ I</Text>
							</View>
						</View>  */}

						{/* <View style={{ top: 5 }}>
						<Text style={styles.text}>Lời dặn:</Text>
						<Text style={{ fontSize: textFontSize }}>
							Lorem ipsum dolor sit amet, consectetuer adipisc- ing elit, sed diam nonummy nibh euismod
							tincidunt
						</Text>
					</View> */}
					</View>
				</View>
			);
		} else {
			return null;
		}
	};
	vien_phi = () => {
		const data = this.props.getChiTietLichSuKhamReducer.data;
		console.log(data);
		console.log('-------------------');

		if (this.props.getChiTietLichSuKhamReducer.isSuccess) {
			return (
				<View style={[ styles.container, { marginBottom: width / 20 } ]}>
					<Text style={styles.title}>Viện phí</Text>
					<View
						elevation={2}
						style={{
							width: width / 1.05,
							alignSelf: 'center',
							backgroundColor: 'white',
							borderRadius: 10,
							padding: 10,
							marginTop: 10
						}}
					>
						<View style={{ flexDirection: 'row', margin: 5 }}>
							<Text style={{ flex: 2 }}>Tổng tiền viện phí</Text>
							<View style={{ flex: 2 }}>
								<Text style={{ textAlign: 'right' }}>
									{add_dot_number(data.vien_phi.kb_tong_tien.toFixed(0))} đ
								</Text>
							</View>
						</View>
						<View style={{ flexDirection: 'row', margin: 5 }}>
							<Text style={{ flex: 2 }}>Bảo hiểm thanh toán</Text>
							<View style={{ flex: 2 }}>
								<Text style={{ textAlign: 'right' }}>
									{add_dot_number(data.vien_phi.kb_tien_bh.toFixed(0))} đ
								</Text>
							</View>
						</View>
						<View style={{ flexDirection: 'row', margin: 5 }}>
							<Text style={{ flex: 2 }}>Bệnh nhân thanh toán</Text>
							<View style={{ flex: 2 }}>
								<Text style={{ textAlign: 'right' }}>
									{add_dot_number(data.vien_phi.kb_tien_khong_bh)} đ
								</Text>
							</View>
						</View>
						<View style={{ flexDirection: 'row', margin: 5 }}>
							<Text style={{ flex: 2 }}>Tổng tiền tạm ứng</Text>
							<View style={{ flex: 2 }}>
								<Text style={{ textAlign: 'right' }}>
									{add_dot_number(data.tam_ung.kb_tong_so_tien_tam_ung)} đ
								</Text>
							</View>
						</View>
						<View style={{ flexDirection: 'row', margin: 5 }}>
							<Text style={{ flex: 2 }}>Tổng tiền hoàn tạm ứng</Text>
							<View style={{ flex: 2 }}>
								<Text style={{ textAlign: 'right' }}>
									{add_dot_number(data.tam_ung.kb_tong_so_tien_hoan_tam_ung)} đ
								</Text>
							</View>
						</View>
					</View>
				</View>
			);
		} else {
			return null;
		}
	};
	render() {
		const item = this.props.route.params.item;
		return (
			<MView>
				<MHeader onPress={() => this.props.navigation.pop()} text="Chi tiết kết quả" />
				<ScrollView>
					{this.appointment(item)}
					{this.vien_phi()}
					{this.presciption()}
					{this.cls()}
				</ScrollView>
				<MAlert ref={(ref) => (this.malert = ref)} />
			</MView>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		deleteHistoryReducer: state.deleteHistoryReducer,
		getChiTietLichSuKhamReducer: state.getChiTietLichSuKhamReducer
	};
};

export default connect(mapStateToProps, { deleteHistoryAction, getChiTietLichSuKhamAction })(ResultDetail);
const styles = StyleSheet.create({
	container: {
		marginHorizontal: width / 20,
		marginTop: width / 20
	},
	appointment: {
		width: width / 1.05,
		flexDirection: 'column',
		marginTop: width / 25,
		alignSelf: 'center',
		height: width / 3.5
	},
	title: {
		color: COLOR_MINT,
		fontSize: textFontSize * 1.4,
		fontWeight: 'bold'
	},
	text: {
		fontSize: textFontSize * 1.1,
		color: TEXT_COLOR
	}
});
