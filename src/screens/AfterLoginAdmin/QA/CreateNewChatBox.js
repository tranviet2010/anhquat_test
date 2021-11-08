import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ScrollView, TextInput } from 'react-native';
import { GiftedChat, InputToolbar, Bubble, Send } from 'react-native-gifted-chat';
import MView from '../../../components/MView';
import { textFontSize } from '../../../utilities/Styles';
import { width, COLOR_PRIMARY } from '../../../utilities/config';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MHeader from '../../../components/MHeader';
import { connect } from 'react-redux';
import { getListChatAction, sendMessageChatAction } from '../../../redux/redux/chat';
import { BASE_API } from '../../../services/Services';
import { getUserInfoAction } from '../../../redux/redux/getUserInfo';

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
			newMessage: '',
			messages: [],
			params_list_message: this.params_list_message
		};
	}
	componentDidMount() {
		this.props.getListChatAction(this.params_list_message);
	}
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
			messages = messages.slice(this.state.messages.length);
			let data = messages.map((value, index) => {
				let sender = null;
				if (value.sender_admin && value.sender_admin.length > 0) {
					sender = value.sender_admin[0];
				}
				if (value.sender_client && value.sender_client.length > 0) {
					sender = value.sender_client[0];
				}
				return {
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
				};
			});
			this.onSend(data);
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

export default connect(mapStateToProps, { getListChatAction, sendMessageChatAction, getUserInfoAction })(
	CreateNewChatBox
);
