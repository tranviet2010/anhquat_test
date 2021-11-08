import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { GiftedChat, InputToolbar, Bubble, Send } from 'react-native-gifted-chat';
import MView from '../../../components/MView';
import { textFontSize } from '../../../utilities/Styles';
import {
	width,
	COLOR_PRIMARY,
	COLOR_WHITEGRAY,
	TEXT_COLOR,
	COLOR_MINT,
	COLOR_KETCHUP
} from '../../../utilities/config';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MHeader from '../../../components/MHeader';
import { connect } from 'react-redux';
import { getListChatAction, sendMessageChatAction, sendImageChatAction } from '../../../redux/redux/chat';
import { BASE_API } from '../../../services/Services';
import { getUserInfoAction } from '../../../redux/redux/getUserInfo';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
const camera = require('../../../assets/img/img_account/may_anh_acc.png');

import 'dayjs/locale/vi';
import { ActivityIndicator } from 'react-native-paper';
class CreateNewChatBox extends Component {
	constructor(props) {
		super(props);
		this.params_list_message = {
			page: 1,
			perPage: 200
		};
		this.state = {
			showModal: false,
			newMessage: '',
			messages: [],
			params_list_message: this.params_list_message
		};
	}
	componentDidMount() {
		this.props.getListChatAction(this.params_list_message);
	}
	read_message = () => {
		fetch(BASE_API + 'account/chat', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + this.props.userInfoReducer.data.token
			}
		})
			.then((response) => response.json())
			.then((responseJson) => {
				console.log(responseJson);
			})
			.catch((error) => {
				console.error(error);
			});
	};
	chooseAvatarFromLib = () => {
		ImagePicker.openPicker({
			width: 300,
			height: 300,
			multiple: true,
			maxFiles: 5
		})
			.then((images) => {
				var formdata = new FormData();
				for (let index = images.length - 1; index >= 0; index--) {
					formdata.append('image', {
						uri: images[index].path,
						type: images[index].mime,
						name: 'image.jpg'
					});
				}
				console.log('aaaaaaaaaaaa', images);
				this.props.sendImageChatAction(formdata);
				this.setModalShow();
			})
			.catch((error) => {
				this.setModalShow();
			});
	};

	chooseAvatarbyTakePhoto = () => {
		setTimeout(() => {
			ImagePicker.openCamera({
				width: 300,
				height: 400,
				cropping: true
			})
				.then((image) => {
					var formdata = new FormData();
					formdata.append('image', {
						uri: image.path,
						type: image.mime,
						name: 'avatar.jpg'
					});
					this.props.sendImageChatAction(formdata);
					this.setModalShow();
				})
				.catch((error) => {
					this.setModalShow();
				});
		}, 1000);
	};

	setModalShow = () => {
		this.setState({
			showModal: !this.state.showModal
		});
	};
	modal = () => {
		return (
			<View>
				<Modal
					animationType="fade"
					transparent={true}
					onBackdropPress={() => {
						this.setModalShow();
					}}
					isVisible={this.state.showModal}
				>
					<View
						style={{
							backgroundColor: 'white',
							height: width / 1.8,
							width: width / 1.5,
							alignSelf: 'center',
							borderRadius: 5,
							alignItems: 'center',
							justifyContent: 'space-between',
							paddingVertical: 10
						}}
					>
						<Text style={{ fontSize: textFontSize * 1.2, color: COLOR_MINT }}>Chọn ảnh gửi</Text>
						<TouchableOpacity
							style={{
								backgroundColor: COLOR_WHITEGRAY,
								padding: 10,
								width: width / 1.7,
								alignSelf: 'center',
								alignItems: 'center',
								borderRadius: 5
							}}
							onPress={() => {
								this.chooseAvatarbyTakePhoto();
							}}
						>
							<Text style={{ fontSize: textFontSize * 1.1, color: TEXT_COLOR }}>Chụp ảnh</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								backgroundColor: COLOR_WHITEGRAY,
								padding: 10,
								width: width / 1.7,
								alignSelf: 'center',
								alignItems: 'center',
								borderRadius: 5
							}}
							onPress={() => {
								this.chooseAvatarFromLib();
							}}
						>
							<Text style={{ fontSize: textFontSize * 1.1, color: TEXT_COLOR }}>Chọn từ thư viện</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								backgroundColor: COLOR_KETCHUP,
								padding: 10,
								width: width / 1.7,
								alignSelf: 'center',
								alignItems: 'center',
								borderRadius: 5
							}}
							onPress={() => {
								this.setModalShow();
							}}
						>
							<Text style={{ fontSize: textFontSize * 1.1, color: 'white' }}>Huỷ</Text>
						</TouchableOpacity>
					</View>
				</Modal>
			</View>
		);
	};
	is_me = (id) => {
		if (this.props.userInfoReducer.data.user._id == id) {
			return true;
		} else {
			return false;
		}
	};
	make_data_message = () => {
		let messages = [ ...this.props.chatReducer.listMessageChat ];
		if (messages.length > 0) {
			let new_messages = [];
			if (this.state.messages.length > 0) {
				let last_state_message_id = this.state.messages[0]._id;
				for (let n = 0; n < messages.length; n++) {
					if (messages[n]._id != last_state_message_id) {
						new_messages.push(messages[n]);
					} else {
						break;
					}
				}
			} else {
				new_messages = messages;
			}

			console.log(new_messages);
			console.log('new_messages');
			let data_send = [];
			let data = new_messages.map((value, index) => {
				let sender = null;
				if (value.sender_admin && value.sender_admin.length > 0) {
					sender = value.sender_admin[0];
				}
				if (value.sender_client && value.sender_client.length > 0) {
					sender = value.sender_client[0];
				}
				if (value.images.length > 0) {
					for (let y = 0; y < value.images.length; y++) {
						data_send.push({
							_id: value._id + y,
							image: BASE_API + value.images[y],
							createdAt: new Date(value.createdAt),
							user: {
								_id: sender._id,
								name: sender.full_name,
								avatar: sender.image
									? { uri: BASE_API + sender.image }
									: require('../../../assets/img/logo_start.png')
							}
						});
					}
				} else {
					data_send.push({
						_id: value._id,
						text: value.content,
						createdAt: new Date(value.createdAt),
						user: {
							_id: sender._id,
							name: sender.full_name,
							avatar: sender.image
								? { uri: BASE_API + sender.image }
								: require('../../../assets/img/logo_start.png')
						}
					});
				}
			});

			this.onSend(data_send);
		} else {
			this.onSend([
				{
					_id: 1,
					text: 'Xin chào Nguyễn Anh Quất! Chúng tôi có thể giúp gì cho bạn',
					createdAt: new Date(),
					user: {
						_id: 2,
						name: 'BVDK Anh Quat',
						avatar: require('../../../assets/img/logo_start.png')
					}
				}
			]);
		}
	};
	componentDidUpdate(PrevProps) {
		if (this.props.chatReducer.listMessageChat != PrevProps.chatReducer.listMessageChat) {
			this.make_data_message();
		}
		if (this.props.chatReducer.lastMessageReceived != PrevProps.chatReducer.lastMessageReceived) {
			this.read_message();
		}
	}
	customtInputToolbar = (props) => {
		return (
			<View style={styles.ChatMessageSytemMessageContainer}>
				<Text style={styles.ChatMessageSystemMessageText}>
					Your chat is secured. Remember to be cautious about what you share with others.
				</Text>
			</View>
		);
	};

	onSend(messages = []) {
		console.log(messages);
		this.setState((previousState) => ({
			messages: GiftedChat.append(previousState.messages, messages)
		}));
	}
	render() {
		return (
			<MView>
				<MHeader
					onPress={() => {
						this.props.navigation.pop();
						this.props.getUserInfoAction();
					}}
					text="Hỏi đáp, tư vấn"
				/>
				{this.modal()}

				{this.props.chatReducer.getListChat.isLoading ? (
					<ActivityIndicator
						size="small"
						color={COLOR_PRIMARY}
						style={{ marginTop: 200, alignSelf: 'center' }}
					/>
				) : null}
				<GiftedChat
					keyboardShouldPersistTaps="handled"
					textInputProps={{
						placeholder: 'Nhập tin nhắn'
					}}
					renderInputToolbar={(props) => {
						return (
							<View style={{ flexDirection: 'row', height: 50 }}>
								<View style={{ flex: 1 }}>
									<InputToolbar {...props} />
								</View>
								<TouchableOpacity onPress={() => this.setModalShow()} style={styles.cameraContainer}>
									<Image style={styles.camera} source={camera} />
								</TouchableOpacity>
							</View>
						);
					}}
					renderSend={(props) => (
						<Send {...props}>
							<Text style={{ margin: 10, fontSize: 15, color: 'blue' }}>Gửi</Text>
						</Send>
					)}
					locale={'vi'}
					isTyping={true}
					renderBubble={(props) => {
						return (
							<View>
								<Bubble
									{...props}
									renderUsernameOnMessage={true}
									wrapperStyle={{
										right: {
											borderRadius: 5,
											backgroundColor: '#009887'
										},
										left: {
											borderRadius: 5,
											backgroundColor: 'white'
										}
									}}
								/>
							</View>
						);
					}}
					renderSystemMessage={(props) => this.customtInputToolbar(props)}
					messages={this.state.messages}
					onSend={(messages) => {
						this.props.sendMessageChatAction({
							content: messages[0].text,
							is_conversation_exist: this.props.chatReducer.listMessageChat.length > 0
						});
					}}
					user={{ _id: this.props.userInfoReducer.data.user._id }}
				/>
			</MView>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		chatReducer: state.chatReducer,
		userInfoReducer: state.userInfoReducer
	};
};

export default connect(mapStateToProps, {
	getListChatAction,
	sendMessageChatAction,
	getUserInfoAction,
	sendImageChatAction
})(CreateNewChatBox);

const styles = StyleSheet.create({
	camera: {
		width: 30,
		height: 30,
		resizeMode: 'contain',
		tintColor: COLOR_PRIMARY
	},
	cameraContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 5
	}
});
