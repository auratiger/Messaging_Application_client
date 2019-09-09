import React from 'react';
import classes from './ChatMessage.module.css';
import image from '../../../resources/Images/user.png';

const chatMessage = props => {

    //adding friends
    //TODO a pool of colors for the user messages
    //TODO the user should be able to ubload an image, and have a pool of images
    //TODO delete messages
    //TODO edit messages
    //TODO store up to 50 current messages

    //TODO check how to make hocs

    //this variable the conditional operator is used to decide
    // whether the message should be positiond from the user-client's side or the opposite 
    let message = props.class ? 

        <div className={classes.Line}>
            <div className={[classes.Message, classes.MyMessage].join(" ")}>
                {props.text}
            </div>

            <img className={classes.MyImage} src={image} alt="" height="42" width="42"/> 
        </div>  
        
        :

        <div className={classes.Line}>
            <img className={classes.OtherImage} src={image} alt="" height="42" width="42"/> 
            
            <div className={[classes.Message, classes.OtherMessage].join(" ")}>
                {props.text}
            </div>
        </div>

    return(
        <div className={classes.Box}>

            {message}

            <p className={props.class ? classes.MyUser : classes.OtherUser}>
                {props.class? props.time + " : " + props.user : props.user + " : " + props.time}
            </p>
        </div>
    )
}

export default chatMessage;