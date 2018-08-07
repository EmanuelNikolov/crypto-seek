import React, {Component} from 'react';
import {connect} from 'react-redux';
import SearchField from '../components/SearchField';
import CardList from '../components/CardList';
import './App.css';
import {coins} from "../coins";

import {setSearchValue, requestCoins, requestPrices} from "../actions";

const mapStateToProps = (state) => ({
    searchValue: state.searchCoins.searchValue,
    isPending: state.requestCoins.isPending,
    coins: state.requestCoins.coins,
    error: state.requestCoins.error,
    isPendingPrices: state.requestPrices.isPendingPrices,
    prices: state.requestPrices.prices,
    errorPrices: state.requestPrices.errorPrices
});

const mapDispatchToProps = (dispatch) => ({
    onSearchUpdate: (event) => dispatch(setSearchValue(event.target.value)),
    onRequestCoins: () => dispatch(requestCoins(coins)),
    onRequestPrices: () => dispatch(requestPrices(coins))
});

class App extends Component {
    componentDidMount() {
        this.props.onRequestCoins();
        this.props.onRequestPrices();
    }

    render() {
        const {searchValue, onSearchUpdate, isPending, isPendingPrice, coins, prices} = this.props;

        let filteredCoins = coins.filter(coin => {
            return coin.name.toLowerCase().includes(searchValue.toLowerCase());
        });

        filteredCoins = filteredCoins.map(coin => {
            for (let tag in prices) {
                if (coin.tag === tag) {
                    coin.price = Object.values(prices[tag])[0].toString();
                }
            }
            return coin;
        });

        if (isPending || isPendingPrice) {
            return (
                <div className='tc'>
                    <h1>Loading</h1>
                </div>
            );
        }

        return (
            <div className='tc'>
                <h1 className='f1'>Crypto Seek</h1>
                <SearchField searchUpdate={onSearchUpdate}/>
                <CardList coins={filteredCoins}/>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);