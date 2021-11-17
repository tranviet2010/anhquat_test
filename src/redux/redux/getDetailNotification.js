export const GET_DETAIL_NOTIFICATION = 'GET_DETAIL_NOTIFICATION';
export const GET_DETAIL_NOTIFICATION_ERROR = 'GET_DETAIL_NOTIFICATION_ERROR';
export const GET_DETAIL_NOTIFICATION_SUCCESS = 'GET_DETAIL_NOTIFICATION_SUCCESS';
import { execute, Method } from '../../services/Services';
import { put } from 'redux-saga/effects';

export const getDetailNotificationAction = (body) => {
	return {
		type: GET_DETAIL_NOTIFICATION,
		body
	};
};

const initialState = {
	isLoading: false,
	isSuccess: false,
	isError: false,
	data: {},
	canLoadMore: false
};

export const getDetailNotificationReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_DETAIL_NOTIFICATION:
			return {
				isLoading: true,
				data: state.data
			};
		case GET_DETAIL_NOTIFICATION_ERROR:
			return {
				...state,
				isLoading: false,
				isSuccess: false,
				isError: true,
				message: action.message
			};
		case GET_DETAIL_NOTIFICATION_SUCCESS:
			return {
				...state,
				isLoading: false,
				isError: false,
				isSuccess: true,
				data: action.isLoadMore ? [ ...state.data, ...action.data ] : action.data,
				message: action.message
			};
		default:
			return state;
	}
};

export function* getDetailNotificationService(id) {
	return yield execute('/account/notifications/' + id, Method.GET, {});
}

export function* getDetailNotificationSaga(action) {
	try {
		const response = yield getDetailNotificationService(action.body);
		console.log('getDetailNotification', response);
		if (response.status < 400) {
			if (response.data.code == 200) {
				yield put({
					type: GET_DETAIL_NOTIFICATION_SUCCESS,
					data: response.data.data.notification,
					message: response.data.message,
					canLoadMore: response.data.pages > response.data.current,
					isLoadMore: action.body.page > 1
				});
			} else {
				yield put({
					type: GET_DETAIL_NOTIFICATION_ERROR,
					message: response.data.message
				});
			}
		} else {
			yield put({
				type: GET_DETAIL_NOTIFICATION_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: GET_DETAIL_NOTIFICATION_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
