import React, {Component} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchField from '../components/SearchField';
import CardList from '../components/CardList';
import './App.css';
import {allCoins} from "../coins";
import Card from "../components/Card";

const baseUrl = 'https://www.cryptocompare.com';

class App extends Component {
    state = {
        coins: allCoins.slice(0, 10),
        coinPrices: {},
        isLoading: false,
        error: null,
        offset: 0,
        searchValue: ''
    };

    componentWillMount() {
        // this.fetchCoinPrices();
    }

    fetchCoinPrices = () => {
        const {coins, offset} = this.state;
        let coinSymbols = '';
        this.setState({isLoading: true});

        let newCoins = coins.slice(offset);
        newCoins.forEach(coin => {
            coinSymbols += coin.Symbol + ',';
        });

        fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coinSymbols}&tsyms=USD`)
            .then(response => response.json())
            .then(json => this.setState({coinPrices: json, isLoading: false}))
            .catch(e => this.setState({error: e, isLoading: false}));
    };

    fetchMoreData = () => {
        let newOffset = this.state.offset + 20;

        setTimeout(() => {
            this.setState({
                coins: this.state.coins.concat(allCoins.slice(newOffset, newOffset + 20)),
                offset: newOffset
            });
        }, 1000);

        this.fetchCoinPrices();
        this.processCoins();
    };

    onSearchChange = (event) => {
        this.setState({searchValue: event.target.value})
    };

    processCoins = () => {
        const {coins, coinPrices, isLoading, error, searchValue} = this.state;
        /*let filteredCoins = coins.filter(coin => {
            let result = coin.CoinName.toLowerCase().includes(searchValue.toLowerCase());

            if (result) {

            }

            return result;
        });*/
        // console.log(coinPrices);
        if (error) {
            return <h1 className='tc f1'>{error.message}</h1>
        }

        if (isLoading) {
            return <h1 className='tc f1'>Loading...</h1>
        }

        coins.forEach(coin => {
            coin.Price = Object.values(coinPrices[coin.Symbol])[0].toString();
        });

        this.setState({coins: coins});
    };

    render() {
        // console.log(this.state.coins);
        return (
            <div className='tc'>
                <h1 className='f1'>Crypto Seek</h1>
                <SearchField searchUpdate={this.onSearchChange}/>
                <InfiniteScroll
                    dataLength={this.state.coins.length}
                    next={this.fetchMoreData}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                >
                    <div>
                        {
                            this.state.coins.map((coin) => {
                                let imageUrl = baseUrl + coin.ImageUrl;

                                return (
                                    <Card price={coin.Price}
                                          name={coin.CoinName}
                                          img={imageUrl}
                                    />
                                );
                            })
                        }
                    </div>
                </InfiniteScroll>
            </div>
        );
    }
}

export default App;