export const DELETE_HISTORY = 'DELETE_HISTORY';
export const DELETE_HISTORY_ERROR = 'DELETE_HISTORY_ERROR';
export const DELETE_HISTORY_SUCCESS = 'DELETE_HISTORY_SUCCESS';
import { execute, Method } from '../../services/Services';
import { put } from 'redux-saga/effects';

export const deleteHistoryAction = (body) => {
	return {
		type: DELETE_HISTORY,
		body
	};
};

const initialState = {
	isLoading: false,
	isSuccess: false,
	isError: false,
	data: {}
};

export const deleteHistoryReducer = (state = initialState, action) => {
	switch (action.type) {
		case DELETE_HISTORY:
			return {
				isLoading: true,
				data: {}
			};
		case DELETE_HISTORY_ERROR:
			return {
				...state,
				isLoading: false,
				isSuccess: false,
				isError: true,
				message: action.message
			};
		case DELETE_HISTORY_SUCCESS:
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

export function* deleteHistoryService(body) {
	console.log('Service', body);
	return yield execute('/account//image-history', Method.DELETE, body);
}

export function* deleteHistorySaga(action) {
	try {
		const response = yield deleteHistoryService(action.body);
		console.log('deleteHistory', response);
		if (response.status < 400) {
			if (response.data.code == 200) {
				yield put({
					type: DELETE_HISTORY_SUCCESS,
					data: response.data,
					message: response.data.message
				});
			} else {
				yield put({
					type: DELETE_HISTORY_ERROR,
					message: response.data.message
				});
			}
		} else {
			yield put({
				type: DELETE_HISTORY_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: DELETE_HISTORY_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
