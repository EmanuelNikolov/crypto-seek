import {
    CHANGE_SEARCH_VALUE,
    REQUEST_COINS_PENDING,
    REQUEST_COINS_SUCCESS,
    REQUEST_COINS_FAIL
} from "./constants";

export const setSearchValue = (text) => ({
    type: CHANGE_SEARCH_VALUE,
    payload: text
});

export const requestCoins = (coins) => (dispatch) => {
    dispatch({type: REQUEST_COINS_PENDING});
    if (!coins.length) {
        dispatch({type: REQUEST_COINS_FAIL, payload: 'Failed to fetch'});
    } else {
        dispatch({type: REQUEST_COINS_SUCCESS, payload: coins});
    }
};