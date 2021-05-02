import React from 'react';
import {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { SearchBar_SearchBar } from 'prepareAPI';
import { BookCard } from 'components'
import { Auth_IsLoggedIn } from 'prepareAPI';
import { ParseJWT } from 'common';

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

const SearchBar = () => {
  const keyword = window.location.href.split("/").pop();
  const classes = useStyles();
  const [books,setBooks] = useState([]);

  console.log(keyword);

  useEffect((res) => {
    console.log(keyword);
    SearchBar_SearchBar(keyword).then((res)=>{

      if(JSON.stringify(res) !== JSON.stringify(books)){
        setBooks(res);
      }
    });
  },);

  if(typeof books === 'undefined'){
    return(
      <div className={classes.root}>
        No Books Found
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

export default SearchBar;
