import {
    CHANGE_SEARCH_VALUE,
    REQUEST_COINS_PENDING,
    REQUEST_COINS_SUCCESS,
    REQUEST_COINS_FAIL,
    REQUEST_PRICES_PENDING,
    REQUEST_PRICES_SUCCESS,
    REQUEST_PRICES_FAIL
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

export const requestPrices = (coins) => (dispatch) => {
    dispatch({type: REQUEST_PRICES_PENDING});
    let coinTags = '';
    coins.forEach(coin => {
        coinTags += coin.tag + ',';
    });
    fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coinTags}&tsyms=USD`)
        .then(response => response.json())
        .then(json => dispatch({type: REQUEST_PRICES_SUCCESS, payload: json}))
        .catch(e => dispatch({type: REQUEST_PRICES_FAIL, payload: e}));
};