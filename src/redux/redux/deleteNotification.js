export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION';
export const DELETE_NOTIFICATION_ERROR = 'DELETE_NOTIFICATION_ERROR';
export const DELETE_NOTIFICATION_SUCCESS = 'DELETE_NOTIFICATION_SUCCESS';
import { execute, Method } from '../../services/Services';
import { put } from 'redux-saga/effects';

export const deleteNotificationAction = (body) => {
	return {
		type: DELETE_NOTIFICATION,
		body
	};
};

const initialState = {
	isLoading: false,
	isSuccess: false,
	isError: false,
	data: {}
};

export const deleteNotificationReducer = (state = initialState, action) => {
	switch (action.type) {
		case DELETE_NOTIFICATION:
			return {
				isLoading: true,
				data: {}
			};
		case DELETE_NOTIFICATION_ERROR:
			return {
				...state,
				isLoading: false,
				isSuccess: false,
				isError: true,
				message: action.message
			};
		case DELETE_NOTIFICATION_SUCCESS:
			return {
				...state,
				isLoading: false,
				isError: false,
				isSuccess: true,
				data: action.data,
				message: action.message
			};
		default:
			return state;
	}
};

export function* deleteNotificationService(body) {
	console.log('Service', body);
	return yield execute('/account/notifications', Method.DELETE, body);
}

export function* deleteNotificationSaga(action) {
	try {
		const response = yield deleteNotificationService(action.body);
		console.log('deleteNotification', response);
		if (response.status < 400) {
			if (response.data.code == 200) {
				yield put({
					type: DELETE_NOTIFICATION_SUCCESS,
					data: response.data,
					message: response.data.message
				});
			} else {
				yield put({
					type: DELETE_NOTIFICATION_ERROR,
					message: response.data.message
				});
			}
		} else {
			yield put({
				type: DELETE_NOTIFICATION_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: DELETE_NOTIFICATION_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
