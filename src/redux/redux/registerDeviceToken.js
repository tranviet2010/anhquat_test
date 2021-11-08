export const REGISTER_DEVICE_TOKEN = 'REGISTER_DEVICE_TOKEN';
export const REGISTER_DEVICE_TOKEN_SUCCESS = 'REGISTER_DEVICE_TOKEN_SUCCESS';
export const REGISTER_DEVICE_TOKEN_ERROR = 'REGISTER_DEVICE_TOKEN_ERROR';
import { put } from 'redux-saga/effects';
import MAsyncStorage from '../../utilities/MAsyncStorage';
import { execute, Method } from '../../services/Services';
export const registerDeviceTokenAction = (body) => {
	return {
		type: REGISTER_DEVICE_TOKEN,
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
export const registerDeviceTokenReducer = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case REGISTER_DEVICE_TOKEN_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isSuccess: true,
				isError: false,
				message: action.message
			};
		case REGISTER_DEVICE_TOKEN_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				isSuccess: false,
				message: action.message
			};
		case REGISTER_DEVICE_TOKEN:
			return {
				data: {},
				isLoading: true
			};
		default:
			return state;
	}
};

export function* registerDeviceTokenService(body) {
	return yield execute('/account/subscriber', Method.POST, body);
}
export function* registerDeviceTokenSaga(action) {
	try {
		const response = yield registerDeviceTokenService(action.body);
		console.log('registerDeviceToken', response);
		if (response.status === 200) {
			if (response.data.code == 200) {
				yield put({
					type: REGISTER_DEVICE_TOKEN_SUCCESS,
					data: response.data.user,
					message: response.data.message
				});
			} else {
				yield put({
					type: REGISTER_DEVICE_TOKEN_ERROR,
					message: response.data.message
				});
			}
		} else {
			yield put({
				type: REGISTER_DEVICE_TOKEN_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: REGISTER_DEVICE_TOKEN_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
