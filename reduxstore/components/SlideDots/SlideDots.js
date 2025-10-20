import React from 'react';


const SlideDots = (
    {
        len,
        activeItem,
        changeItem
    }
) => {

    const dots = [];
    for(let i = 0; i < len; i++) {
        let dotClass = 'owl-dot';

        if(activeItem === i) {
            dotClass += ' active';
        }

        dots.push(<button key={i}
            onClick={() => {changeItem(i)}}
            role="button"
            className={dotClass}><span></span></button>)
    }

    return (
        <div className="owl-dots">
            {dots}
        </div>
    );
};

export default SlideDots;