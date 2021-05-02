import React from 'react';
import {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { Recommended_Recommended } from 'prepareAPI';
import { BookCard } from 'components'
import { Auth_IsLoggedIn } from 'prepareAPI';
import { ParseJWT } from 'common';
import {Alert,AlertTitle} from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
    width: '100%',
  }

}));

const randomPic = () => {
  return "https://picsum.photos/200/300?"+ Math.random().toString(36).substring(1);;
}

const Recommended = () => {
  var userId = ParseJWT().jti;
  const classes = useStyles();
  const [books,setBooks] = useState([]);
  //console.log("Before API",books);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
      Auth_IsLoggedIn().then(res=>{
        //if(JSON.stringify(res) !== JSON.stringify(isLoggedIn)){
          if(res.status !== 200) setIsLoggedIn(false)
          else setIsLoggedIn(res.data)
        //  };
        })
  },[isLoggedIn]);

  useEffect((res) => {
    Recommended_Recommended(userId).then((res)=>{
      if(JSON.stringify(res) !== JSON.stringify(books)){
        setBooks(res);

        console.log(res);
      }
    });
  },[books]);


  if(typeof books === 'undefined'){
    return(
      <div className={classes.root}>
        <Alert severity="info">
          <AlertTitle>Nothing to recommend!</AlertTitle>
            please feel free to browse our <strong>Dashboard</strong> or <strong>Recommendation</strong> features, so we can know what you like. 
        </Alert>
      </div>
    )
  }else{

    return (
      <div className={classes.root}>
        <div className={classes.root}>
          <Grid
            container
            spacing={1}
            >
            {
              books.map((book)=>(
                <BookCard
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
                  setBooks={setBooks}
                  />
              ))
            }
          </Grid>
        </div>
      </div>
    );

  }
};

export default Recommended;
