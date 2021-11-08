import React, { Component } from 'react';
import MView from '../../../components/MView';
import MHeader from '../../../components/MHeader';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Image, RefreshControl, Platform } from 'react-native';
import { width, COLOR_MINT, TEXT_COLOR, COLOR_ORANGE, COLOR_KETCHUP, COLOR_PRIMARY } from '../../../utilities/config';
import MeetingItem, { LichSuKhamItem } from '../../../components/customize/MeetingItem';
import { textFontSize } from '../../../utilities/Styles';
import OneLine from '../../../components/OneLine';
import { ScrollView } from 'react-native-gesture-handler';
import MAlert from '../../../components/MAlert';
import { deleteHistoryAction } from '../../../redux/redux/deleteHistory';
import { getHinhAnhCanLamSangAction } from '../../../redux/redux/getHinhAnhCanLamSang';
import ImageView from 'react-native-image-view';

import { connect } from 'react-redux';
import Slider from '@react-native-community/slider';

class CLSDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			images: [],
			is_view_image: false,
			page: 0,
			index: 0
		};
	}
	componentDidMount() {
		this.onGetHinhAnh();
	}
	onGetHinhAnh = (id) => {
		this.setState({ page: 0 }, () => {
			let data = {
				cls_id: this.props.route.params.item.kb_loai_cls + '_' + this.props.route.params.item.kb_id,
				page: this.state.page
			};

			this.props.getHinhAnhCanLamSangAction(data);
		});
	};
	next_page_get_hinh_anh = () => {
		this.setState({ page: this.state.page + 1 }, () => {
			let data = {
				cls_id: this.props.route.params.item.kb_loai_cls + '_' + this.props.route.params.item.kb_id,
				page: this.state.page
			};

			this.props.getHinhAnhCanLamSangAction(data);
		});
	};
	componentDidUpdate(PrevProps) {
		if (this.props.getHinhAnhCanLamSangReducer != PrevProps.getHinhAnhCanLamSangReducer) {
			if (this.props.getHinhAnhCanLamSangReducer.isSuccess) {
				let images = this.props.getHinhAnhCanLamSangReducer.data.map((item, index) => {
					return {
						index: index,
						source: {
							uri: 'data:image/jpeg;base64,' + item.data
						}
					};
				});
				this.setState({
					images
				});
				if (this.props.getHinhAnhCanLamSangReducer.canLoadMore) {
					this.next_page_get_hinh_anh();
				}
			}
		}
	}
	view_image = () => {
		let data = this.props.getHinhAnhCanLamSangReducer.data;

		return (
			<View style={{ justifyContent: 'center', alignItems: 'center' }}>
				<TouchableOpacity
					onPress={() => {
						this.index_image = this.state.index;
						this.setState({
							is_view_image: true
						});
					}}
					style={{ paddingHorizontal: 10, width: width }}
				>
					<Image
						style={{ width: null, height: width * 0.6, resizeMode: 'contain' }}
						source={{ uri: 'data:image/jpeg;base64,' + data[this.state.index].data }}
					/>
				</TouchableOpacity>
				<Text
					style={{
						borderColor: 'gray'
					}}
				>
					{this.state.index + 1} / {data.length}
				</Text>
				<Slider
					onValueChange={(abc) => {
						this.setState({ index: abc }, () => {
							console.log(abc);
							console.log(data[this.state.index]);
						});
					}}
					value={this.state.index}
					style={{ width: width * 0.8, height: 40 }}
					step={1}
					minimumValue={0}
					maximumValue={data.length - 1}
					minimumTrackTintColor={COLOR_PRIMARY}
					maximumTrackTintColor="#000000"
				/>
				{/* <FlatList
				ListHeaderComponent={
					<View>
						{this.view_ket_luan()}
						{data.length > 0 ? (
							<View style={[ styles.container, { marginBottom: width / 20 } ]}>
								<Text style={[ styles.title, { marginBottom: 10 } ]}>Chi tiết hình ảnh</Text>
							</View>
						) : null}
					</View>
				}
				// refreshControl={
				// 	<RefreshControl
				// 		refreshing={this.props.getHinhAnhCanLamSangReducer.isLoading}
				// 		onRefresh={this.onGetHinhAnh}
				// 	/>
				// }
				onEndReachedThreshold={0.2}
				onEndReached={({ distanceFromEnd }) => {
					if (this.props.getHinhAnhCanLamSangReducer.canLoadMore) {
						this.next_page_get_hinh_anh();
					}
				}}
				initialNumToRender={10}
				maxToRenderPerBatch={10}
				windowSize={10}
				legacyImplementation={false}
				updateCellsBatchingPeriod={50}
				keyExtractor={(item) => item._id}
				data={data}
				keyExtractor={(item, index) => index + ''}
				renderItem={({ item, index }) => {
					return (
						<TouchableOpacity
							onPress={() => {
								this.index_image = index;
								this.setState({
									is_view_image: true
								});
							}}
							style={{ paddingHorizontal: 10 }}
						>
							<Image
								style={{ width: null, height: width * 0.6, resizeMode: 'contain' }}
								source={{ uri: 'data:image/jpeg;base64,' + item.data }}
							/>
						</TouchableOpacity>
					);
				}}
			/> */}
			</View>
		);
	};
	create_ket_qua_text = (kq) => {
		let new_kq = kq.replaceAll(`\\n`, ``);

		new_kq = new_kq.replaceAll('-', `${'\n'}-`);
		if (new_kq.search('\n') == 0) {
			new_kq = new_kq.substr(1);
		}
		return new_kq;
	};
	box = (a, b, c) => {
		return (
			<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
				<View style={{ borderWidth: 0.5, borderColor: 'gray', padding: 5 }}>
					<Text
						style={{
							width: 90,
							textAlign: 'left',
							marginRight: 10,
							borderLeftWidth: 0.5,
							borderRightWidth: 0.5,
							borderColor: 'gray'
						}}
					>
						{a}
					</Text>
				</View>
				<View style={{ flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
					<View style={{ borderWidth: 0.5, borderColor: 'gray', padding: 5, flex: 1 }}>
						<Text style={{ marginRight: 10 }}>{b}</Text>
					</View>
					<View style={{ borderWidth: 0.5, borderColor: 'gray', padding: 5, width: 40 }}>
						<Text style={{ textAlign: 'right' }}>{c}</Text>
					</View>
				</View>
			</View>
		);
	};
	child_box = (a, b) => {
		return (
			<View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
				<View style={{ borderWidth: 0.5, borderColor: 'gray', padding: 5, flex: 1 }}>
					<Text style={{ marginRight: 10 }}>{a}</Text>
				</View>
				<View style={{ borderWidth: 0.5, borderColor: 'gray', padding: 5, width: 40 }}>
					<Text style={{ textAlign: 'right' }}>{b}</Text>
				</View>
			</View>
		);
	};
	create_ket_qua_doppler = (kq) => {
		let new_kq = JSON.parse(kq);
		console.log(new_kq);

		// new_kq = new_kq.replaceAll("-", `${'\n'}-`)
		// if(new_kq.search('\n')==0){
		// 	new_kq = new_kq.substr(1)
		// }
		return (
			<View style={{ width: '100%' }}>
				{this.box('Nhĩ trái', '31±4 mm', new_kq.KQ_top_1)}
				{this.box('ĐMC', '28±3 mm', new_kq.KQ_top_2)}
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
					<View style={{ borderWidth: 0.5, borderColor: 'gray', padding: 5, height: '100%' }}>
						<Text
							style={{
								width: 90,
								textAlign: 'left',
								marginRight: 10,
								borderLeftWidth: 0.5,
								borderRightWidth: 0.5,
								borderColor: 'gray'
							}}
						>
							{'Thất trái'}
						</Text>
					</View>

					<View style={{ flex: 1 }}>
						{this.child_box('Dd 46±4 mm', new_kq.KQ_top_3)}
						{this.child_box('Ds 30±3 mm', new_kq.KQ_top_4)}
						{this.child_box('Vd101±17mm', new_kq.KQ_top_5)}
						{this.child_box('Vs37±9 mm', new_kq.KQ_top_6)}
						{this.child_box('%D 31±6', new_kq.KQ_top_7)}
						{this.child_box('EF 63±7 %', new_kq.KQ_top_8)}
					</View>
				</View>
				{this.box('ĐK TP', '28±3 mm', new_kq.KQ_top_9)}
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
					<View style={{ borderWidth: 0.5, borderColor: 'gray', padding: 5, height: '100%' }}>
						<Text
							style={{
								width: 90,
								textAlign: 'left',
								marginRight: 10,
								borderLeftWidth: 0.5,
								borderRightWidth: 0.5,
								borderColor: 'gray'
							}}
						>
							{'Bề dày VLT'}
						</Text>
					</View>

					<View style={{ flex: 1 }}>
						{this.child_box('Ttrg7,5±1 mm', new_kq.KQ_top_10)}
						{this.child_box('T thu 10±2 m', new_kq.KQ_top_11)}
					</View>
				</View>
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
					<View style={{ borderWidth: 0.5, borderColor: 'gray', padding: 5, height: '100%' }}>
						<Text
							style={{
								width: 90,
								textAlign: 'left',
								marginRight: 10,
								borderLeftWidth: 0.5,
								borderRightWidth: 0.5,
								borderColor: 'gray'
							}}
						>
							{'Bề dày TSTT'}
						</Text>
					</View>

					<View style={{ flex: 1 }}>
						{this.child_box('trg 7±1mm', new_kq.KQ_top_12)}
						{this.child_box('T thu 12±1mm', new_kq.KQ_top_13)}
					</View>
				</View>
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
					<View style={{ borderWidth: 0.5, borderColor: 'gray', padding: 5, height: '100%' }}>
						<Text
							style={{
								width: 90,
								textAlign: 'left',
								marginRight: 10,
								borderLeftWidth: 0.5,
								borderRightWidth: 0.5,
								borderColor: 'gray'
							}}
						>
							{'Di động'}
						</Text>
					</View>

					<View style={{ flex: 1 }}>
						{this.child_box('VEF 7±2 mm', new_kq.KQ_top_14)}
						{this.child_box('TSTT 10±1mm', new_kq.KQ_top_15)}
					</View>
				</View>
				<View style={{ flexDirection: 'row', borderWidth: 0.5, borderColor: 'gray' }}>
					<View
						style={{
							flex: 1,
							borderLeftWidth: 0.5,
							borderRightWidth: 0.5,
							borderColor: 'gray',
							padding: 5
						}}
					>
						<Text style={{}}>{new_kq.KQ_1}</Text>
					</View>
					<View
						style={{
							flex: 1,
							borderLeftWidth: 0.5,
							borderRightWidth: 0.5,
							borderColor: 'gray',
							padding: 5
						}}
					>
						<Text style={{}}>{new_kq.KQ_1_info}</Text>
					</View>
				</View>
				<View style={{ flexDirection: 'row', borderWidth: 0.5, borderColor: 'gray' }}>
					<View
						style={{
							flex: 1,
							borderLeftWidth: 0.5,
							borderRightWidth: 0.5,
							borderColor: 'gray',
							padding: 5
						}}
					>
						<Text style={{}}>{new_kq.KQ_2}</Text>
					</View>
					<View
						style={{
							flex: 1,
							borderLeftWidth: 0.5,
							borderRightWidth: 0.5,
							borderColor: 'gray',
							padding: 5
						}}
					>
						<Text style={{}}>{new_kq.KQ_2_info}</Text>
					</View>
				</View>
				<View style={{ flexDirection: 'row', borderWidth: 0.5, borderColor: 'gray' }}>
					<View
						style={{
							flex: 1,
							borderLeftWidth: 0.5,
							borderRightWidth: 0.5,
							borderColor: 'gray',
							padding: 5
						}}
					>
						<Text style={{}}>{new_kq.KQ_3}</Text>
					</View>
					<View
						style={{
							flex: 1,
							borderLeftWidth: 0.5,
							borderRightWidth: 0.5,
							borderColor: 'gray',
							padding: 5
						}}
					>
						<Text style={{}}>{new_kq.KQ_3_info}</Text>
					</View>
				</View>
				<View style={{ flexDirection: 'row', borderWidth: 0.5, borderColor: 'gray' }}>
					<View
						style={{
							flex: 1,
							borderLeftWidth: 0.5,
							borderRightWidth: 0.5,
							borderColor: 'gray',
							padding: 5
						}}
					>
						<Text style={{}}>{new_kq.KQ_4}</Text>
					</View>
					<View
						style={{
							flex: 1,
							borderLeftWidth: 0.5,
							borderRightWidth: 0.5,
							borderColor: 'gray',
							padding: 5
						}}
					>
						<Text style={{}}>{new_kq.KQ_4_info}</Text>
					</View>
				</View>
				<View style={{ flexDirection: 'row', borderWidth: 0.5, borderColor: 'gray' }}>
					<View
						style={{
							flex: 1,
							borderLeftWidth: 0.5,
							borderRightWidth: 0.5,
							borderColor: 'gray',
							padding: 5
						}}
					>
						<Text style={{}}>{new_kq.KQ_5and6}</Text>
					</View>
				</View>
			</View>
		);
	};
	view_ket_luan = () => {
		let data = this.props.route.params.item;
		console.log(data);
		let ket_qua_text = '';
		let ket_qua_doppler = null;

		if (data.kb_loai_cls == 'CDHAD') {
			ket_qua_doppler = this.create_ket_qua_doppler(data.kb_ket_qua_cls);
		} else {
			ket_qua_text =
				Platform.OS == 'android' ? data.kb_ket_qua_cls : this.create_ket_qua_text(data.kb_ket_qua_cls);
		}
		let ket_luan_text = data.kb_ket_luan_cls;

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
						<Text style={{ flex: 2, fontWeight: 'bold' }}>Tên CLS</Text>
						<View style={{ flex: 2 }}>
							<Text style={{ textAlign: 'right' }}>{data.kb_ten_cls}</Text>
						</View>
					</View>
					<View style={{ flexDirection: 'row', margin: 5 }}>
						<Text style={{ flex: 2, fontWeight: 'bold' }}>Mã CLS</Text>
						<View style={{ flex: 2 }}>
							<Text style={{ textAlign: 'right' }}>{data.kb_loai_cls}</Text>
						</View>
					</View>
					<View style={{ flexDirection: 'row', margin: 5 }}>
						<Text style={{ flex: 2, fontWeight: 'bold' }}>Phương pháp thực hiện</Text>
						<View style={{ flex: 2 }}>
							<Text style={{ textAlign: 'right' }}>{data.kb_phuong_phap_thuc_hien}</Text>
						</View>
					</View>
					<View style={{ flexDirection: 'row', margin: 5 }}>
						<Text style={{ flex: 2, fontWeight: 'bold' }}>Bác sĩ thực hiện</Text>
						<View style={{ flex: 2 }}>
							<Text style={{ textAlign: 'right' }}>{data.kb_ten_nguoi_thuc_hien}</Text>
						</View>
					</View>
					<View style={{ flexDirection: 'row', margin: 5 }}>
						<Text style={{ flex: 2, fontWeight: 'bold' }}>Kết quả</Text>
					</View>
					<View style={{ flexDirection: 'row', margin: 5 }}>
						{ket_qua_doppler ? ket_qua_doppler : <Text style={{}}>{ket_qua_text}</Text>}
					</View>
					{data.childrens ? (
						data.childrens.map((value, index) => {
							return (
								<View key={index + 'abc'} style={{ flexDirection: 'row', margin: 5 }}>
									<Text style={{ flex: 2 }}>
										{index + 1}. {value.kb_ten_cls}
									</Text>
									<View style={{ flex: 2 }}>
										<Text style={{ textAlign: 'right' }}>{value.kb_ket_qua_cls}</Text>
									</View>
								</View>
							);
						})
					) : null}
					<View style={{ flexDirection: 'row', margin: 5 }}>
						<Text style={{ flex: 2, fontWeight: 'bold' }}>Kết luận</Text>
					</View>
					<View style={{ flexDirection: 'row', margin: 5 }}>
						<Text style={{ flex: 2 }}>{ket_luan_text}</Text>
					</View>
					<View style={{ flexDirection: 'row', margin: 5 }}>
						<Text style={{ flex: 2, fontWeight: 'bold' }}>Lời dặn của BS</Text>
						<View style={{ flex: 2 }}>
							<Text style={{ textAlign: 'right' }}>{data.kb_loi_dan}</Text>
						</View>
					</View>
				</View>
			</View>
		);
	};
	render() {
		return (
			<MView>
				<MHeader onPress={() => this.props.navigation.pop()} text="Chi tiết cận lâm sàng" />

				<MAlert ref={(ref) => (this.malert = ref)} />
				<View>
					{this.view_ket_luan()}
					{this.props.getHinhAnhCanLamSangReducer.data.length > 0 ? (
						<View>
							<View style={[ styles.container, { marginBottom: width / 20 } ]}>
								<Text style={[ styles.title, { marginBottom: 10 } ]}>Chi tiết hình ảnh</Text>
							</View>
							{this.view_image()}
						</View>
					) : null}
				</View>

				<ImageView
					glideAlways
					animationType={'slide'}
					images={this.state.images}
					imageIndex={this.index_image}
					isVisible={this.state.is_view_image}
					onClose={() => this.setState({ is_view_image: false })}
				/>
			</MView>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		getHinhAnhCanLamSangReducer: state.getHinhAnhCanLamSangReducer
	};
};

export default connect(mapStateToProps, { getHinhAnhCanLamSangAction })(CLSDetail);
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
