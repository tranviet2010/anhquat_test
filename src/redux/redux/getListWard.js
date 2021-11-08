export const GET_LIST_WARD = 'GET_LIST_WARD';
export const GET_LIST_WARD_ERROR = 'GET_LIST_WARD_ERROR';
export const GET_LIST_WARD_SUCCESS = 'GET_LIST_WARD_SUCCESS';
import { execute, Method } from '../../services/Services';
import { put } from 'redux-saga/effects';

export const getListWardAction = (district_id) => {
	return {
		type: GET_LIST_WARD,
		district_id
	};
};

const initialState = {
	isLoading: false,
	isSuccess: false,
	isError: false,
	data: {},
	canLoadMore: false
};

export const getListWardReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_LIST_WARD:
			return {
				isLoading: true,
				data: state.data
			};
		case GET_LIST_WARD_ERROR:
			return {
				...state,
				isLoading: false,
				isSuccess: false,
				isError: true,
				message: action.message
			};
		case GET_LIST_WARD_SUCCESS:
			return {
				...state,
				isLoading: false,
				isError: false,
				isSuccess: true,
				data: action.isLoadMore ? [ ...state.data, ...action.data ] : action.data,
				message: action.message
			};
		default:
			return state;
	}
};

export function* getListWardService(district_id) {
	return yield execute('/admin/his/get_list_ward', Method.POST, {
		bv_ma_huyen: district_id
	});
}

export function* getListWardSaga(action) {
	try {
		const response = yield getListWardService(action.district_id);
		console.log('getListWard', response);
		if (response.status < 400) {
			if (response.data.code == 200) {
				yield put({
					type: GET_LIST_WARD_SUCCESS,
					data: response.data.data,
					message: response.data.message,
					canLoadMore: false,
					isLoadMore: false
				});
			} else {
				yield put({
					type: GET_LIST_WARD_ERROR,
					message: response.data.message
				});
			}
		} else {
			yield put({
				type: GET_LIST_WARD_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: GET_LIST_WARD_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
