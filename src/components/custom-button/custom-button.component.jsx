import React from 'react';
import './custom-button.style.scss';
const CustomButton = ({children, claz, ...restProps}) => {
    const btn = claz ? claz : 'btn btn-secondary btn-sm';

    return (
      <button className={`custom-button ${btn}`} {...restProps}>
        {children}
      </button>
    );
}

export default CustomButton;
