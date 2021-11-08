export const CHECK_ACCOUNT_EXIST = 'CHECK_ACCOUNT_EXIST';
export const CHECK_ACCOUNT_EXIST_SUCCESS = 'CHECK_ACCOUNT_EXIST_SUCCESS';
export const CHECK_ACCOUNT_EXIST_ERROR = 'CHECK_ACCOUNT_EXIST_ERROR';
import { put } from 'redux-saga/effects';
import MAsyncStorage from '../../utilities/MAsyncStorage';
import { execute, Method } from '../../services/Services';
export const checkAccountExistAction = (body) => {
	return {
		type: CHECK_ACCOUNT_EXIST,
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
export const checkAccountExistReducer = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case CHECK_ACCOUNT_EXIST_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isSuccess: true,
				isError: false,
				message: action.message
			};
		case CHECK_ACCOUNT_EXIST_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				isSuccess: false,
				message: action.message
			};
		case CHECK_ACCOUNT_EXIST:
			return {
				data: {},
				isLoading: true
			};
		default:
			return state;
	}
};

export function* checkAccountExistService(body) {
	return yield execute('/account/check', Method.POST, body);
}
export function* checkAccountExistSaga(action) {
	try {
		const response = yield checkAccountExistService(action.body);
		console.log('checkAccountExist', response);
		if (response.status === 200) {
			if (response.data.code == 200) {
				yield put({
					type: CHECK_ACCOUNT_EXIST_SUCCESS,
					data: response.data.data,
					message: response.data.message
				});
			} else {
				yield put({
					type: CHECK_ACCOUNT_EXIST_ERROR,
					message: response.data.message
				});
			}
		} else {
			yield put({
				type: CHECK_ACCOUNT_EXIST_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: CHECK_ACCOUNT_EXIST_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
