import React from 'react';
import Card from "./Card";

const baseUrl = 'https://www.cryptocompare.com';

const CardList = ({coins}) => {
    return (
        <div>
            {
                coins.map((coin, i) => {
                    let imageUrl = baseUrl + coins[i].ImageUrl;

                    return (
                        <Card key={coins[i].id}
                              id={coins[i].id}
                              price={coins[i].Price}
                              name={coins[i].CoinName}
                              img={imageUrl}
                        />
                    );
                })
            }
        </div>
    );
};

export default CardList;