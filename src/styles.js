import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textAlign: 'left'
    },
    sub_title: {
        flexGrow: 1,
        textAlign: 'center'
    },
    margin: {
        margin: theme.spacing(0.5),
    },
    customBorderRadius: {
        borderRadius: 16,
        
    },
    fixedCardHeight: {
        height: 200,
        borderRadius: 16,
    },
    appBarSpacer: {
        margin: theme.spacing(1.5),
    },
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto"
    },
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column"
    },
    fixedHeight: {
        height: 240,
        borderRadius: 16,
    },
    item2: {
        order: 3,
        [theme.breakpoints.up('sm')]: {
            order: 2,
        },
    },
    item3: {
        order: 2,
        [theme.breakpoints.up('sm')]: {
            order: 3,
        },
    },
    fixedTableHeight: {
        height: 'auto',
        borderRadius: 16,
    },
    popover: {
        pointerEvents: 'none',
    },  
    button: {
        margin: 10,
        borderRadius: 20,
        width: '40%',
        padding: 5
    },
    dialogPaper: {
        height : 'auto',
        width : '800px',
        borderRadius : '25px',
    },
    input: {
        marginLeft: 5,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    buttonDeposit: {
        margin: 10,
        borderRadius: 20,
        width: '20%',
        padding: 5,
    },
    dialog: {
        [theme.breakpoints.down('sm')]: {
            "& .MuiDialog-container .MuiDialog-paper": {
                margin: "0px 0px",
                borderRadius: '25px',
                height: '440px',
                // position: "absolute", left: "0%", top: "50%", transform: "translate(-75%,-50%)"
                transform: "translate(0%, 30%) !important"
            },
        }
    },
    dialogup: {
        [theme.breakpoints.down('sm')]: {
            "& .MuiDialog-container .MuiDialog-paper": {
                margin: "0px 0px",
                borderRadius: '0px',
                height: '240px',
                // position: "absolute", left: "0%", top: "50%", transform: "translate(-75%,-50%)"
                transform: "translate(0%, -90%) !important"
            },
        }
    },
    logo: {
        maxWidth: 120,
    },
    titleMain1: {
        flexGrow: 1,
        margin: theme.spacing(1.5),
        textAlign: 'center'
    },

})
);

export { useStyles };