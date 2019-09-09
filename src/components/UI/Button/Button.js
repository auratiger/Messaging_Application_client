import React from 'react';
import classes from './Button.module.css';

const Button = (props) => (
    <button className={props.class || classes.Button} 
            type={props.type} 
            onClick={props.clicked}>
                                    {props.text}
    </button>
);

export default Button;