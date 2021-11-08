export const CREATE_CAP_CUU = 'CREATE_CAP_CUU';
export const CREATE_CAP_CUU_ERROR = 'CREATE_CAP_CUU_ERROR';
export const CREATE_CAP_CUU_SUCCESS = 'CREATE_CAP_CUU_SUCCESS';
import { execute, Method } from '../../services/Services';
import { put } from 'redux-saga/effects';

export const createCapCuuAction = (body) => {
	return {
		type: CREATE_CAP_CUU,
		body
	};
};

const initialState = {
	isLoading: false,
	isSuccess: false,
	isError: false,
	data: {}
};

export const createCapCuuReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_CAP_CUU:
			return {
				isLoading: true,
				data: {}
			};
		case CREATE_CAP_CUU_ERROR:
			return {
				...state,
				isLoading: false,
				isSuccess: false,
				isError: true,
				message: action.message
			};
		case CREATE_CAP_CUU_SUCCESS:
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

export function* createCapCuuService(body) {
	return yield execute('/account/lich_hen/create-emergency', Method.POST, body);
}

export function* createCapCuuSaga(action) {
	try {
		const response = yield createCapCuuService(action.body);
		console.log('createCapCuu', response);
		if (response.status < 400) {
			if (response.data.code == 200) {
				yield put({
					type: CREATE_CAP_CUU_SUCCESS,
					data: response.data.lich_hen,
					message: response.data.message
				});
			} else {
				yield put({
					type: CREATE_CAP_CUU_ERROR,
					message: response.data.message
				});
			}
		} else {
			yield put({
				type: CREATE_CAP_CUU_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: CREATE_CAP_CUU_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
