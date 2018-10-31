import React, {Component} from 'react';
import SearchField from '../components/SearchField';
import ReactPaginate from 'react-paginate';
import './App.css';
import CardList from "./CardList";

class App extends Component {
    constructor(props) {
        super(props);
        this.allCoins = props.allCoins;

        this.state = {
            coins: [],
            coinPrices: {},
            offset: 0,
            pageCount: props.allCoins.length / props.perPage,
            noResults: false
        }
    }

    onSearchChange = (event) => {
        let searchValue = event.target.value;

        this.allCoins = this.allCoins.filter(coin => {
            return coin.CoinName.toLowerCase().includes(searchValue.toLowerCase());
        });
        
        if (this.allCoins.length === 0) {
            this.setState({noResults: true});

        } else {
            this.setState({pageCount: this.allCoins.length / this.props.perPage});
            this.loadCoins();
        }
    };

    loadCoins() {
        let coins = this.allCoins.slice(this.state.offset, this.state.offset + this.props.perPage);
        let coinSymbols = '';

        coins.forEach(coin => {
            coinSymbols += coin.Symbol + ',';
        });

        setTimeout(() => {
            fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coinSymbols}&tsyms=USD`)
                .then(response => response.json())
                .then(coinPrices => {
                    this.setState({coins: coins, coinPrices: coinPrices});
                });
        }, 500);
    }

    componentDidMount() {
        this.loadCoins();
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * this.props.perPage);

        this.setState({offset: offset}, () => {
            this.loadCoins();
        });
    };

    render() {
        const { noResults } = this.state;

        if (noResults) {
            return (
                <h4 className='tc white'>Nothing found :(</h4>
            )
        }

        return (
            <div className='tc'>
                <h1 className='f1'>Crypto Seek</h1>
                <SearchField searchUpdate={this.onSearchChange}/>
                <CardList coins={this.state.coins} coinPrices={this.state.coinPrices}/>
                <ReactPaginate previousLabel={"previous"}
                               nextLabel={"next"}
                               breakLabel={<a href="">...</a>}
                               breakClassName={"break-me"}
                               pageCount={this.state.pageCount}
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={5}
                               onPageChange={this.handlePageClick}
                               containerClassName={"pagination"}
                               subContainerClassName={"pages pagination"}
                               activeClassName={"active"}/>
            </div>
        );
    }
}

export default App;