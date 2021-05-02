import React from "react";

import {useState, useEffect} from 'react';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { Auth_IsLoggedIn } from 'prepareAPI';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Order_Order } from 'prepareAPI';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import Chip from '@material-ui/core/Chip';
import CropFreeIcon from '@material-ui/icons/CropFree';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import StarIcon from '@material-ui/icons/Star';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import { Order_ReturnedOrders, Order_QrCode, Cart_RemoveToCart } from 'prepareAPI';
import { ParseJWT } from 'common';
import AssignmentReturnIcon from '@material-ui/icons/AssignmentReturn';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import {DialogOrder} from 'components'

import { useHistory } from "react-router-dom";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    borderRadius:8,
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  media: {
    height: 140,
  },
  appBarInput:{
    alignItems:'center',
    justifyContent:'center',
    height:'200px',
    fontSize:'14pt',
  },
  err:{
    alignItems:'center',
    justifyContent:'center',
    fontSize:'14pt',
    color:'red',
  }
}));
const CartCard = ({ id,getCart }) => {
  const classes = useStyles();

  const history = useHistory();
  var userId = ParseJWT().jti;


  const handleElementRemoval = (bookId) =>{
    Cart_RemoveToCart(userId,bookId).then((res)=>{
      getCart();
      document.getElementById('ShoppingCartIcon').click();
    })
  }


    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const handleClicksetOpenSnackbar = () => {
        setOpenSnackbar(true);
    };

    const handleClosesetOpenSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
    }

    setOpenSnackbar(false);

    };


  return(
    <div className={classes.root}>
      <Grid >
        <List>
          <ListItem>
              <ListItemIcon>
                <LibraryBooksIcon  style={{ fontSize: 40 }} />
              </ListItemIcon>
              <ListItemText primary={id.bookName.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); })} />
              <Chip label={'Book ID - '+ id.book_id} variant="outlined" />
              ---
              <Chip label={'Item - '+ id.id} variant="outlined" />
              <div
                 style = {{cursor: 'pointer',marginLeft: 10}}
                 variant="outlined"
                 onClick={()=>handleElementRemoval(id.id)}>
                <RemoveShoppingCartIcon color="error"/>
              </div>
            </ListItem>
            <Divider/>
            <ListItem>
                <DialogOrder id={id.id} getCart={getCart} setOpenSnackbar={setOpenSnackbar}/>
            </ListItem>
          </List>
        </Grid>

        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClosesetOpenSnackbar}>
          <Alert onClose={handleClosesetOpenSnackbar} severity="success">
            This is a success message!
          </Alert>
        </Snackbar>

      </div>
  );

};

export default CartCard;
