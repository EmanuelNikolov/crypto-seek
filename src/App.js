import React, {Component} from 'react';
import SearchField from './SearchField';
import CardList from './CardList';
import {coins} from "./coins";
import './App.css';

export default class App extends Component {
    state = {
        coins: coins,
        searchValue: ''
    };

    onSearchUpdate(event) {
        this.setState({searchValue: event.target.value})
    };

    render() {
        const filteredCoins = this.state.coins.filter(coin => {
            return coin.name.toLowerCase().includes(this.state.searchValue.toLowerCase());
        });

        if (!this.state.coins.length) {
            return (
                <div className='tc'>
                    <h1>Loading</h1>
                </div>
            );
        }

        return (
            <div className='tc'>
                <h1 className='f1'>Crypto Seek</h1>
                <SearchField searchUpdate={this.onSearchUpdate.bind(this)}/>
                <CardList coins={filteredCoins}/>
            </div>
        );
    }
}