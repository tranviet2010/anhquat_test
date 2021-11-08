import React, { Component } from 'react';
import MView from '../../../components/MView';
import MHeader from '../../../components/MHeader';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { textFontSize } from '../../../utilities/Styles';
import { TEXT_COLOR, width, COLOR_WHITEGRAY, COLOR_GRAY, COLOR_KETCHUP, height } from '../../../utilities/config';
import { Input } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import NButton, { NButton2 } from '../../../components/NButton';
import ImagePicker from 'react-native-image-crop-picker';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import { connect } from 'react-redux';
import { createNewExamineHistoryAction } from '../../../redux/redux/createNewExamineHistory';
import MAlert from '../../../components/MAlert';
import { dateDDMMYYYY } from '../../../utilities/StringHelper';
import ImageView from 'react-native-image-view';
import { BASE_API } from '../../../services/Services';

class ImageHistoryDetail extends Component {
	constructor(props) {
		super(props);
		this.index_image = 0;
		this.state = {
			item: this.props.route.params.item,
			is_view_image: false
		};
	}

	render() {
		console.log(this.state.item);

		const images = this.state.item.image.map((value, index) => {
			return {
				source: { uri: BASE_API + value },
				index: index
			};
		});
		return (
			<MView>
				<MHeader
					onPress={() => {
						this.props.navigation.pop();
					}}
					text="Chi tiết đợt khám"
				/>
				<ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
					<View style={styles.container}>
						<Text
							style={{
								color: TEXT_COLOR,
								fontSize: textFontSize * 1.2,
								marginBottom: 10,
								fontWeight: 'bold'
							}}
						>
							{this.state.item.title}
						</Text>
						<Input
							editable={false}
							onChangeText={(text) => {
								this.onChangeTitle(text);
							}}
							value={this.state.item.title}
							maxLength={50}
							containerStyle={styles.inputContainer}
							inputContainerStyle={styles.inputContainerStyle}
							inputStyle={styles.inputStyle}
							placeholder=""
						/>
					</View>
					<View style={styles.container}>
						<Text
							style={{
								color: TEXT_COLOR,
								fontSize: textFontSize * 1.2,
								marginBottom: 10,
								fontWeight: 'bold'
							}}
						>
							Bác sĩ điều trị
						</Text>
						<Input
							editable={false}
							onChangeText={(text) => {
								this.onChangeDoctor(text);
							}}
							autoCapitalize="words"
							value={this.state.item.doctor}
							maxLength={50}
							containerStyle={styles.inputContainer}
							inputContainerStyle={styles.inputContainerStyle}
							inputStyle={styles.inputStyle}
							placeholder=""
						/>
					</View>
					<View style={styles.container}>
						<Text
							style={{
								color: TEXT_COLOR,
								fontSize: textFontSize * 1.2,
								marginBottom: 10,
								fontWeight: 'bold'
							}}
						>
							Địa chỉ cơ sở khám
						</Text>
						<Input
							editable={false}
							onChangeText={(text) => {
								this.onChangePlace(text);
							}}
							value={this.state.item.address}
							maxLength={50}
							containerStyle={styles.inputContainer}
							inputContainerStyle={styles.inputContainerStyle}
							inputStyle={styles.inputStyle}
							placeholder=""
						/>
					</View>
					<View style={styles.container}>
						<Text
							style={{
								color: TEXT_COLOR,
								fontSize: textFontSize * 1.2,
								marginBottom: 10,
								fontWeight: 'bold'
							}}
						>
							Nội dung
						</Text>
						<Input
							editable={false}
							onChangeText={(text) => {
								this.onChangeContent(text);
							}}
							value={this.state.item.note}
							multiline={true}
							containerStyle={[ styles.inputContainer, { height: width / 4 } ]}
							inputContainerStyle={styles.inputContainerStyle}
							inputStyle={styles.inputStyle}
							placeholder=""
						/>
					</View>
					<View style={styles.container}>
						<Text
							style={{
								color: TEXT_COLOR,
								fontSize: textFontSize * 1.2,
								marginBottom: 10,
								fontWeight: 'bold'
							}}
						>
							Thời gian
						</Text>
						<TouchableOpacity
							onPress={() => {
								this.setState(
									{
										// showTimePicker: true
									}
								);
							}}
							style={[
								styles.inputContainer,
								{ height: 50, justifyContent: 'center', alignItems: 'center' }
							]}
						>
							<Text>{dateDDMMYYYY(this.state.item.thoi_gian)}</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.container}>
						<Text
							style={{
								color: TEXT_COLOR,
								fontSize: textFontSize * 1.2,
								marginBottom: 10,
								fontWeight: 'bold'
							}}
						>
							Ảnh kết quả
						</Text>
						<ScrollView
							ref={(ref) => {
								this.scrollView = ref;
							}}
							onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })}
							horizontal={true}
							style={{
								flexDirection: 'row',
								height: width / 2.7
							}}
						>
							{this.state.item.image.map((item, index) => {
								return (
									<View key={index + ''} style={{}}>
										{/* <TouchableOpacity
											onPress={() => {
												this.deleteImage(item.id);
											}}
											style={{
												backgroundColor: 'white',
												position: 'absolute',
												top: 10,
												right: 10,
												zIndex: 2,
												padding: 0,
												borderRadius: 20,
												justifyContent: 'center',
												alignItems: 'center'
											}}
										>
											<FontAwesome5Pro name="times-circle" size={20} color="red" />
										</TouchableOpacity> */}
										<TouchableOpacity
											onPress={() => {
												this.index_image = index;
												this.setState({ is_view_image: true });
											}}
										>
											<Image style={styles.pickedImg} source={{ uri: BASE_API + item }} />
										</TouchableOpacity>
									</View>
								);
							})}

							{/* {this.state.imgmax > 0 ? (
								<TouchableOpacity
									style={[
										styles.pickedImg,
										{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }
									]}
									onPress={() => {
										this.addImage();
									}}
								>
									<Text style={{ color: TEXT_COLOR, fontSize: textFontSize * 3 }}>+</Text>
								</TouchableOpacity>
							) : (
								<View />
							)} */}
						</ScrollView>
					</View>
					{/* <NButton2
						isLoading={this.props.createNewExamineHistoryReducer.isLoading}
						onPress={() => {
							this.submitHistory();
						}}
						text="Thêm mới"
						// style={{ height: width / 8 }}
						textStyle={{ color: 'white', fontSize: textFontSize * 1.2 }}
					/> */}
				</ScrollView>
				<MAlert ref={(ref) => (this.malert = ref)} />
				{this.state.showTimePicker ? (
					<DateTimePicker
						mode="date"
						testID="dateTimePicker2"
						value={this.state.time}
						defaultDate={this.state.time}
						maximumDate={new Date()}
						is24Hour={true}
						display="spinner"
						onChange={(event, selectedTime) => this.onChangeTime(event, selectedTime)}
					/>
				) : (
					<View />
				)}

				<ImageView
					glideAlways
					animationType={'slide'}
					images={images}
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
		createNewExamineHistoryReducer: state.createNewExamineHistoryReducer
	};
};

export default connect(mapStateToProps, { createNewExamineHistoryAction })(ImageHistoryDetail);

const styles = StyleSheet.create({
	container: {
		marginTop: width / 20,
		marginHorizontal: width / 20
	},
	inputContainer: {
		backgroundColor: 'white',
		marginHorizontal: width / 20,
		borderRadius: 5,
		height: width / 8,
		alignItems: 'center',
		alignSelf: 'center',
		width: width / 1.1
	},
	inputContainerStyle: {
		borderBottomWidth: 0,
		paddingHorizontal: 5
	},
	inputStyle: {
		fontSize: textFontSize * 1
	},
	addImgBtn: {
		backgroundColor: 'white',
		borderRadius: 5,
		padding: 10,
		width: width / 10,
		alignItems: 'center',
		justifyContent: 'center',
		height: width / 6,
		width: width / 8
	},
	pickedImg: {
		height: width / 3,
		width: width / 4,
		resizeMode: 'contain',
		marginRight: 15,
		marginTop: 15
	},
	delete: {
		fontSize: textFontSize * 1.5,
		color: COLOR_KETCHUP,
		position: 'absolute',
		right: 2,
		top: -10,
		zIndex: 9999
	}
});
