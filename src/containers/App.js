import React, {Component} from 'react';
import {connect} from 'react-redux';
import SearchField from '../components/SearchField';
import CardList from '../components/CardList';
import './App.css';
import {coins} from "../coins";

import {setSearchValue, requestCoins} from "../actions";

const mapStateToProps = (state) => ({
    searchValue: state.searchCoins.searchValue,
    isPending: state.requestCoins.isPending,
    coins: state.requestCoins.coins,
    error: state.requestCoins.error
});

const mapDispatchToProps = (dispatch) => ({
    onSearchUpdate: (event) => dispatch(setSearchValue(event.target.value)),
    onRequestCoins: () => dispatch(requestCoins(coins))
});

class App extends Component {
    componentDidMount() {
        this.props.onRequestCoins();
    }

    render() {
        const {searchValue, onSearchUpdate, isPending, coins} = this.props;
        const filteredCoins = coins.filter(coin => {
            return coin.name.toLowerCase().includes(searchValue.toLowerCase());
        });

        if (isPending) {
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