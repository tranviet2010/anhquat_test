import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import MView from '../../../components/MView';
import MHeader from '../../../components/MHeader';
import { COLOR_MINT, width, TEXT_COLOR, COLOR_PRIMARY, COLOR_BACKGROUND_TEXT_INPUT } from '../../../utilities/config';
import { textFontSize } from '../../../utilities/Styles';
import { view_status } from '../../../components/customize/MeetingItem';
import { connect } from 'react-redux';
import MAsyncStorage from '../../../utilities/MAsyncStorage';
import { dateDDMMYYYY, datehhmm } from '../../../utilities/StringHelper';
import MAlert from '../../../components/MAlert';
import { ActivityIndicator } from 'react-native-paper';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import NButton from '../../../components/NButton';
import { updateKhaiBaoYTeAction } from '../../../redux/redux/updateKhaiBaoYTe';

class EditKhaiBaoYTe extends Component {
	constructor(props) {
		super(props);

		this.props_data = this.props.route.params.data;
		this.khai_bao_y_te = this.props_data.to_khai_y_te;
		this.questions = this.props_data.to_khai_y_te.questions;
		this.question_1 = this.questions[0];
		this.question_2 = this.questions[1];
		this.question_1_1 = this.question_1.answers[0];
		this.question_1_2 = this.question_1.answers[1];
		this.question_1_3 = this.question_1.answers[2];
		this.question_1_4 = this.question_1.answers[3];
		this.question_1_5 = this.question_1.answers[4];
		this.question_1_6 = this.question_1.answers[5];
		this.question_1_7 = this.question_1.answers[6];
		this.question_2_1 = this.question_2.answers[0];
		this.question_2_2 = this.question_2.answers[1];
		this.question_2_3 = this.question_2.answers[2];
		this.question_2_4 = this.question_2.answers[3];
		this.question_2_5 = this.question_2.answers[4];

		this.state = {
			is_lich_hen: this.props.route.params.is_lich_hen,
			full_name: this.khai_bao_y_te.full_name,
			year_of_birth: this.khai_bao_y_te.year_of_birth,
			organization: '',
			address: this.khai_bao_y_te.address,
			phone: this.khai_bao_y_te.phone,
			question_1_name: this.question_1.name,
			question_1_1: {
				...this.question_1_1,
				value: this.get_value(this.question_1_1.value)
			},
			question_1_2: {
				...this.question_1_2,
				value: this.get_value(this.question_1_2.value)
			},
			question_1_3: {
				...this.question_1_3,
				value: this.get_value(this.question_1_3.value)
			},
			question_1_4: {
				...this.question_1_4,
				value: this.get_value(this.question_1_4.value)
			},
			question_1_5: {
				...this.question_1_5,
				value: this.get_value(this.question_1_5.value)
			},

			question_1_6: {
				...this.question_1_6,
				value: this.get_value(this.question_1_6.value)
			},

			question_1_7: {
				...this.question_1_7,
				value: this.get_value(this.question_1_7.value)
			},

			question_2_name: this.question_2.name,

			question_2_1: {
				...this.question_2_1,
				value: this.get_value(this.question_2_1.value)
			},
			question_2_2: {
				...this.question_2_2,
				value: this.get_value(this.question_2_2.value)
			},
			question_2_3: {
				...this.question_2_3,
				value: this.get_value(this.question_2_3.value)
			},
			question_2_4: {
				...this.question_2_4,
				value: this.get_value(this.question_2_4.value)
			},
			question_2_5: {
				...this.question_2_5,
				value: this.get_value(this.question_2_5.value)
			},
			data_submit: this.khai_bao_y_te
		};
	}
	get_value = (value) => {
		if (value) {
			return 1;
		} else {
			return 2;
		}
	};
	submit = () => {
		if (
			this.state.question_1_1.value == 0 ||
			this.state.question_1_2.value == 0 ||
			this.state.question_1_3.value == 0 ||
			this.state.question_1_4.value == 0 ||
			this.state.question_1_5.value == 0 ||
			this.state.question_1_6.value == 0 ||
			this.state.question_1_7.value == 0 ||
			this.state.question_2_1.value == 0 ||
			this.state.question_2_2.value == 0 ||
			this.state.question_2_3.value == 0 ||
			this.state.question_2_4.value == 0 ||
			this.state.question_2_5.value == 0
		) {
			this.malert.showAlert('Bạn phải trả lời hết tất cả các câu hỏi', () => {});
			return;
		}
		if (this.state.question_1_1.value == 1 && this.state.question_1_1.description == '') {
			this.malert.showAlert('Bạn phải ghi rõ đã đi đến nước nào', () => {});
			return;
		}
		if (this.state.question_1_2.value == 1 && this.state.question_1_2.description == '') {
			this.malert.showAlert('Bạn phải ghi rõ đã đi đến Xã/phường/Quận/huyện/tỉnh/TP nào', () => {});
			return;
		}
		let data = { ...this.state.data_submit };
		data.full_name = this.state.full_name;
		data.year_of_birth = this.state.year_of_birth;
		data.organization = this.state.organization;
		data.address = this.state.address;
		data.phone = this.state.phone;
		let questions = [];
		let answers_1 = [];
		answers_1.push({
			name: this.state.question_1_1.name,
			value: this.state.question_1_1.value == 1,
			description: this.state.question_1_1.description
		});
		answers_1.push({
			name: this.state.question_1_2.name,
			value: this.state.question_1_2.value == 1,
			description: this.state.question_1_2.description
		});
		answers_1.push({
			name: this.state.question_1_3.name,
			value: this.state.question_1_3.value == 1
		});
		answers_1.push({
			name: this.state.question_1_4.name,
			value: this.state.question_1_4.value == 1
		});
		answers_1.push({
			name: this.state.question_1_4.name,
			value: this.state.question_1_4.value == 1
		});
		answers_1.push({
			name: this.state.question_1_5.name,
			value: this.state.question_1_5.value == 1
		});
		answers_1.push({
			name: this.state.question_1_6.name,
			value: this.state.question_1_6.value == 1
		});
		answers_1.push({
			name: this.state.question_1_7.name,
			value: this.state.question_1_7.value == 1
		});
		let first = {
			name: this.state.question_1_name,
			answers: answers_1
		};
		let answers_2 = [];
		answers_2.push({
			name: this.state.question_2_1.name,
			value: this.state.question_2_1.value == 1
		});
		answers_2.push({
			name: this.state.question_2_2.name,
			value: this.state.question_2_2.value == 1
		});
		answers_2.push({
			name: this.state.question_2_3.name,
			value: this.state.question_2_3.value == 1
		});
		answers_2.push({
			name: this.state.question_2_4.name,
			value: this.state.question_2_4.value == 1
		});
		answers_2.push({
			name: this.state.question_2_4.name,
			value: this.state.question_2_4.value == 1
		});
		let second = {
			name: this.state.question_2_name,
			answers: answers_2
		};
		questions.push(first);
		questions.push(second);
		data.questions = questions;
		console.log({
			lich_hen_id: this.props_data._id,
			data
		});
		this.props.updateKhaiBaoYTeAction({
			lich_hen_id: this.props_data._id,
			data
		});
	};
	componentDidUpdate = (PrevProps) => {
		if (PrevProps.updateKhaiBaoYTeReducer != this.props.updateKhaiBaoYTeReducer) {
			this.props.navigation.pop();
		}
	};
	renderQuestion = (question, action, index) => {
		return (
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					marginBottom: 5,
					borderTopWidth: 0.3,
					borderColor: 'gray',
					paddingVertical: 5
				}}
			>
				<View style={styles.view_stt}>
					<Text style={styles.content_table}>{index}</Text>
				</View>
				<View style={[ styles.view_ask, { alignItems: 'flex-start' } ]}>
					<Text style={styles.content_table}>{question.name}</Text>
					{question.description || question.description == '' ? (
						<TextInput
							editable={false}
							style={styles.text_input}
							value={question.description}
							onChangeText={(text) => {
								let new_data = { ...question, description: text };
								action(new_data);
							}}
							placeholder={'Nhập tại đây'}
						/>
					) : null}
				</View>
				<View style={styles.view_yes}>
					{question.value == 1 ? (
						<TouchableOpacity disabled>
							<FontAwesome5Pro name={'check-circle'} size={20} color={COLOR_PRIMARY} />
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							disabled
							style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
							onPress={() => {
								let new_data = { ...question, value: 1 };
								action(new_data);
							}}
						>
							<FontAwesome5Pro name={'circle'} size={20} color={'gray'} />
						</TouchableOpacity>
					)}
				</View>
				<View style={styles.view_no}>
					{question.value == 2 ? (
						<TouchableOpacity disabled>
							<FontAwesome5Pro name={'check-circle'} size={20} color={COLOR_PRIMARY} />
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							disabled
							style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
							onPress={() => {
								let new_data = { ...question, value: 2 };
								action(new_data);
							}}
						>
							<FontAwesome5Pro name={'circle'} size={20} color={'gray'} />
						</TouchableOpacity>
					)}
				</View>
			</View>
		);
	};

	render() {
		return (
			<MView>
				<MHeader
					onPress={() => {
						this.props.navigation.pop();
					}}
					text="Khai báo y tế"
					rightComponent={null}
				/>
				<ScrollView>
					<View style={[ styles.container, { flex: 1, paddingBottom: 10 } ]}>
						<View style={styles.card}>
							<View style={{ alignItems: 'center', marginTop: 10 }}>
								<Text style={{ color: COLOR_PRIMARY, fontSize: textFontSize - 1, fontWeight: 'bold' }}>
									TỜ KHAI Y TẾ
								</Text>
								<Text style={{ color: COLOR_PRIMARY, fontSize: textFontSize - 1, fontWeight: 'bold' }}>
									SÀNG LỌC NHANH NGUY CƠ NHIỄM COVID-19
								</Text>
							</View>
							<View style={{ padding: 5 }}>
								<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
									<Text style={styles.titleText}>- Họ và tên: </Text>
									<Text style={styles.contentText}>{this.state.full_name}</Text>
								</View>
								<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
									<Text style={styles.titleText}>- Năm sinh: </Text>
									<Text style={styles.contentText}>{this.state.year_of_birth}</Text>
								</View>
								<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
									<Text style={styles.titleText}>- Cơ quan/ Tổ chức: </Text>
									<Text style={styles.contentText}>{this.state.organization}</Text>
								</View>
								<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
									<Text style={styles.titleText}>- Địa chỉ: </Text>
									<Text style={styles.contentText}>{this.state.address}</Text>
								</View>
								<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
									<Text style={styles.titleText}>- Điện thoại liên lạc: </Text>
									<Text style={styles.contentText}>{this.state.phone}</Text>
								</View>
							</View>
							<View style={{ padding: 5 }}>
								<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
									<Text style={[ styles.titleText, { fontWeight: 'bold' } ]}>
										{this.state.question_1_name}
									</Text>
								</View>
								<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
									<View style={styles.view_stt}>
										<Text style={styles.title_table}>TT</Text>
									</View>
									<View style={styles.view_ask}>
										<Text style={styles.title_table}>Yếu tố dịch tễ</Text>
									</View>
									<View style={styles.view_yes}>
										<Text style={styles.title_table}>Có</Text>
									</View>
									<View style={styles.view_no}>
										<Text style={styles.title_table}>Không</Text>
									</View>
								</View>
								{this.renderQuestion(
									this.state.question_1_1,
									(question_1_1) => this.setState({ question_1_1 }),
									1
								)}
								{this.renderQuestion(
									this.state.question_1_2,
									(question_1_2) => this.setState({ question_1_2 }),
									2
								)}
								{this.renderQuestion(
									this.state.question_1_3,
									(question_1_3) => this.setState({ question_1_3 }),
									3
								)}
								{this.renderQuestion(
									this.state.question_1_4,
									(question_1_4) => this.setState({ question_1_4 }),
									4
								)}
								{this.renderQuestion(
									this.state.question_1_5,
									(question_1_5) => this.setState({ question_1_5 }),
									5
								)}
								{this.renderQuestion(
									this.state.question_1_6,
									(question_1_6) => this.setState({ question_1_6 }),
									6
								)}
								{this.renderQuestion(
									this.state.question_1_7,
									(question_1_7) => this.setState({ question_1_7 }),
									7
								)}
							</View>
							<View style={{ padding: 5 }}>
								<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
									<Text style={[ styles.titleText, { fontWeight: 'bold' } ]}>
										{this.state.question_2_name}
									</Text>
								</View>
								<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
									<View style={styles.view_stt}>
										<Text style={styles.title_table}>TT</Text>
									</View>
									<View style={styles.view_ask}>
										<Text style={styles.title_table}>Dấu hiệu</Text>
									</View>
									<View style={styles.view_yes}>
										<Text style={styles.title_table}>Có</Text>
									</View>
									<View style={styles.view_no}>
										<Text style={styles.title_table}>Không</Text>
									</View>
								</View>
								{this.renderQuestion(
									this.state.question_2_1,
									(question_2_1) => this.setState({ question_2_1 }),
									1
								)}
								{this.renderQuestion(
									this.state.question_2_2,
									(question_2_2) => this.setState({ question_2_2 }),
									2
								)}
								{this.renderQuestion(
									this.state.question_2_3,
									(question_2_3) => this.setState({ question_2_3 }),
									3
								)}
								{this.renderQuestion(
									this.state.question_2_4,
									(question_2_4) => this.setState({ question_2_4 }),
									4
								)}
								{this.renderQuestion(
									this.state.question_2_5,
									(question_2_5) => this.setState({ question_2_5 }),
									5
								)}
							</View>
							<View style={{ padding: 5 }}>
								<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
									<Text style={[ styles.titleText, { fontWeight: 'bold' } ]}>
										Tôi xin cam kết những thông tin trên là đúng sự thật, tôi hiểu rằng nếu cung cấp
										sai thông tin có thể dẫn đến những hậu quả nghiêm trọng
									</Text>
								</View>
							</View>
							<View style={{ padding: 5, paddingHorizontal: 20 }}>
								<View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 5 }}>
									<Text style={[ styles.titleText ]}>Ngày {dateDDMMYYYY(new Date())}</Text>
								</View>
								<View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 5 }}>
									<Text style={[ styles.titleText, { fontWeight: 'bold' } ]}>NGƯỜI KÊ KHAI</Text>
								</View>
								<View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 5 }}>
									<Text style={[ styles.titleText, { fontWeight: 'bold' } ]}>
										{this.state.full_name}
									</Text>
								</View>
							</View>
						</View>
					</View>
				</ScrollView>

				{/* <NButton
					onPress={() => {
						this.submit();
					}}
					isLoading={this.state.is_loading_confirm}
					text="XÁC NHẬN KHAI BÁO"
					style={{}}
					bgCl={COLOR_PRIMARY}
				/> */}
				<MAlert ref={(ref) => (this.malert = ref)} />
			</MView>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		updateKhaiBaoYTeReducer: state.updateKhaiBaoYTeReducer
	};
};

export default connect(mapStateToProps, {
	updateKhaiBaoYTeAction
})(EditKhaiBaoYTe);

const styles = StyleSheet.create({
	text_input: {
		height: 35,
		width: '100%',
		backgroundColor: COLOR_BACKGROUND_TEXT_INPUT,
		borderRadius: 5,
		paddingHorizontal: 10,
		marginTop: 5
	},
	view_stt: {
		flex: 0.8,
		justifyContent: 'center',
		alignItems: 'center'
	},
	view_ask: {
		flex: 5,
		justifyContent: 'center',
		alignItems: 'center'
	},
	view_no: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	view_yes: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	title_table: {
		fontSize: textFontSize,
		color: TEXT_COLOR,
		fontWeight: 'bold'
	},
	content_table: {
		fontSize: textFontSize,
		color: TEXT_COLOR
	},
	container: {
		flex: 1,
		marginTop: 5,
		marginHorizontal: 5
	},
	title: {
		color: COLOR_MINT,
		fontSize: textFontSize,
		fontWeight: 'bold'
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	titleText: {
		fontSize: textFontSize,
		color: '#211f20'
	},
	contentText: {
		fontSize: textFontSize,
		color: TEXT_COLOR,
		fontWeight: 'bold'
	},
	card: {
		backgroundColor: 'white',
		marginTop: 0
	}
});
