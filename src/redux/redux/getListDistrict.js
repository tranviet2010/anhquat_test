export const GET_LIST_DISTRICT = 'GET_LIST_DISTRICT';
export const GET_LIST_DISTRICT_ERROR = 'GET_LIST_DISTRICT_ERROR';
export const GET_LIST_DISTRICT_SUCCESS = 'GET_LIST_DISTRICT_SUCCESS';
import { execute, Method } from '../../services/Services';
import { put } from 'redux-saga/effects';

export const getListDistrictAction = (city_id) => {
	return {
		type: GET_LIST_DISTRICT,
		city_id
	};
};

const initialState = {
	isLoading: false,
	isSuccess: false,
	isError: false,
	data: {},
	canLoadMore: false
};

export const getListDistrictReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_LIST_DISTRICT:
			return {
				isLoading: true,
				data: state.data
			};
		case GET_LIST_DISTRICT_ERROR:
			return {
				...state,
				isLoading: false,
				isSuccess: false,
				isError: true,
				message: action.message
			};
		case GET_LIST_DISTRICT_SUCCESS:
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

export function* getListDistrictService(city_id) {
	return yield execute('/admin/his/get_list_district', Method.POST, {
		bv_ma_tinh: city_id
	});
}

export function* getListDistrictSaga(action) {
	try {
		const response = yield getListDistrictService(action.city_id);
		console.log('getListDistrict', response);
		if (response.status < 400) {
			if (response.data.code == 200) {
				yield put({
					type: GET_LIST_DISTRICT_SUCCESS,
					data: response.data.data,
					message: response.data.message,
					canLoadMore: false,
					isLoadMore: false
				});
			} else {
				yield put({
					type: GET_LIST_DISTRICT_ERROR,
					message: response.data.message
				});
			}
		} else {
			yield put({
				type: GET_LIST_DISTRICT_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: GET_LIST_DISTRICT_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
