import React,{ useState , useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import { SidebarNav } from './components';
import { Auth_IsLoggedIn } from 'prepareAPI';
import PersonIcon from '@material-ui/icons/Person';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LockIcon from '@material-ui/icons/Lock';
import ReceiptIcon from '@material-ui/icons/Receipt';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
      Auth_IsLoggedIn().then(res=>{
          if(res.status !== 200) setIsLoggedIn(false)
          else setIsLoggedIn(res.data)
        })
  },[isLoggedIn]);


  const pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />
    },
    {
      title: 'Recommended Books',
      href: '/Recommended',
      icon: <LibraryBooksIcon/>
    },
    {
      title: 'Cart',
      href: '/Cart',
      icon: <ShoppingCartIcon/>
    },
    {
      title: 'My Orders',
      href: '/Orders',
      icon: <ReceiptIcon/>
    },
    {
      title: !isLoggedIn ? 'Authentication': 'Profile',
      href: '/Auth',
      icon:  !isLoggedIn ? <LockIcon /> : <PersonIcon/>
    }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Divider className={classes.divider} />

        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
