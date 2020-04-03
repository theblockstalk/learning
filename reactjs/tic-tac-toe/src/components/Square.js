import React from 'react';
import './Square.css';

function Square(props) {
    let className = "square" + (props.win ? " win" : "");
    return (
        <button
        className={className}
        onClick={ props.onClick }>
        {props.value}
        </button>
    );
}

export default Square;