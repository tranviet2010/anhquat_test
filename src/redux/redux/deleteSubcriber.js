export const DELETE_SUBCRIBER = 'DELETE_SUBCRIBER';
export const DELETE_SUBCRIBER_ERROR = 'DELETE_SUBCRIBER_ERROR';
export const DELETE_SUBCRIBER_SUCCESS = 'DELETE_SUBCRIBER_SUCCESS';
import { execute, Method } from '../../services/Services';
import { put } from 'redux-saga/effects';

export const deleteSubcriberAction = (body) => {
	return {
		type: DELETE_SUBCRIBER,
		body
	};
};

const initialState = {
	isLoading: false,
	isSuccess: false,
	isError: false,
	data: {}
};

export const deleteSubcriberReducer = (state = initialState, action) => {
	switch (action.type) {
		case DELETE_SUBCRIBER:
			return {
				isLoading: true,
				data: {}
			};
		case DELETE_SUBCRIBER_ERROR:
			return {
				...state,
				isLoading: false,
				isSuccess: false,
				isError: true,
				message: action.message
			};
		case DELETE_SUBCRIBER_SUCCESS:
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

export function* deleteSubcriberService(body) {
	console.log('Service', body);
	return yield execute('/account/subscriber', Method.DELETE, body);
}

export function* deleteSubcriberSaga(action) {
	try {
		const response = yield deleteSubcriberService(action.body);
		console.log('deleteSubcriber', response);
		if (response.status < 400) {
			if (response.data.code == 200) {
				yield put({
					type: DELETE_SUBCRIBER_SUCCESS,
					data: response.data,
					message: response.data.message
				});
			} else {
				yield put({
					type: DELETE_SUBCRIBER_ERROR,
					message: response.data.message
				});
			}
		} else {
			yield put({
				type: DELETE_SUBCRIBER_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: DELETE_SUBCRIBER_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
