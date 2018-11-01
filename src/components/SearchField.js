import React from 'react';

const SearchField = ({searchUpdate}) => {
    return (
        <div className='pa2'>
            <input className='tc pa2 ba br-pill search'
                   type='search'
                   placeholder='Search coins'
                   onChange={searchUpdate}
            />
        </div>
    );
};

export default SearchField;