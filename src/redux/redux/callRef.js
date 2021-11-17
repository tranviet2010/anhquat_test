export const SET_CALL_REF = 'SET_CALL_REF';
export const SET_CALL_REF_ERROR = 'SET_CALL_REF_ERROR';
export const SET_CALL_REF_SUCCESS = 'SET_CALL_REF_SUCCESS';
import { execute, Method } from '../../services/Services';
import { put } from 'redux-saga/effects';

export const setCallRefAction = (ref) => {
	return {
		type: SET_CALL_REF,
		ref: ref
	};
};

const initialState = null;

export const setCallRefReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CALL_REF:
			return action.ref;
		default:
			return state;
	}
};
