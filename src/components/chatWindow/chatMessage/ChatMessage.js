import React from 'react';
import classes from './ChatMessage.module.css';

const chatMessage = props => {

    //adding friends
    //TODO a pool of colors for the user messages
    //TODO the user should be able to upload an image, and have a pool of images
    //TODO delete messages
    //TODO edit messages
    //TODO store up to 30 current messages

    //TODO check how to make hocs

    // let styles = [classes.Message, classes.MyMessage, classes.blue]
    let message = props.class ? 

        <div className={classes.Line}>
            <div className={[classes.Message, classes.MyMessage, classes.blue].join(" ")}>
                {props.text}

            </div>  

            <img className={classes.MyImage} src={"data:image/png;base64," + props.image} alt="" height="42" width="42"/>
        </div>  
        
        :

        <div className={classes.Line}>
            <img className={classes.OtherImage} src={"data:image/png;base64," + props.image} alt="" height="42" width="42"/> 
            
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