import React from 'react';
import {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import { ParseJWT } from 'common';
import { Grid } from '@material-ui/core';
import { CartCard } from 'components'
import { Cart_AddToCart, Cart_Cart } from 'prepareAPI';
import {Alert,AlertTitle} from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
    width: '100%',
  },

}));

const Cart = () => {

  const classes = useStyles();
  const [cart, setCart] = useState([])

  //console.log(cart);

  var userId = ParseJWT().jti;

  function refreshPage(){
    window.location.reload(false);
  }
  useEffect(() => {
    Cart_Cart(userId).then((res)=>{
      if(JSON.stringify(res) !== JSON.stringify(cart)){
        setCart(res);
      }
    })
  },[cart]);

  const getCart = () =>{

    Cart_Cart(userId).then((res)=>{
      if(JSON.stringify(res) !== JSON.stringify(cart)){
        setCart(res);
      }
    })

  }


  if(typeof cart === 'undefined'){
      return(
        <div className={classes.root}>
            <Alert severity="info">
              <AlertTitle>It looks like your cart is empty!</AlertTitle>
                Please feel free to add any book you like from the <strong>Dashboard</strong> or <strong>Recommendation</strong> features.
            </Alert>
        </div>
      )
    }else{
      return (
        <div className={classes.root} onLoad={()=>refreshPage()}>
        {cart.map(item => (
          <CartCard id={item} getCart={getCart}/>
        ))}

        </div>

    );
    }

};

export default Cart;
