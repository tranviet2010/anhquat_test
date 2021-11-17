export const GET_COINT_HISTORY = 'GET_COINT_HISTORY';
export const GET_COINT_HISTORY_ERROR = 'GET_COINT_HISTORY_ERROR';
export const GET_COINT_HISTORY_SUCCESS = 'GET_COINT_HISTORY_SUCCESS';
import { execute, Method } from '../../services/Services';
import { put } from 'redux-saga/effects';

export const getCointHistoryAction = (body) => {
	return {
		type: GET_COINT_HISTORY,
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

export const getCointHistoryReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_COINT_HISTORY:
			return {
				isLoading: true,
				data: state.data
			};
		case GET_COINT_HISTORY_ERROR:
			return {
				...state,
				isLoading: false,
				isSuccess: false,
				isError: true,
				message: action.message
			};
		case GET_COINT_HISTORY_SUCCESS:
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

export function* getCointHistoryService(body) {
	return yield execute('/account/user/coint-history', Method.GET, body);
}

export function* getCointHistorySaga(action) {
	try {
		const response = yield getCointHistoryService(action.body);
		console.log('getCointHistory', response);
		if (response.data.code == 200) {
			yield put({
				type: GET_COINT_HISTORY_SUCCESS,
				data: response.data.data.coint_history,
				message: response.data.message,
				canLoadMore: response.data.pages > response.data.current,
				isLoadMore: action.body.page > 1
			});
		} else {
			yield put({
				type: GET_COINT_HISTORY_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: GET_COINT_HISTORY_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
