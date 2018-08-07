import React from 'react';
import Card from "./Card";

const CardList = ({coins}) => {
    return (
        <div>
            {
                coins.map((coin, i) => {
                    return (
                        <Card key={coins[i].id}
                              id={coins[i].id}
                              price={coins[i].price}
                              name={coins[i].name}
                              img={coins[i].img}
                        />
                    );
                })
            }
        </div>
    );
};

export default CardList;