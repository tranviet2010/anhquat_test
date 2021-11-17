export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
export const UPDATE_ACCOUNT_ERROR = 'UPDATE_ACCOUNT_ERROR';
export const UPDATE_ACCOUNT_SUCCESS = 'UPDATE_ACCOUNT_SUCCESS';
import { execute, Method } from '../../services/Services';
import { put } from 'redux-saga/effects';

export const updateAccountAction = (body) => {
	return {
		type: UPDATE_ACCOUNT,
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

export const updateAccountReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_ACCOUNT:
			return {
				isLoading: true,
				data: state.data
			};
		case UPDATE_ACCOUNT_ERROR:
			return {
				...state,
				isLoading: false,
				isSuccess: false,
				isError: true,
				message: action.message
			};
		case UPDATE_ACCOUNT_SUCCESS:
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

export function* updateAccountService(body) {
	return yield execute('/account/user/update-account', Method.PUT, body);
}

export function* updateAccountSaga(action) {
	try {
		const response = yield updateAccountService(action.body);
		console.log('updateAccount', response);
		if (response.data.code == 200) {
			yield put({
				type: UPDATE_ACCOUNT_SUCCESS,
				data: response.data.data.coint_history,
				message: response.data.message
			});
		} else {
			yield put({
				type: UPDATE_ACCOUNT_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: UPDATE_ACCOUNT_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
