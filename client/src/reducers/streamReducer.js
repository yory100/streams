import {
    FETCH_STREAMS,
    CREATE_STREAM,
    FETCH_STREAM,
    EDIT_STREAM,
    DELETE_STREAM
} from '../actions/types';
import { omit, mapKeys } from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_STREAMS:
            const newState = mapKeys(action.payload, 'id');
            return {
                ...state,
                ...newState
            };
        case FETCH_STREAM:
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        case CREATE_STREAM:
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        case EDIT_STREAM:
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        case DELETE_STREAM:
            return omit(state, action.payload);
        default:
            return state;
    }
};
