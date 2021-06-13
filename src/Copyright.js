import React from 'react'
import Typography from '@material-ui/core/Typography';
import Link from "@material-ui/core/Link";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { green, red } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";


const DotGreen = withStyles({
    root: {
        color: green[400]
    }
})(FiberManualRecordIcon);

const DotRed = withStyles({
    root: {
        color: red[400]
    }
})(FiberManualRecordIcon);

const Copyright = (props) => {
    return (
        <> 
            <Typography variant="body2" color="textSecondary" align="center">
                {props.blockHeight 
                ? 
                    <DotGreen fontSize="small" color="action" />  
                :
                    <DotRed fontSize="small" color="action" />  
                }
                BLOCK HEIGHT: {props.blockHeight}
            </Typography>

            <Typography variant="body2" color="textSecondary" align="center">
                {"Copyright © "}
                <Link color="inherit" href="https://anchor.gold/">
                Anchor Gold
                </Link>{" "}
                {new Date().getFullYear()}
                {"."}
            </Typography>
        </>
    )
}

export default Copyright


