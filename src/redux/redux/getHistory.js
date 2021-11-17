export const GET_HISTORY = 'GET_HISTORY';
export const GET_HISTORY_ERROR = 'GET_HISTORY_ERROR';
export const GET_HISTORY_SUCCESS = 'GET_HISTORY_SUCCESS';
import { execute, Method } from '../../services/Services';
import { put } from 'redux-saga/effects';

export const getHistoryAction = (body) => {
	return {
		type: GET_HISTORY,
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

export const getHistoryReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_HISTORY:
			return {
				isLoading: true,
				data: state.data
			};
		case GET_HISTORY_ERROR:
			return {
				...state,
				isLoading: false,
				isSuccess: false,
				isError: true,
				message: action.message
			};
		case GET_HISTORY_SUCCESS:
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

export function* getHistoryService(body) {
	return yield execute('/account/image-history', Method.GET, body);
}

export function* getHistorySaga(action) {
	try {
		const response = yield getHistoryService(action.body);
		console.log('getHistory', response);
		if (response.data.code == 200) {
			yield put({
				type: GET_HISTORY_SUCCESS,
				data: response.data.data.image_historys,
				message: response.data.message,
				canLoadMore: response.data.pages > response.data.current,
				isLoadMore: action.body.page > 1
			});
		} else {
			yield put({
				type: GET_HISTORY_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: GET_HISTORY_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
