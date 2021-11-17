export const CREATE_BHYT = 'CREATE_BHYT';
export const CREATE_BHYT_ERROR = 'CREATE_BHYT_ERROR';
export const CREATE_BHYT_SUCCESS = 'CREATE_BHYT_SUCCESS';
import { execute, Method } from '../../services/Services';
import { put } from 'redux-saga/effects';

export const createBHYTAction = (body) => {
	return {
		type: CREATE_BHYT,
		body
	};
};

const initialState = {
	isLoading: false,
	isSuccess: false,
	isError: false,
	data: {}
};

export const createBHYTReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_BHYT:
			return {
				isLoading: true,
				data: {}
			};
		case CREATE_BHYT_ERROR:
			return {
				...state,
				isLoading: false,
				isSuccess: false,
				isError: true,
				message: action.message
			};
		case CREATE_BHYT_SUCCESS:
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

export function* createBHYTService(body) {
	return yield execute('/account/user/create-bhyt', Method.POST, body);
}

export function* createBHYTSaga(action) {
	try {
		const response = yield createBHYTService(action.body);
		console.log('createBHYT', response);
		if (response.status < 400) {
			if (response.data.code == 200) {
				yield put({
					type: CREATE_BHYT_SUCCESS,
					data: response.data.lich_hen,
					message: response.data.message
				});
			} else {
				yield put({
					type: CREATE_BHYT_ERROR,
					message: response.data.message
				});
			}
		} else {
			yield put({
				type: CREATE_BHYT_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: CREATE_BHYT_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
