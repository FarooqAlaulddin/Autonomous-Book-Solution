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
import { Social } from './components';


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

export default function Book(){
   const classes = useStyles();
   const [book,setBook] = useState();
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const bookId = window.location.href.split("/").pop();
   const [post , setPost] = useState();
   const forceUpdate = useForceUpdate();

   const randomPic = () => {
     return "https://picsum.photos/1000/400?"+ Math.random().toString(36).substring(1);;
   }

   useEffect(() => {
       Auth_IsLoggedIn().then(res=>{
         //if(JSON.stringify(res) !== JSON.stringify(isLoggedIn)){
           if(res.status !== 200) setIsLoggedIn(false)
           else setIsLoggedIn(res.data)
         //  };
         })
   },[isLoggedIn]);

   useEffect(() => {
     GetBooks(bookId).then((res)=>{
       //console.log(res.comments)
      if(JSON.stringify(res) !== JSON.stringify(book)){
         setBook(res);
       }
     });
   },[book]);

   if(!book){
     return(
       <div className={classes.Alert}>
         <Alert severity="error">
           <AlertTitle>Error</AlertTitle>
           The Book You Requsted is <strong>Not Found</strong>
         </Alert>
       </div>
     );
   }else{
     return(
       <div className={classes.root}>
       <BookCard
          isProfile={true}
          isTextExpand={true}
          imageUrl={randomPic()}
          id={book.id}
          title={book.title}
          description={book.description}
          author={book.author}
          isbn={book.isbn}
          quantity={book.quantity}
          createAt={book.createAt}
          likes={book.likes}
          comments={book.comments}
          isLoggedIn={isLoggedIn}
          setBooks={setBook}
          />

        <Divider/>
        {
          isLoggedIn &&
          <Social bookId={bookId}/>
        }
      </div>
     )
   }

 };
