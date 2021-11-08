export const GET_USER_INFO = 'GET_USER_INFO';
export const GET_USER_INFO_ERROR = 'GET_USER_INFO_ERROR';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
import { execute, Method } from '../../services/Services';
import { put } from 'redux-saga/effects';
import MAsyncStorage from '../../utilities/MAsyncStorage';

export const getUserInfoAction = (body) => {
	return {
		type: GET_USER_INFO,
		body
	};
};

const initialState = {
	isLoading: false,
	isSuccess: false,
	isError: false,
	data: []
};

export const getUserInfoReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USER_INFO:
			return {
				isLoading: true,
				data: state.data
			};
		case GET_USER_INFO_ERROR:
			return {
				...state,
				isLoading: false,
				isSuccess: false,
				isError: true,
				message: action.message
			};
		case GET_USER_INFO_SUCCESS:
			return {
				...state,
				isLoading: false,
				isError: false,
				isSuccess: true,
				data: action.data,
				message: action.message,
				canLoadMore: action.canLoadMore
			};
		default:
			return state;
	}
};

export function* getUserInfoService() {
	return yield execute('/account/login_token', Method.POST);
}

export function* getUserInfoSaga(action) {
	try {
		const response = yield getUserInfoService();
		console.log('getUserInfo', response);
		if (response.status < 400) {
			if (response.data.code == 200) {
				yield MAsyncStorage.setUserInfo(response.data.data);
				yield put({
					type: GET_USER_INFO_SUCCESS,
					data: response.data.data,
					message: response.data.message
				});
			} else {
				yield put({
					type: GET_USER_INFO_ERROR,
					message: response.data.message
				});
			}
		} else {
			yield put({
				type: GET_USER_INFO_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: GET_USER_INFO_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
