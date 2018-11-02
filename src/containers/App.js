import React, {Component} from 'react';
import SearchField from '../components/SearchField';
import CardList from "./CardList";
import ReactPaginate from 'react-paginate';
import {HashLoader} from 'react-spinners';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.allCoins = props.allCoins;
        this.searchResults = null;

        this.state = {
            coins: [],
            coinPrices: {},
            offset: 0,
            pageCount: props.allCoins.length / props.perPage,
            noResults: false,
            loading: true
        }
    }

    onSearchChange = (event) => {
        this.setState({loading: true});
        let searchValue = event.target.value;

        let coins = this.allCoins.filter(coin => {
            return coin.CoinName.toLowerCase().includes(searchValue.toLowerCase());
        });

        if (coins.length === 0) {
            this.setState({noResults: true, loading: false});
        } else {
            this.searchResults = coins;
            this.setState({
                pageCount: coins.length / this.props.perPage,
                offset: 0,
                noResults: false
            }, () => this.loadCoins());
        }
    };

    loadCoins() {
        let coins = [];

        if (this.searchResults) {
            coins = this.searchResults.slice(this.state.offset, this.state.offset + this.props.perPage);
        } else {
            coins = this.allCoins.slice(this.state.offset, this.state.offset + this.props.perPage);
        }

        let coinSymbols = '';

        coins.forEach(coin => coinSymbols += coin.Symbol + ',');

        setTimeout(() => {
            fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coinSymbols}&tsyms=USD`)
                .then(response => response.json())
                .then(coinPrices => this.setState({coins: coins, coinPrices: coinPrices, loading: false}));
        }, 500);
    }

    componentDidMount() {
        this.loadCoins();
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * this.props.perPage);

        this.setState({offset: offset}, () => this.loadCoins());
    };

    render() {
        const {noResults, loading} = this.state;
        let cardListContainer;

        if (noResults) {
            cardListContainer = <div className={"loading"}><h4 className='tc white'>Nothing found :(</h4></div>;
        } else {
            cardListContainer = (
                <div>
                    <div className={"pt3 pb2 card-list"}>
                        <CardList coins={this.state.coins} coinPrices={this.state.coinPrices}/>
                    </div>
                    <ReactPaginate
                        previousLabel={"«"}
                        nextLabel={"»"}
                        breakLabel={"..."}
                        breakClassName={"page-link page-number"}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination pagination-sm justify-content-center pa2"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}
                        pageClassName={"page-item page-number"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        disabledClassName={"disabled"}
                    />
                </div>
            );
        }

        return (
            <div className='tc'>
                <h1 className='f1'>Crypto Seek</h1>
                <SearchField searchUpdate={this.onSearchChange}/>
                {
                    loading &&
                    <div className={"loading"}>
                        <HashLoader size={150}
                                    loading={this.state.loading}
                                    color={"#6F2232"}/>
                    </div>
                }
                {!loading && cardListContainer}
            </div>
        );
    }
}

export default App;