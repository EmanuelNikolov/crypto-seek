import React, {Component} from 'react';
import Card from "../components/Card";

class CardList extends Component {
    render() {
        let coinPrices = this.props.coinPrices;
        let finalCoins = this.props.coins.map((coin, i) => {
            let price = coinPrices[coin.Symbol]
                ? coinPrices[coin.Symbol]["USD"].toString()
                : "Not available :(";

            return (
                <div className={"flex card-item"}>
                    <Card key={i}
                          price={price}
                          name={coin.CoinName}
                          img={coin.ImageUrl}
                    />
                </div>
            );
        });

        return (
            <div className={"flex flex-wrap justify-center"}>
                {finalCoins}
            </div>
        )
    }
}

export default CardList;