export const CREATE_CMT = 'CREATE_CMT';
export const CREATE_CMT_ERROR = 'CREATE_CMT_ERROR';
export const CREATE_CMT_SUCCESS = 'CREATE_CMT_SUCCESS';
import { execute, Method } from '../../services/Services';
import { put } from 'redux-saga/effects';

export const createCMTAction = (body) => {
	return {
		type: CREATE_CMT,
		body
	};
};

const initialState = {
	isLoading: false,
	isSuccess: false,
	isError: false,
	data: {}
};

export const createCMTReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_CMT:
			return {
				isLoading: true,
				data: {}
			};
		case CREATE_CMT_ERROR:
			return {
				...state,
				isLoading: false,
				isSuccess: false,
				isError: true,
				message: action.message
			};
		case CREATE_CMT_SUCCESS:
			return {
				...state,
				isLoading: false,
				isError: false,
				isSuccess: true,
				data: action.data,
				message: action.message
			};
		default:
			return state;
	}
};

export function* createCMTService(body) {
	return yield execute('/account/user/create-cmt', Method.POST, body);
}

export function* createCMTSaga(action) {
	try {
		const response = yield createCMTService(action.body);
		console.log('createCMT', response);
		if (response.status < 400) {
			if (response.data.code == 200) {
				yield put({
					type: CREATE_CMT_SUCCESS,
					data: response.data.lich_hen,
					message: response.data.message
				});
			} else {
				yield put({
					type: CREATE_CMT_ERROR,
					message: response.data.message
				});
			}
		} else {
			yield put({
				type: CREATE_CMT_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: CREATE_CMT_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
