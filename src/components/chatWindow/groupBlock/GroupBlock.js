import React from 'react';

import Grid from '@material-ui/core/Grid';
import classes from './GroupBlock.module.css';
import Button from '@material-ui/core/Button';

const groupBlock = (props) => {

    return(
        <Grid container direction="row" className={classes.groupBox}>
            <Grid>{props.name}</Grid>
            <Grid><Button>button</Button></Grid>
        </Grid>
    )

}

export default groupBlock;