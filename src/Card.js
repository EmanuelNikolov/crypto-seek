import React from 'react';

const Card = ({id, name, img}) => {
    return (
        <div className="flex-auto header br4 dib pa3 ma2 grow bw2 shadow-5">
            <img alt={name} src={img}/>
            <div>
                <h2 className='f5'>{name}</h2>
            </div>
        </div>
    );
};

export default Card;