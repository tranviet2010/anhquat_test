export const CHECK_TOKEN = 'CHECK_TOKEN';
export const CHECK_TOKEN_SUCCESS = 'CHECK_TOKEN_SUCCESS';
export const CHECK_TOKEN_ERROR = 'CHECK_TOKEN_ERROR';
import { put } from 'redux-saga/effects';
import MAsyncStorage from '../../utilities/MAsyncStorage';
import { execute, Method } from '../../services/Services';
export const checkTokenAction = () => {
	return {
		type: CHECK_TOKEN
	};
};

const defaultGetFormData = {
	isLoading: false,
	isSuccess: false,
	isError: false,
	canLoadMore: true,
	data: []
};
export const checkTokenReducer = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case CHECK_TOKEN_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isSuccess: true,
				isError: false,
				message: action.message
			};
		case CHECK_TOKEN_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				isSuccess: false,
				message: action.message
			};
		case CHECK_TOKEN:
			return {
				data: {},
				isLoading: true
			};
		default:
			return state;
	}
};

export function* checkTokenService() {
	return yield execute('/account/login_token', Method.POST);
}
export function* checkTokenSaga(action) {
	try {
		const response = yield checkTokenService();
		console.log('checkToken', response);
		if (response.status === 200) {
			if (response.data.data) {
				yield MAsyncStorage.setUserInfo(response.data.data);
				yield put({
					type: CHECK_TOKEN_SUCCESS,
					data: response.data.data,
					message: response.data.message
				});
			} else {
				yield put({
					type: CHECK_TOKEN_ERROR,
					message: response.data.message
				});
			}
		} else {
			yield put({
				type: CHECK_TOKEN_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: CHECK_TOKEN_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
