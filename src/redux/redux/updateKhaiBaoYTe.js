export const UPDATE_KHAI_BAO_Y_TE = 'UPDATE_KHAI_BAO_Y_TE';
export const UPDATE_KHAI_BAO_Y_TE_ERROR = 'UPDATE_KHAI_BAO_Y_TE_ERROR';
export const UPDATE_KHAI_BAO_Y_TE_SUCCESS = 'UPDATE_KHAI_BAO_Y_TE_SUCCESS';
import { execute, Method } from '../../services/Services';
import { put } from 'redux-saga/effects';

export const updateKhaiBaoYTeAction = (body) => {
	return {
		type: UPDATE_KHAI_BAO_Y_TE,
		body
	};
};

const initialState = {
	isLoading: false,
	isSuccess: false,
	isError: false,
	data: {}
};

export const updateKhaiBaoYTeReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_KHAI_BAO_Y_TE:
			return {
				isLoading: true,
				data: {}
			};
		case UPDATE_KHAI_BAO_Y_TE_ERROR:
			return {
				...state,
				isLoading: false,
				isSuccess: false,
				isError: true,
				message: action.message
			};
		case UPDATE_KHAI_BAO_Y_TE_SUCCESS:
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

export function* updateKhaiBaoYTeService(body) {
	return yield execute('account/declaration/' + body.lich_hen_id, Method.POST, body.data);
}

export function* updateKhaiBaoYTeSaga(action) {
	try {
		const response = yield updateKhaiBaoYTeService(action.body);
		console.log('updateKhaiBaoYTe', response);
		if (response.status < 400) {
			if (response.data.code == 200) {
				yield put({
					type: UPDATE_KHAI_BAO_Y_TE_SUCCESS,
					data: response.data.lich_hen,
					message: response.data.message
				});
			} else {
				yield put({
					type: UPDATE_KHAI_BAO_Y_TE_ERROR,
					message: response.data.message
				});
			}
		} else {
			yield put({
				type: UPDATE_KHAI_BAO_Y_TE_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: UPDATE_KHAI_BAO_Y_TE_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
