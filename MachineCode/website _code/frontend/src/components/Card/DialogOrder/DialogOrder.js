import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Slots } from 'components'
import { makeStyles } from '@material-ui/core/styles';
import { Order_FreeSlots } from 'prepareAPI';
import {List,ListItem} from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { Order_Order } from 'prepareAPI';
import Chip from '@material-ui/core/Chip';
import moment from 'moment';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
  },
  gridList: {
    width: 500,
    height: 450,
  },
}));

function convert(input) {

  if(input == null){
    return ''
}

  return moment(input, 'HH:mm:ss').format('h:mm A');
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



export default function DialogOrder(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [color, setColor] = React.useState('secondary');
  const [error, setError] = React.useState();

  const [freeSlots, setFreeSlots] = React.useState([]);
  const [SelectedfreeSlot, setSelectedfreeSlot] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState();

  //console.log('SelectedfreeSlot ',SelectedfreeSlot);

  const handleClickOpen = () => {
    setOpen(true);
    setSelectedDate([])
    setSelectedDate('');
    setSelectedfreeSlot([])

  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDate('');
    setFreeSlots([])
    setSelectedfreeSlot([])

  };

  const handleDateChange = (date) =>{
    setSelectedDate(date);
    Order_FreeSlots(date).then((res)=>{
      setFreeSlots(res)
      //console.log('res from Order_FreeSlots', res)
    })
  }

  const handleOrder = () =>{

    let orderId = props.id
    let convrtDate = SelectedfreeSlot.date;
    let pickup_time = SelectedfreeSlot.pickup_time;
    let pickup_time_end = SelectedfreeSlot.pickup_time_end;

    if(orderId == null || convrtDate == null || pickup_time == null || pickup_time_end == null){
      document.getElementById('AlertOnOrderId').style.display = 'block';
      return;
    }
    if(orderId == '' || convrtDate == '' || pickup_time == '' || pickup_time_end == ''){
      document.getElementById('AlertOnOrderId').style.display = 'block';
      return;
    }

    Order_Order(orderId,convrtDate, pickup_time, pickup_time_end).then((res)=>{

      document.getElementById('ShoppingCartIcon').click();
      handleClose();
      props.setOpenSnackbar(true)
      props.getCart()

    })
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Order the Book
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
              To complete the order processed, please pick a date and a time from below:
          </DialogContentText>
          <form className={classes.container} noValidate>
            <TextField
              id="datetime-local"
              label="Select a time and a date"
              type="date"
              value={selectedDate}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e)=>handleDateChange(e.target.value)}
            />
          </form>

          <br/>

          {
          SelectedfreeSlot !='' &&
          <Chip label={convert(SelectedfreeSlot.pickup_time) + " - " + convert(SelectedfreeSlot.pickup_time_end) + " at " + SelectedfreeSlot.pickup_time} variant="outlined" />
          }
          <br/>
          <br/>

          <GridList cellHeight={40} className={classes.gridList} cols={5}>
            {
              freeSlots.map(item => (
                <GridListTile key={item.pickup_time}>
                  <Slots color={color} setColor={setColor} slot={item} setSelectedfreeSlot={setSelectedfreeSlot}/>
                </GridListTile>
              ))
            }
          </GridList>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOrder} color="primary">
            Order
          </Button>
        </DialogActions>

        <Alert id="AlertOnOrderId" style={{display:'none'}} variant="filled" severity="warning">
            Please Try again.
        </Alert>

      </Dialog>

    </div>
  );
}
