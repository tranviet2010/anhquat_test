export const DELETE_DETAIL_NOTIFICATION = 'DELETE_DETAIL_NOTIFICATION';
export const DELETE_DETAIL_NOTIFICATION_ERROR = 'DELETE_DETAIL_NOTIFICATION_ERROR';
export const DELETE_DETAIL_NOTIFICATION_SUCCESS = 'DELETE_DETAIL_NOTIFICATION_SUCCESS';
import { execute, Method } from '../../services/Services';
import { put } from 'redux-saga/effects';

export const deleteDetailNotificationAction = (body) => {
	return {
		type: DELETE_DETAIL_NOTIFICATION,
		body
	};
};

const initialState = {
	isLoading: false,
	isSuccess: false,
	isError: false,
	data: {}
};

export const deleteDetailNotificationReducer = (state = initialState, action) => {
	switch (action.type) {
		case DELETE_DETAIL_NOTIFICATION:
			return {
				isLoading: true,
				data: {}
			};
		case DELETE_DETAIL_NOTIFICATION_ERROR:
			return {
				...state,
				isLoading: false,
				isSuccess: false,
				isError: true,
				message: action.message
			};
		case DELETE_DETAIL_NOTIFICATION_SUCCESS:
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

export function* deleteDetailNotificationService(id) {
	console.log('Service', id);
	return yield execute('/account/notifications/' + id, Method.DELETE, {});
}

export function* deleteDetailNotificationSaga(action) {
	try {
		const response = yield deleteDetailNotificationService(action.body);
		console.log('deleteDetailNotification', response);
		if (response.status < 400) {
			if (response.data.code == 200) {
				yield put({
					type: DELETE_DETAIL_NOTIFICATION_SUCCESS,
					data: response.data,
					message: response.data.message
				});
			} else {
				yield put({
					type: DELETE_DETAIL_NOTIFICATION_ERROR,
					message: response.data.message
				});
			}
		} else {
			yield put({
				type: DELETE_DETAIL_NOTIFICATION_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: DELETE_DETAIL_NOTIFICATION_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
