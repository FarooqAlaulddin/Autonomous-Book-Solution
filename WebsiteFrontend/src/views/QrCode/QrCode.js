/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom'
import {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { ParseJWT } from 'common';
import { Order_QrCode } from 'prepareAPI';
import { OrdersCard } from 'components'
import { useHistory } from "react-router-dom";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
    width: '100%',
  },

}));

const QrCode = () => {
  const data = window.location.href.split("/").pop();
  const classes = useStyles();
  const [path, setPath] = useState();
  const history = useHistory();
  //console.log(path);

  var userId = ParseJWT().jti;

// console.log();
//   useEffect(() => {
//     Order_QrCode(orderId).then((res)=>{
//       if(JSON.stringify(res) !== JSON.stringify(path)){
//         setPath(res);
//         console.log(res);
//       }
//     })
//   },[path]);

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

    const [value, setValue] = React.useState();

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    function handleReturnedOrders(){
      history.push('/ReturnedOrders/');
    }
    function handleCheckedoutOrders(){
      history.push('/CheckedoutOrders/');
    }
    function handleAllOrders(){
      history.push('/Orders/');
    }
    function qrcodeHandler(data){
      console.log(data);
      <img ng-src={"data:image/png;base64,${data}"} />

      //ReactDOM.render(<Example data={data} />, document.getElementById('root'))

    }
  if(typeof data === 'undefined'){
      return(
        <div className={classes.root}>
           ERROR: Path to QR CODE NOT FOUND!
        </div>
      )
    }else{
      return (
        <div className="App">
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="All Orders" {...a11yProps(0)} onClick={()=>handleAllOrders()}  />
              <Tab label="Returned Books" {...a11yProps(1)} onClick={()=>handleReturnedOrders()} />
              <Tab label="Checkedout Books" {...a11yProps(2)} onClick={()=>handleCheckedoutOrders()}  />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>

          </TabPanel>
          <TabPanel value={value} index={1} >

          </TabPanel>
          <TabPanel value={value} index={2}>

          </TabPanel>
          <Button variant="contained" color="primary" onClick={()=>qrcodeHandler(data)}>
        Generate QR CODE
      </Button>


        </div>
        </div>
      );
    }

};
export default QrCode;
