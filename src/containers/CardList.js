import React, {Component} from 'react';
import Card from "../components/Card";

class CardList extends Component {
    render() {
        console.log("end");
        let coinPrices = this.props.coinPrices;
        let finalCoins = this.props.coins.map((coin, i) => {
            let price = coinPrices[coin.Symbol];

            if (price === undefined) {
                price = "Not available :(";
            } else {
                price = price['USD'].toString();
            }

            return (
                <span>
                    <Card key={i}
                          price={price}
                          name={coin.CoinName}
                          img={coin.ImageUrl}
                    />
                </span>
            )
        });
        return (
            <div>
                {finalCoins}
            </div>
        )
    }
}

export default CardList;