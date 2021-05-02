import React,{useEffect, useState} from 'react'
import { BookCard } from 'components'
import { makeStyle, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/styles';
import { Grid, CssBaseline } from '@material-ui/core';
import { Auth_IsLoggedIn, GetBooks } from 'prepareAPI';
import { Alert, AlertTitle } from '@material-ui/lab';
import Divider from '@material-ui/core/Divider';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { Brightness3, WbSunny } from "@material-ui/icons";
import { CommentsCard } from "components";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Post } from "prepareAPI";
import { ParseJWT } from 'common';
import useForceUpdate from 'use-force-update';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  header: {
    marginTop: "10px",
    fontWeight: 600
  },
  commentbox: {
    padding:'5px',
    width:'100%',
  }
}
));


 export default function Social(props){

  const classes = useStyles();
  const [post , setPost] = useState();
  const [comments,setComments] = useState([]);

  const handlePostSubmit = () =>{
    Post(props.bookId,post,ParseJWT().jti).then(res=>{
      //console.log("COMMENTS AFTER NEW POST: ",res)
      setComments(res);
      setPost('')
      //window.location.reload();
    })
  }

  GetBooks(props.bookId).then((res)=>{
    //console.log(res.comments)
   if(JSON.stringify(res.comments) !== JSON.stringify(comments)){
       setComments(res.comments);
   }
  });
  //
  // useEffect(() => {
  //   GetBooks(props.bookId).then((res)=>{
  //    if(JSON.stringify(res.comments) !== JSON.stringify(comments)){
  //       setComments(res);
  //     }
  //   });
  // },[comments]);

  const social = () =>{
      return(
      <Input      className={classes.commentbox}
                  placeholder='Type your thoughts and use your imagination ...'
                  id="standard-adornment-weight"
                  value={post}
                  onChange={e => setPost(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <Button onClick={handlePostSubmit} style={{background:'#3f51b5',color:'white'}} size="small" variant="outlined">POST</Button>
                    </InputAdornment>
                  }
                  startAdornment={
                    <InputAdornment position="start">
                      <InputAdornment position="start"><b>thoughts?</b></InputAdornment>
                    </InputAdornment>
                  }
                  aria-describedby="standard-weight-helper-text"
      />
      )
  }


  return(
    <div className={classes.root}>
      <ThemeProvider>
      <CssBaseline>
        <Container>
          <Grid container justify="space-between" className={classes.spacing}>
            <Grid item>
              <Typography className={classes.header} variant="h4" gutterBottom>
                Comments
              </Typography>
            </Grid>
          </Grid>
            <CommentsCard comments={comments}/>
            {social()}
        </Container>
      </CssBaseline>
    </ThemeProvider>
  </div>
  )

 };
