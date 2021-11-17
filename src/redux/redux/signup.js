export const SIGNUP_ACCOUNT = 'SIGNUP_ACCOUNT';
export const SIGNUP_ACCOUNT_SUCCESS = 'SIGNUP_ACCOUNT_SUCCESS';
export const SIGNUP_ACCOUNT_ERROR = 'SIGNUP_ACCOUNT_ERROR';
import { put } from 'redux-saga/effects';
import MAsyncStorage from '../../utilities/MAsyncStorage';
import { execute, Method } from '../../services/Services';
export const signupAccountAction = (body) => {
	return {
		type: SIGNUP_ACCOUNT,
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
export const signupAccountReducer = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case SIGNUP_ACCOUNT_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isSuccess: true,
				isError: false,
				message: action.message
			};
		case SIGNUP_ACCOUNT_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				isSuccess: false,
				message: action.message
			};
		case SIGNUP_ACCOUNT:
			return {
				data: {},
				isLoading: true
			};
		default:
			return state;
	}
};

export function* signupAccountService(body) {
	return yield execute('/account/register', Method.POST, body);
}
export function* signupAccountSaga(action) {
	try {
		const response = yield signupAccountService(action.body);
		console.log('signupAccount', response);
		if (response.status === 200) {
			if (response.data.data) {
				yield MAsyncStorage.setUserInfo(response.data.data);
				yield put({
					type: SIGNUP_ACCOUNT_SUCCESS,
					data: response.data.data,
					message: response.data.message
				});
			} else {
				yield put({
					type: SIGNUP_ACCOUNT_ERROR,
					message: response.data.message
				});
			}
		} else {
			yield put({
				type: SIGNUP_ACCOUNT_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: SIGNUP_ACCOUNT_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
