import React from 'react';

const Card = ({id, name, img, price}) => {
    let fullImageUrl = 'https://www.cryptocompare.com' + img;

    return (
        <div className="card-item header br4 dib p-2 ma2 grow bw2 shadow-5">
            <img className={"pt2"} alt={name} src={fullImageUrl} height='100' width='100'/>
            <p className={"fw7 pt2 text-truncate"}>{name}</p>
            <p>{price}</p>
            <p>USD</p>
        </div>
    );
};

export default Card;