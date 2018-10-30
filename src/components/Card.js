import React from 'react';

const Card = ({id, name, img, price}) => {
    return (
        <div className="flex-auto header br4 dib pa3 ma2 grow bw2 shadow-5">
            <img alt={name} src={img} height='100' width='100'/>
            <div>
                <h2 className='f5'>{name}</h2>
                <p>{price}</p>
                <p>USD</p>
            </div>
        </div>
    );
};

export default Card;