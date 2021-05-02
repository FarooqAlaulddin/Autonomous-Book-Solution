import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '1px 1px 1px 1px',
    margin:'2px 2px 1px 1px'
  }
}));



export default function Slots(props) {
  const classes = useStyles();
  const [selected, setSelected] = useState([]);


  function convert(input) {
    return moment(input, 'HH:mm:ss').format('h:mm A');
  }

  const handleclick = (e) =>{
    props.setSelectedfreeSlot(e)
    setSelected(e)
    color = 'primary'
  }

  let color = 'secondary';
  let disabled = false;

  if(props.slot.taken == 1){
    color = '';
    disabled = true;
  }

  if (props.SelectedfreeSlot == props.slot){
    color = 'primary';
  }

  //console.log(props)
  return (
        <Chip className={classes.root}
          label={convert(props.slot.pickup_time)}
          color={props.color}
          onClick={(e)=>handleclick(props.slot)}
          disabled = {disabled}
        />
  );
}
