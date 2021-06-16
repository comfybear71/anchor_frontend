import React from 'react'
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {useStyles} from './styles.js'
import Box from '@material-ui/core/Box';
import Title from './Title';


const ComingSoon = (props) => {
    const classes = useStyles(props);
    return (
        <>
            <Grid item xs={12} md={12} lg={12}>
                <Paper elevation={7} className={classes.fixedCardHeight}>
                    <Box border={0} mt={4} p={4} align="center" >  
                        <Title >COMING SOON</Title>
                    </Box>
                </Paper>
            </Grid>
        </>
    )
}

export default ComingSoon

