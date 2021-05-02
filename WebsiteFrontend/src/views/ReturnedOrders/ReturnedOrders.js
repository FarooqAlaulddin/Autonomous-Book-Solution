import React from 'react';
import {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { ParseJWT } from 'common';
import { Order_ReturnedOrders } from 'prepareAPI';
import { OrdersCard } from 'components'
import { useHistory } from "react-router-dom";
import {Alert,AlertTitle} from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
    width: '100%',
  },

}));

const ReturnedOrders = () => {
  const classes = useStyles();
  const [orders, setOrders] = useState([])
  const history = useHistory();
  console.log(orders);

  var userId = ParseJWT().jti;


  useEffect(() => {
    Order_ReturnedOrders(userId).then((res)=>{
      if(JSON.stringify(res) !== JSON.stringify(orders)){
        setOrders(res);
        console.log(res);
      }
    })
  },[orders]);

  //tabs
    function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

    const [value, setValue] = React.useState(1);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    function handleAllOrders(){
      history.push('/Orders/');
    }
    function handleCheckedoutOrders(){
      history.push('/CheckedoutOrders/');
    }


  if(typeof orders === 'undefined'){
      return(
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="All Orders" {...a11yProps(0)} onClick={()=>handleAllOrders()} />
              <Tab label="Returned Books" {...a11yProps(1)} />
              <Tab label="Checkedout Books" {...a11yProps(2)} onClick={()=>handleCheckedoutOrders()} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Alert severity="info">
              It looks like you did not return anything yet!
            </Alert>
          </TabPanel>
          <TabPanel value={value} index={2}>
            Checkedout Orders
          </TabPanel>
        </div>
      )
    }else{
      return (
        <div className="App">
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="All Orders" {...a11yProps(0)} onClick={()=>handleAllOrders()} />
              <Tab label="Returned Books" {...a11yProps(1)} />
              <Tab label="Checkedout Books" {...a11yProps(2)} onClick={()=>handleCheckedoutOrders()} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
          </TabPanel>
          <TabPanel value={value} index={1}>
            {orders.map(item => (
              <OrdersCard id={item} />
            ))}
          </TabPanel>
          <TabPanel value={value} index={2}>
            Checkedout Orders
          </TabPanel>
        </div>

        </div>
      );
    }

};
export default ReturnedOrders;
