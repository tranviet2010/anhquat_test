export const GET_LIST_CHAT = 'GET_LIST_CHAT';
export const GET_LIST_CHAT_ERROR = 'GET_LIST_CHAT_ERROR';
export const GET_LIST_CHAT_SUCCESS = 'GET_LIST_CHAT_SUCCESS';

export const SEND_MESSAGE_CHAT = 'SEND_MESSAGE_CHAT';
export const SEND_MESSAGE_CHAT_ERROR = 'SEND_MESSAGE_CHAT_ERROR';
export const SEND_MESSAGE_CHAT_SUCCESS = 'SEND_MESSAGE_CHAT_SUCCESS';

export const SEND_IMAGE_CHAT = 'SEND_IMAGE_CHAT';
export const SEND_IMAGE_CHAT_ERROR = 'SEND_IMAGE_CHAT_ERROR';
export const SEND_IMAGE_CHAT_SUCCESS = 'SEND_IMAGE_CHAT_SUCCESS';

export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
import MAsyncStorage from '../../utilities/MAsyncStorage';

import { execute, Method } from '../../services/Services';
import { put } from 'redux-saga/effects';

const initialState = {
	getListChat: {
		isLoading: false,
		isSuccess: false,
		isError: false,
		data: {},
		canLoadMore: false
	},
	checkChatExist: {
		isLoading: false,
		isSuccess: false,
		isError: false,
		data: {},
		canLoadMore: false
	},
	createConversation: {
		isLoading: false,
		isSuccess: false,
		isError: false,
		data: {},
		canLoadMore: false
	},
	sendMessageChat: {
		isLoading: false,
		isSuccess: false,
		isError: false,
		data: {},
		canLoadMore: false
	},
	sendImageChat: {
		isLoading: false,
		isSuccess: false,
		isError: false,
		data: {},
		canLoadMore: false
	},
	listMessageChat: [],
	lastMessageReceived: null
};
export const chatReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_LIST_CHAT:
			return {
				...state,
				getListChat: {
					isLoading: true,
					data: state.getListChat.data
				}
			};
		case GET_LIST_CHAT_ERROR:
			return {
				...state,
				getListChat: {
					isLoading: false,
					isSuccess: false,
					isError: true,
					message: action.message
				}
			};
		case GET_LIST_CHAT_SUCCESS:
			return {
				...state,
				getListChat: {
					isLoading: false,
					isError: false,
					isSuccess: true,
					data: action.data,
					message: action.message
				},
				listMessageChat: action.isLoadMore ? [ ...state.listMessageChat, ...action.data ] : action.data
			};
		case SEND_MESSAGE_CHAT:
			return {
				...state,
				sendMessageChat: {
					isLoading: true,
					data: []
				}
			};
		case SEND_MESSAGE_CHAT_ERROR:
			return {
				...state,
				sendMessageChat: {
					isLoading: false,
					isSuccess: false,
					isError: true,
					message: action.message
				}
			};
		case SEND_MESSAGE_CHAT_SUCCESS:
			return {
				...state,
				sendMessageChat: {
					isLoading: false,
					isError: false,
					isSuccess: true,
					data: action.data,
					message: action.message
				},
				listMessageChat: [ { ...action.data.message, sender_admin: [] }, ...state.listMessageChat ]
			};
		case SEND_IMAGE_CHAT:
			return {
				...state,
				sendImageChat: {
					isLoading: true,
					data: []
				}
			};
		case SEND_IMAGE_CHAT_ERROR:
			return {
				...state,
				sendImageChat: {
					isLoading: false,
					isSuccess: false,
					isError: true,
					message: action.message
				}
			};
		case SEND_IMAGE_CHAT_SUCCESS:
			return {
				...state,
				sendImageChat: {
					isLoading: false,
					isError: false,
					isSuccess: true,
					data: action.data,
					message: action.message
				},
				listMessageChat: [ { ...action.data.message, sender_admin: [] }, ...state.listMessageChat ]
			};
		case RECEIVE_MESSAGE:
			return {
				...state,
				listMessageChat: [ action.data, ...state.listMessageChat ],
				lastMessageReceived: action.data
			};
		default:
			return state;
	}
};
export const receiveMessageAction = (data) => {
	return {
		type: RECEIVE_MESSAGE,
		data
	};
};
export const getListChatAction = (body) => {
	return {
		type: GET_LIST_CHAT,
		body
	};
};

export function* getListChatService(body) {
	return yield execute('/account/chat', Method.GET, body);
}

export function* getListChatSaga(action) {
	try {
		const response = yield getListChatService(action.body);
		console.log('getListChat', response);
		if (response.status == 200) {
			if (response.data.code == 200) {
				yield put({
					type: GET_LIST_CHAT_SUCCESS,
					data: response.data.data.message,
					message: response.data.message,
					canLoadMore: response.data.pages > response.data.current,
					isLoadMore: action.body.page > 1
				});
			} else {
				yield put({
					type: GET_LIST_CHAT_ERROR,
					message: response.data.message
				});
			}
		} else {
			yield put({
				type: GET_LIST_CHAT_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: GET_LIST_CHAT_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}

export const sendMessageChatAction = (body) => {
	return {
		type: SEND_MESSAGE_CHAT,
		body
	};
};

export const sendImageChatAction = (body) => {
	return {
		type: SEND_IMAGE_CHAT,
		body
	};
};
export function* sendMessageChatService(body) {
	if (body.is_conversation_exist) {
		return yield execute('/account/chat', Method.PUT, body);
	} else {
		return yield execute('/account/chat', Method.POST, body);
	}
}
export function* sendImageChatService(body) {
	return yield execute('/account/chat/image', Method.POST, body);
}

export function* sendMessageChatSaga(action) {
	try {
		const response = yield sendMessageChatService(action.body);
		console.log('sendMessageChat', response);
		if (response.status == 200) {
			if (response.data.code == 200) {
				yield put({
					type: SEND_MESSAGE_CHAT_SUCCESS,
					data: response.data.conversation,
					message: response.data.message
				});
			} else {
				yield put({
					type: SEND_MESSAGE_CHAT_ERROR,
					message: response.data.message
				});
			}
		} else {
			yield put({
				type: SEND_MESSAGE_CHAT_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: SEND_MESSAGE_CHAT_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
export function* sendImageChatSaga(action) {
	try {
		const response = yield sendImageChatService(action.body);
		console.log('sendImageChat', response);
		if (response.status == 200) {
			if (response.data.code == 200) {
				yield put({
					type: SEND_IMAGE_CHAT_SUCCESS,
					data: response.data.conversation,
					message: response.data.message
				});
			} else {
				yield put({
					type: SEND_IMAGE_CHAT_ERROR,
					message: response.data.message
				});
			}
		} else {
			yield put({
				type: SEND_IMAGE_CHAT_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: SEND_IMAGE_CHAT_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
