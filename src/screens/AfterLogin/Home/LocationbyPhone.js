import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import MView from '../../../components/MView';
import MHeader from '../../../components/MHeader';
import { styles } from './StylelocationbyX';
import { width, COLOR_PRIMARY } from '../../../utilities/config';
const location = require('../../../assets/img/location.png');
import { Input } from 'react-native-elements';
import { textFontSize } from '../../../utilities/Styles';
import NButton from '../../../components/NButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { createCapCuuAction } from '../../../redux/redux/createCapCuu';
import MAlert from '../../../components/MAlert';

class LocationbyPhone extends Component {
	constructor(props) {
		super(props);
		this.state = {
			my_address: this.props.route.params.my_address,
			address_detail: '',
			ly_do: '',
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
		console.log(body);
		this.props.createCapCuuAction(body);
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
					text="Vị trí theo điện thoại"
				/>
				<KeyboardAwareScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }}>
					<View style={styles.container}>
						<Image source={location} style={styles.image} />
						<Text style={[ styles.text, { flex: 9 } ]}>{this.state.my_address}</Text>
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
							text="Xác nhận gọi cấp cứu"
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

export default connect(mapStateToProps, { createCapCuuAction })(LocationbyPhone);
