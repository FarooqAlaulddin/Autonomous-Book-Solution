 import React , { useEffect, useState } from 'react'
 import InputLabel from '@material-ui/core/InputLabel';
 import InputAdornment from '@material-ui/core/InputAdornment';
 import FormControl from '@material-ui/core/FormControl';
 import Button from '@material-ui/core/Button';
 import Input from '@material-ui/core/Input';
 import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
 import { makeStyles } from '@material-ui/styles';

 const useStyles = makeStyles(theme => ({
   root: {
     flexGrow: 1,
     padding: theme.spacing(4),
     width: '100%',
   },
   Alert: {
   width: '100%',
   '& > * + *': {
     marginTop: theme.spacing(2),
     }
   },
   spacing: {
     marginTop: "0px"
   },
   header: {
     marginTop: "40px",
     fontWeight: 600
   },
   button: {
     color: "orange"
   },
   commentbox: {
     padding:'5px',
     width:'100%',
   }
 }
 ));

 function PostCard(props){

   const classes = useStyles();
   const [post,setPost] = useState();

   return (
     <div>
              <Input className={classes.commentbox}
                 id="standard-adornment-weight"
                 value={post}
                 onChange={e => setPost(e.target.value)}
                 endAdornment={
                   <InputAdornment position="end">
                     <Button style={{background:'#3f51b5',color:'white'}} size="small" variant="outlined">POST</Button>
                   </InputAdornment>
                 }
                 startAdornment={
                   <InputAdornment position="start">
                     <InputAdornment position="start"><b>thoughts?</b> <ArrowForwardIosIcon fontSize='small'/></InputAdornment>
                   </InputAdornment>
                 }
                 aria-describedby="standard-weight-helper-text"
               />
     </div>
   );
 };

export default PostCard;
