import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import MView from '../../../components/MView';
import MHeader from '../../../components/MHeader';
import { styles } from './StylelocationbyX';
import {
	width,
	COLOR_PRIMARY,
	TEXT_COLOR,
	COLOR_WHITEGRAY,
	COLOR_BACKGROUND_TEXT_INPUT,
	COLOR_GRAY
} from '../../../utilities/config';
const location = require('../../../assets/img/location.png');
const map = require('../../../assets/img/map.png');
import { Input } from 'react-native-elements';
import { textFontSize } from '../../../utilities/Styles';
import NButton from '../../../components/NButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MAlert from '../../../components/MAlert';
import { connect } from 'react-redux';
import { createCapCuuAction } from '../../../redux/redux/createCapCuu';
class LocationbyMap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			my_address: '',
			ly_do: '',
			address_detail: '',
			my_location: this.props.route.params.my_location
		};
	}
	goi_cap_cuu = () => {
		let body = {
			lat: this.state.my_location.latitude,
			lng: this.state.my_location.longitude,
			ly_do: this.state.ly_do,
			address: this.state.my_address,
			address_detail: this.state.address_detail
		};
		if (this.state.my_address == '') {
			this.malert.showAlert('Bạn phải chọn vị trí đón', () => {});
		} else {
			this.props.createCapCuuAction(body);
		}
		console.log(body);
	};
	componentDidUpdate(PrevProps, PrevState) {
		if (this.props.createCapCuuReducer != PrevProps.createCapCuuReducer) {
			if (this.props.createCapCuuReducer.isSuccess) {
				this.malert.showAlert(
					'Bạn đã gọi cấp cứu thành công. Các bác sĩ của chúng tôi đang trên đường đến đón bạn',
					() => {
						this.props.navigation.pop();
						this.props.navigation.pop();
					}
				);
			} else {
				this.malert.showAlert(this.props.createCapCuuReducer.message, () => {});
			}
		}
	}
	render() {
		return (
			<MView>
				<MHeader
					onPress={() => {
						this.props.navigation.pop();
					}}
					text="Nhập vị trí"
				/>
				<KeyboardAwareScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }}>
					<View
						style={{
							marginTop: 20,
							minHeight: 55,
							paddingHorizontal: 10,
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							backgroundColor: 'white',
							width: width * 0.9,
							alignSelf: 'center',
							borderRadius: 5
						}}
					>
						<Image
							source={location}
							style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 10 }}
						/>
						{this.state.my_address == '' ? (
							<Text
								style={{
									color: 'red',
									flex: 1
								}}
							>
								Vui lòng ấn vào nút bản đồ bên cạnh
							</Text>
						) : (
							<Text
								style={{
									color: TEXT_COLOR,
									flex: 1
								}}
							>
								{this.state.my_address}
							</Text>
						)}

						<TouchableOpacity
							onPress={() => {
								this.props.navigation.navigate('PinonMap', {
									action: (data) => {
										this.setState({ my_address: data.my_address, my_location: data.my_location });
									},
									my_location: this.state.my_location
								});
							}}
						>
							<Image
								source={map}
								style={[ styles.image, { flex: 1, padding: 0, margin: 0, width: width / 15 } ]}
							/>
							<Text
								style={{
									fontSize: textFontSize * 0.7,
									textAlign: 'center',
									color: '#1393ea'
								}}
							>
								Bản đồ
							</Text>
						</TouchableOpacity>
					</View>

					<Text
						style={[
							styles.text,
							{
								marginHorizontal: width / 20,
								marginTop: width / 20,
								marginBottom: width / 40,
								fontSize: textFontSize * 1.1
							}
						]}
					>
						Thêm mô tả địa điểm đón, thông tin liên lạc
					</Text>
					<Input
						value={this.state.address_detail}
						onChangeText={(address_detail) => {
							this.setState({ address_detail });
						}}
						multiline
						containerStyle={styles.inputContainer}
						inputContainerStyle={styles.inputContainerStyle}
						inputStyle={styles.inputStyle}
						placeholder="VD: điểm mốc, số nhà, số điện thoại ..."
					/>
					<Text
						style={[
							styles.text,
							{
								marginHorizontal: width / 20,
								marginTop: width / 20,
								marginBottom: width / 40,
								fontSize: textFontSize * 1.1
							}
						]}
					>
						Tình trạng bệnh nhân
					</Text>
					<Input
						value={this.state.ly_do}
						onChangeText={(ly_do) => {
							this.setState({ ly_do });
						}}
						multiline
						containerStyle={styles.inputContainer}
						inputContainerStyle={styles.inputContainerStyle}
						inputStyle={styles.inputStyle}
						placeholder="Không tỉnh táo, đau dữ dội,..."
					/>
					<View style={{ position: 'absolute', bottom: 100, left: 0, width: width, alignSelf: 'center' }}>
						<NButton
							onPress={this.goi_cap_cuu}
							text="XÁC NHẬN GỌI CẤP CỨU"
							style={{ marginTop: width / 20 }}
							bgCl={COLOR_PRIMARY}
						/>
					</View>
				</KeyboardAwareScrollView>
				<MAlert ref={(ref) => (this.malert = ref)} />
			</MView>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		createCapCuuReducer: state.createCapCuuReducer
	};
};

export default connect(mapStateToProps, { createCapCuuAction })(LocationbyMap);
