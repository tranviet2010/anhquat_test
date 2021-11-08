export const DELETE_DEVICE_TOKEN = 'DELETE_DEVICE_TOKEN';
export const DELETE_DEVICE_TOKEN_SUCCESS = 'DELETE_DEVICE_TOKEN_SUCCESS';
export const DELETE_DEVICE_TOKEN_ERROR = 'DELETE_DEVICE_TOKEN_ERROR';
import { put } from 'redux-saga/effects';
import MAsyncStorage from '../../utilities/MAsyncStorage';
import { execute, Method } from '../../services/Services';
export const deleteDeviceTokenAction = (body) => {
	return {
		type: DELETE_DEVICE_TOKEN,
		body
	};
};

const defaultGetFormData = {
	isLoading: false,
	isSuccess: false,
	isError: false,
	canLoadMore: true,
	data: []
};
export const deleteDeviceTokenReducer = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case DELETE_DEVICE_TOKEN_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isSuccess: true,
				isError: false,
				message: action.message
			};
		case DELETE_DEVICE_TOKEN_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				isSuccess: false,
				message: action.message
			};
		case DELETE_DEVICE_TOKEN:
			return {
				data: {},
				isLoading: true
			};
		default:
			return state;
	}
};

export function* deleteDeviceTokenService(body) {
	return yield execute('/account/subscriber', Method.DELETE, body);
}
export function* deleteDeviceTokenSaga(action) {
	try {
		const response = yield deleteDeviceTokenService(action.body);
		console.log('deleteDeviceToken', response);
		if (response.status === 200) {
			if (response.data.code == 200) {
				yield put({
					type: DELETE_DEVICE_TOKEN_SUCCESS,
					data: response.data.user,
					message: response.data.message
				});
			} else {
				yield put({
					type: DELETE_DEVICE_TOKEN_ERROR,
					message: response.data.message
				});
			}
		} else {
			yield put({
				type: DELETE_DEVICE_TOKEN_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: DELETE_DEVICE_TOKEN_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
