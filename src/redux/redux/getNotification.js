export const GET_NOTIFICATION = 'GET_NOTIFICATION';
export const GET_NOTIFICATION_ERROR = 'GET_NOTIFICATION_ERROR';
export const GET_NOTIFICATION_SUCCESS = 'GET_NOTIFICATION_SUCCESS';
import { execute, Method } from '../../services/Services';
import { put } from 'redux-saga/effects';

export const getNotificationAction = (body) => {
	return {
		type: GET_NOTIFICATION,
		body
	};
};

const initialState = {
	isLoading: false,
	isSuccess: false,
	isError: false,
	data: [],
	canLoadMore: false
};

export const getNotificationReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_NOTIFICATION:
			return {
				isLoading: true,
				data: state.data
			};
		case GET_NOTIFICATION_ERROR:
			return {
				...state,
				isLoading: false,
				isSuccess: false,
				isError: true,
				message: action.message
			};
		case GET_NOTIFICATION_SUCCESS:
			return {
				...state,
				isLoading: false,
				isError: false,
				isSuccess: true,
				data: action.isLoadMore ? [ ...state.data, ...action.data ] : action.data,
				message: action.message,
				canLoadMore: action.canLoadMore
			};
		default:
			return state;
	}
};

export function* getNotificationService(body) {
	return yield execute('/account/notifications', Method.GET, body);
}

export function* getNotificationSaga(action) {
	try {
		const response = yield getNotificationService(action.body);
        console.log('getNotification', response);
        if(response.status ==200){
		if (response.data.code == 200) {
			yield put({
				type: GET_NOTIFICATION_SUCCESS,
				data: response.data.data,
				message: response.data.message,
				canLoadMore: response.data.pages > response.data.current,
				isLoadMore: action.body.page > 1
			});
		} else {
			yield put({
				type: GET_NOTIFICATION_ERROR,
				message: response.data.message
			});
		}} else {
            yield put({
				type: GET_NOTIFICATION_ERROR,
				message: response.data.message
			});
        }
	} catch (error) {
		yield put({ type: GET_NOTIFICATION_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
