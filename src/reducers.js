import {
    CHANGE_SEARCH_VALUE,
    REQUEST_COINS_PENDING,
    REQUEST_COINS_SUCCESS,
    REQUEST_PRICES_PENDING,
    REQUEST_COINS_FAIL,
    REQUEST_PRICES_SUCCESS,
    REQUEST_PRICES_FAIL
} from "./constants";

const initialStateSearch = {
    searchValue: ''
};

export const searchCoins = (state=initialStateSearch, action={}) => {
    switch (action.type) {
        case CHANGE_SEARCH_VALUE:
            return Object.assign({}, state, {searchValue: action.payload});
        default:
            return state;
    }
};

const initialStateCoins = {
    isPending: false,
    coins: [],
    error: ''
};

export const requestCoins = (state=initialStateCoins, action={}) => {
    switch (action.type) {
        case REQUEST_COINS_PENDING:
            return Object.assign({}, state, {isPending: true});
        case REQUEST_COINS_SUCCESS:
            return Object.assign({}, state, {isPending: false, coins: action.payload});
        case REQUEST_COINS_FAIL:
            return Object.assign({}, state, {isPending: false, error: action.payload});
        default:
            return state;
    }
};

const initialStatePrices = {
    isPendingPrices: false,
    prices: {},
    errorPrices: ''
};

export const requestPrices = (state=initialStatePrices, action={}) => {
    switch (action.type) {
        case REQUEST_PRICES_PENDING:
            return Object.assign({}, state, {isPendingPrice: true});
        case REQUEST_PRICES_SUCCESS:
            return Object.assign({}, state, {isPendingPrices: false, prices: action.payload});
        case REQUEST_PRICES_FAIL:
            return Object.assign({}, state, {isPendingPrices: false, errorPrices: action.payload});
        default:
            return state;
    }
};