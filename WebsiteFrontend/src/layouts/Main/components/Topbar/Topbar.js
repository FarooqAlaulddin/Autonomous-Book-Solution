import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { fade } from '@material-ui/core/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchBar from "material-ui-search-bar";
import { withStyles } from '@material-ui/core/styles';

import { useHistory } from "react-router-dom";

import { Auth_Logout } from 'prepareAPI';
import { SearchBar_SearchBar } from 'prepareAPI';
import { Cart_Cart } from 'prepareAPI';
import { ParseJWT } from 'common';



const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 5px',
  },
}))(Badge);

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  title: {
  display: 'none',
  [theme.breakpoints.up('sm')]: {
    display: 'block',
  },
},

}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;
  const history = useHistory();
  const [getValue, setValue] = useState()
  const classes = useStyles();
  const [orders, setOrders] = useState([])

  const [notifications] = useState([]);

  const Logout = () =>{
    Auth_Logout()
    history.push('/Auth');

  }

  //console.log('Topbar ===>>>',orders)
  var userId = ParseJWT().jti;

  useEffect(() => {
    Cart_Cart(userId).then((res)=>{
      if(res !== undefined && (JSON.stringify(res) !== JSON.stringify(orders))){
        setOrders(res);
        //console.log('--------------------------',res)
      }
    })
  },[orders]);


  const forceUpdateShoppingCartIcon = () =>{
    Cart_Cart(userId).then((res)=>{
      if(res !== undefined && (JSON.stringify(res) !== JSON.stringify(orders))){
        setOrders(res);
        //console.log('--------------------------',res)
      }else{
        setOrders([]);
      }
    })
  }

  var str="";
  function doSomethingWith (value){
    if(value===null || value==="" || value===""){

    }else{
      history.replace('/SearchBar/'+value);
    }
  }

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <div>
       <img src = "http://localhost:3030/abs_fe/public/images/logos/ABS_Logo.png" style={{height:'50px'}}/>
       </div>


        <div className={classes.flexGrow} />
        <SearchBar
          onChange={(searchVal) => doSomethingWith(searchVal)}
          onRequestSearch={(searchVal) => doSomethingWith(searchVal)}

        />
        <Hidden mdDown>

          <IconButton color="inherit">
            <IconButton aria-label="cart" color="inherit">
              <StyledBadge badgeContent={orders.length} color="secondary" id="ShoppingCartIcon" onClick={()=>forceUpdateShoppingCartIcon()}>
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </IconButton>
          <IconButton
            className={classes.signOutButton}
            onClick={Logout}
            color="inherit"
          >
            <InputIcon />
          </IconButton>
        </Hidden>

        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>

      </Toolbar>

    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
