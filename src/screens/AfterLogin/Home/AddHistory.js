import React, { Component } from 'react';
import MView from '../../../components/MView';
import MHeader from '../../../components/MHeader';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { textFontSize } from '../../../utilities/Styles';
import { TEXT_COLOR, width, COLOR_WHITEGRAY, COLOR_GRAY, COLOR_KETCHUP, height } from '../../../utilities/config';
import { Input } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import NButton, { NButton2 } from '../../../components/NButton';
import ImagePicker from 'react-native-image-crop-picker';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import { connect } from 'react-redux';
import { createNewExamineHistoryAction } from '../../../redux/redux/createNewExamineHistory';
import MAlert from '../../../components/MAlert';
import { dateDDMMYYYY } from '../../../utilities/StringHelper';
import ImageView from 'react-native-image-view';

class AddHistory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: moment(new Date()).format('DD/MM/YYYY'),
			showDatePicker: false,
			showTimePicker: false,
			bodyDate: moment(new Date()).format('YYYY-M-DD'),
			title: '',
			content: '',
			doctor: '',
			place: '',
			imageData: [],
			imgId: 0,
			imgmax: 5,
			showTimePicker: false,
			thoi_gian: new Date(),
			is_view_image: false
		};
	}

	onChangeTitle = (title) => {
		this.setState({
			title
		});
	};
	onChangeDoctor = (doctor) => {
		this.setState({
			doctor
		});
	};
	onChangePlace = (place) => {
		this.setState({
			place
		});
	};

	onChangeContent = (content) => {
		this.setState({
			content
		});
	};

	addImage = () => {
		const { imageData } = this.state;
		ImagePicker.openPicker({
			width: 300,
			height: 400,
			cropping: true,
			multiple: true
		}).then((image) => {
			console.log(image);
			this.setState({
				imageData: [ ...this.state.imageData, ...image ],
				imgId: this.state.imgId + image.length,
				imgmax: this.state.imgmax - image.length
			});
		});
	};

	deleteImage = (id) => {
		const { imageData } = this.state;
		let index;
		let i = 0;

		for (i = 0; i < imageData.length; i++) {
			if (imageData[i].id === id) {
				index = i;
				break;
			}
		}

		imageData.splice(index, 1);
		this.setState({ imageData, imgmax: this.state.imgmax + 1 });
	};

	submitHistory = () => {
		const formdata = new FormData();
		const { imageData, title, content, bodyDate, doctor, place } = this.state;
		let i = 0;

		formdata.append('note', content);
		formdata.append('title', title);
		formdata.append('doctor', doctor);
		formdata.append('address', place);
		formdata.append('thoi_gian', bodyDate);
		for (i = 0; i < imageData.length; i++) {
			formdata.append('image', {
				uri: imageData[i].path,
				type: imageData[i].mime,
				name: 'image_' + i + '.jpg'
			});
		}
		this.props.createNewExamineHistoryAction(formdata);
	};

	componentDidUpdate(PrevProps, PrevState) {
		if (this.props.createNewExamineHistoryReducer != PrevProps.createNewExamineHistoryReducer) {
			if (this.props.createNewExamineHistoryReducer.isSuccess) {
				this.malert.showAlert('Thêm mới thành công', () => {
					this.props.navigation.goBack();
				});
			} else if (this.props.createNewExamineHistoryReducer.isError) {
				this.malert.showAlert(this.props.createNewExamineHistoryReducer.message, () => {});
			}
		}
	}
	onChangeTime = (selectedTime) => {
		let bodyDate;
		if (selectedTime) {
			bodyDate = moment(selectedTime).format('YYYY-M-DD');
		}
		this.setState({ thoi_gian: selectedTime, showTimePicker: false, bodyDate: bodyDate });
	};
	render() {
		const images = this.state.imageData.map((value, index) => {
			return {
				source: { uri: value.path },
				index: index
			};
		});
		return (
			<MView>
				<MHeader
					onPress={() => {
						this.props.navigation.pop();
					}}
					text="Thêm mới lịch sử khám"
				/>
				<ScrollView>
					<View style={styles.container}>
						<Text
							style={{
								color: TEXT_COLOR,
								fontSize: textFontSize * 1.2,
								marginBottom: 10,
								fontWeight: 'bold'
							}}
						>
							Tên đợt khám
						</Text>
						<Input
							onChangeText={(text) => {
								this.onChangeTitle(text);
							}}
							value={this.state.title}
							maxLength={50}
							containerStyle={styles.inputContainer}
							inputContainerStyle={styles.inputContainerStyle}
							inputStyle={styles.inputStyle}
							placeholder="Khám mắt tại bệnh viện Bạch Mai (tối đa 50 kí tự) "
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
							onChangeText={(text) => {
								this.onChangeDoctor(text);
							}}
							autoCapitalize="words"
							value={this.state.doctor}
							maxLength={50}
							containerStyle={styles.inputContainer}
							inputContainerStyle={styles.inputContainerStyle}
							inputStyle={styles.inputStyle}
							placeholder="Nguyễn Văn A"
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
							onChangeText={(text) => {
								this.onChangePlace(text);
							}}
							value={this.state.place}
							maxLength={50}
							containerStyle={styles.inputContainer}
							inputContainerStyle={styles.inputContainerStyle}
							inputStyle={styles.inputStyle}
							placeholder="Bệnh viện Anh Quất, Tân Yên, Băc Giang"
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
							onChangeText={(text) => {
								this.onChangeContent(text);
							}}
							value={this.state.content}
							multiline={true}
							containerStyle={[ styles.inputContainer, { height: width / 4 } ]}
							inputContainerStyle={styles.inputContainerStyle}
							inputStyle={styles.inputStyle}
							placeholder="Khám mắt ngày 12/8/2020 tại khoa Mắt bệnh viện Bạch Mai"
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
								this.setState({
									showTimePicker: true
								});
							}}
							style={[
								styles.inputContainer,
								{ height: 50, justifyContent: 'center', alignItems: 'center' }
							]}
						>
							<Text>{dateDDMMYYYY(this.state.thoi_gian)}</Text>
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
							Thêm ảnh
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
							{this.state.imageData.map((item, index) => {
								return (
									<View key={item.path} style={{}}>
										<TouchableOpacity
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
										</TouchableOpacity>
										<TouchableOpacity
											onPress={() => {
												this.index_image = index;
												this.setState({ is_view_image: true });
											}}
										>
											<Image key={item.id} style={styles.pickedImg} source={{ uri: item.path }} />
										</TouchableOpacity>
									</View>
								);
							})}

							{this.state.imgmax > 0 ? (
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
							)}
						</ScrollView>
					</View>
					<NButton2
						isLoading={this.props.createNewExamineHistoryReducer.isLoading}
						onPress={() => {
							this.submitHistory();
						}}
						text="Thêm mới"
						// style={{ height: width / 8 }}
						textStyle={{ color: 'white', fontSize: textFontSize * 1.2 }}
					/>
				</ScrollView>
				<MAlert ref={(ref) => (this.malert = ref)} />
				<DateTimePicker
					locale="vi-VN"
					mode={'date'}
					confirmTextIOS="Xác nhận"
					cancelTextIOS="Huỷ"
					display="spinner"
					headerTextIOS="Chọn thời gian"
					date={this.state.thoi_gian}
					timePickerModeAndroid="spinner"
					maximumDate={new Date()}
					onConfirm={(date) => {
						this.onChangeTime(date);
					}}
					onCancel={() => this.setState({ showTimePicker: false })}
					isVisible={this.state.showTimePicker}
				/>

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

export default connect(mapStateToProps, { createNewExamineHistoryAction })(AddHistory);

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
