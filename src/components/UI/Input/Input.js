import React from 'react';

import classes from './Input.module.css';

const Input = (props) => {

    let element;

    switch(props.type){
        case "number":
            element = () => {
                return(
                <div className={classes.Input}>
                    <input 
                        className={classes.InputElement} 
                        type={props.type}
                        name={props.name} 
                        min="1"
                        max={props.max}
                        placeholder={props.text}
                        onChange={props.changed}/>
                </div>
            )}
            break;
        default:
            element = () => {
                return(
                <div className={classes.Input}>
                    <input 
                        className={props.valid ? classes.InputElement : classes.Error} 
                        type={props.type}
                        name={props.name} 
                        placeholder={props.text}
                        onChange={props.changed}/>
                </div>
            )}
    }

    return(
        element()
    )
}

export default Input;