export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
import { put } from 'redux-saga/effects';
import MAsyncStorage from '../../utilities/MAsyncStorage';
import { execute, Method } from '../../services/Services';
export const loginAction = (body) => {
	return {
		type: LOGIN,
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
export const loginReducer = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isSuccess: true,
				isError: false,
				message: action.message
			};
		case LOGIN_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				isSuccess: false,
				message: action.message
			};
		case LOGIN:
			return {
				data: {},
				isLoading: true
			};
		default:
			return state;
	}
};

export function* loginService(body) {
	return yield execute('account/login', Method.POST, body);
}
export function* loginSaga(action) {
	try {
		const response = yield loginService(action.body);
		console.log('login', response);
		if (response.status === 200) {
			if (response.data.code == 200) {
				yield MAsyncStorage.setUserInfo(response.data.data);
				yield put({
					type: LOGIN_SUCCESS,
					data: response.data.data,
					message: response.data.message
				});
			} else {
				yield put({
					type: LOGIN_ERROR,
					message: response.data.message
				});
			}
		} else {
			yield put({
				type: LOGIN_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: LOGIN_ERROR, error: error.response });
		if (__DEV__) console.log(error.response);
	}
}
