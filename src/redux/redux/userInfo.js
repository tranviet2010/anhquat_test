export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_USER_INFO_SUCCESS = 'SET_USER_INFO_SUCCESS';

export const DELETE_USER_INFO = 'DELETE_USER_INFO';
export const DELETE_USER_INFO_SUCCESS = 'DELETE_USER_INFO_SUCCESS';

import { put } from 'redux-saga/effects';
import { CHECK_TOKEN_SUCCESS } from './checkToken';
import { LOGIN_SUCCESS } from './login';
import { SIGNUP_ACCOUNT_SUCCESS } from './signup';
import { execute, Method } from '../../services/Services';
import MAsyncStorage from '../../utilities/MAsyncStorage';
import { GET_USER_INFO_SUCCESS } from './getUserInfo';

export const setUserInfoAction = (data) => {
	return {
		type: SET_USER_INFO,
		data
	};
};
export const deleteUserInfoAction = () => {
	return {
		type: DELETE_USER_INFO
	};
};
const defaultGetFormData = {
	isLoading: false,
	isSuccess: false,
	isError: false,
	canLoadMore: true,
	data: null
};

export const userInfoReducer = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case SET_USER_INFO_SUCCESS:
			return {
				data: action.data
			};
		case GET_USER_INFO_SUCCESS:
			return {
				data: action.data
			};
		case CHECK_TOKEN_SUCCESS:
			return {
				data: action.data
			};
		case SIGNUP_ACCOUNT_SUCCESS:
			return {
				data: action.data
			};
		case LOGIN_SUCCESS:
			return {
				data: action.data
			};
		case DELETE_USER_INFO_SUCCESS:
			return {
				data: null
			};

		default:
			return state;
	}
};

export function* setUserInfoSaga(action) {
	try {
		console.log('setUserInfoSaga');
		yield put({ type: SET_USER_INFO_SUCCESS, data: action.data });
	} catch (error) {
		if (__DEV__) console.log(error);
	}
}
export function* deleteUserInfoSaga(action) {
	try {
		console.log('deleteUserInfoSaga');
		yield put({ type: DELETE_USER_INFO_SUCCESS });
	} catch (error) {
		if (__DEV__) console.log(error);
	}
}
