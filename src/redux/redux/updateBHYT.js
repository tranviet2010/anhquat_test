export const UPDATE_BHYT = 'UPDATE_BHYT';
export const UPDATE_BHYT_ERROR = 'UPDATE_BHYT_ERROR';
export const UPDATE_BHYT_SUCCESS = 'UPDATE_BHYT_SUCCESS';
import { execute, Method } from '../../services/Services';
import { put } from 'redux-saga/effects';

export const updateBHYTAction = (body) => {
	return {
		type: UPDATE_BHYT,
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

export const updateBHYTReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_BHYT:
			return {
				isLoading: true,
				data: state.data
			};
		case UPDATE_BHYT_ERROR:
			return {
				...state,
				isLoading: false,
				isSuccess: false,
				isError: true,
				message: action.message
			};
		case UPDATE_BHYT_SUCCESS:
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

export function* updateBHYTService(body) {
	return yield execute('/account/user/update-bhyt', Method.PUT, body);
}

export function* updateBHYTSaga(action) {
	try {
		const response = yield updateBHYTService(action.body);
		console.log('updateBHYT', response);
		if (response.data.code == 200) {
			yield put({
				type: UPDATE_BHYT_SUCCESS,
				data: response.data.data.coint_history,
				message: response.data.message
			});
		} else {
			yield put({
				type: UPDATE_BHYT_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: UPDATE_BHYT_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
