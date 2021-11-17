export const GET_HINH_ANH_CAN_LAM_SANG = 'GET_HINH_ANH_CAN_LAM_SANG';
export const GET_HINH_ANH_CAN_LAM_SANG_ERROR = 'GET_HINH_ANH_CAN_LAM_SANG_ERROR';
export const GET_HINH_ANH_CAN_LAM_SANG_SUCCESS = 'GET_HINH_ANH_CAN_LAM_SANG_SUCCESS';
import { execute, Method } from '../../services/Services';
import { put } from 'redux-saga/effects';
import { create } from 'apisauce';

export const getHinhAnhCanLamSangAction = (body) => {
	return {
		type: GET_HINH_ANH_CAN_LAM_SANG,
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

export const getHinhAnhCanLamSangReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_HINH_ANH_CAN_LAM_SANG:
			return {
				isLoading: true,
				data: state.data
			};
		case GET_HINH_ANH_CAN_LAM_SANG_ERROR:
			return {
				...state,
				isLoading: false,
				isSuccess: false,
				isError: true,
				message: action.message,
				data: []
			};
		case GET_HINH_ANH_CAN_LAM_SANG_SUCCESS:
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

export function* getHinhAnhCanLamSangService(body) {
	let api = create({
		baseURL: 'http://hinhanh.benhvienanhquat.com.vn:3000/api/view2/640/',
		timeout: 10000,
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return yield api.get(body.cls_id + '/' + body.page);
}

export function* getHinhAnhCanLamSangSaga(action) {
	try {
		const response = yield getHinhAnhCanLamSangService(action.body);
		console.log('getHinhAnhCanLamSang', response);
		if (response.data.success) {
			let new_data = response.data.message.imageList.filter((value, index) => value != null);
			yield put({
				type: GET_HINH_ANH_CAN_LAM_SANG_SUCCESS,
				data: new_data,
				message: response.data.success,
				canLoadMore: response.data.message.hasNext,
				isLoadMore: action.body.page > 0
			});
		} else {
			yield put({
				type: GET_HINH_ANH_CAN_LAM_SANG_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: GET_HINH_ANH_CAN_LAM_SANG_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
