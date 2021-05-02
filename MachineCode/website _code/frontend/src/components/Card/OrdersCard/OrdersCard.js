import React from "react";
import {useState, useEffect} from 'react';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Auth_IsLoggedIn } from 'prepareAPI';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Popper from '@material-ui/core/Popper';
import Chip from '@material-ui/core/Chip';
import CropFreeIcon from '@material-ui/icons/CropFree';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import StarIcon from '@material-ui/icons/Star';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import { Order_ReturnedOrders, Order_QrCode } from 'prepareAPI';
import { ParseJWT } from 'common';
import AssignmentReturnIcon from '@material-ui/icons/AssignmentReturn';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import { useHistory } from "react-router-dom";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));
const OrdersCard = ({ id }) => {
  const classes = useStyles();
  const history = useHistory();
  const [checkedout, setCheckedout] = useState(id.is_checkedout == 1);
  const [returned, setReturned] = useState(id.is_returned == 1);
  //const [pickedup, setpickedup] = useState(id.is_pickedup == 1);

  function HandleReturnedOrders(){
    var userId = ParseJWT().jti;
    Order_ReturnedOrders(userId).then((res)=>{
      console.log(res);
    });
  }

  function HnadleQrCodeReq(id,name){
    Order_QrCode(id).then((res)=>{
      var complete_path = res.split('\\');
      var path = 'http://localhost:3030/'+complete_path[complete_path.length-3]+'/'+complete_path[complete_path.length-2]+'/'+complete_path[complete_path.length-1];
      console.log(path);
      window.open(path, 'NAME', "width=300,height=300");
    })
  }

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

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <List component="nav" className={classes.root} aria-label="contacts">
    <ListItem>

      <ListItemIcon>
        <LibraryBooksIcon  style={{ fontSize: 40 }} />
      </ListItemIcon>

      <ListItemText primary={id.bookName.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); })} />

      <Chip label={'Book ID - '+ id.book_id} variant="outlined" />
      ---
      <Chip label={'Item - '+ id.id} variant="outlined" />
      ---
      <Chip label={'Created: '+id.create_at.substring(0,10)} variant="outlined" />
      ---
      {
      id.is_checkedout === 1 && id.is_returned === 0 && id.is_pickedup === 0 &&
      <Chip icon={<CheckCircleOutlineIcon/>} label={'Status: Ready for Pickup'} color="secondary" variant="outlined" />
      }

      {
        id.is_checkedout === 0 && id.is_returned === 1 && id.is_pickedup === 0 &&
        <Chip icon={<AssignmentReturnIcon/>} label={'Status: Returned'} color="secondary" variant="outlined" />
      }
      {
        id.is_checkedout === 1 && id.is_returned === 0 && id.is_pickedup === 1 &&
        <Chip icon={<CheckCircleIcon/>} label={'Status: Picked Up'} color="secondary" variant="outlined" />
      }
      ---
      <Chip label={'Pickup Date: '+ id.pickup_date +" at "+ id.pickup_time} variant="outlined" />

    </ListItem>

    <ListItem>
      <Chip
        icon={<CropFreeIcon />}
        label={'Get RQ-Code'}
        clickable
        color="primary"
        variant="outlined"
        onClick={()=>HnadleQrCodeReq(id.id, id.bookName)}
      />
    </ListItem>
    <br/>
    <Divider/>
  </List>


  );

};

export default OrdersCard;
