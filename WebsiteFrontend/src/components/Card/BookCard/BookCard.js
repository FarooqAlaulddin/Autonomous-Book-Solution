import React, {useState,useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import CommentIcon from '@material-ui/icons/Comment';
import randomcolor from 'randomcolor';
import Divider from '@material-ui/core/Divider';
import ShowMoreText from "react-show-more-text";
import packageJson from '../../../../package.json';
import { useHistory } from "react-router-dom";

import { FormatDate } from "common";

import { LikeBook, GetBook } from 'prepareAPI';
import { Cart_AddToCart } from 'prepareAPI';
import { ParseJWT } from 'common';
const useStyles = makeStyles({
  root: {
    width:'350px',
    margin: '10px',
    width: props => props.isProfile ? '100%' : '350px',

  },
  media: {
    height: 140,
  },
  footer:{
    margin: "10px",
    padding: "5px",
    marginBottom:"40px"
  },
  order:{
    background: props => props.quantity > 0 ? "#3f51b5": "rgb(167 167 167 / 53%)",
    margin:"0",
    padding:"0",
    color:"white"
  },
  orderbtn:{
    width:"100%",
    padding:"10px",
    color:"white"
  }
});

export default function BookCard(props) {
  const classes = useStyles(props);
  const [expand, setExpand] = useState(props.isTextExpand);
  const [order, setOrder] = useState(props.quantity > 0);
  const [likes, setLikes] = useState(props.likes);
  const [comments, setComments] = useState(props.comments)
  const history = useHistory();

  const onClick = () => {
    setExpand(!expand);
  };

  // useEffect(() => {
  //   // GetBook(props.id).then((res)=>{
  //   //   if(typeof res !== 'undefined')
  //   //     setLikes(res.likes);
  //   // })
  //   setLikes(props.likes);
  // },[likes]);
  function likeHandler(bookid){
    LikeBook(bookid).then((res)=>{
      console.log(res)
      if(typeof res !== 'undefined')
        setLikes(res.data);
    })
  };

  const handleBookProfile = (id) =>{
    console.log('book with id:', id, 'is clicked');
    //let path = 'http://'+window.location.host+'/'+packageJson.basename+"/book/"+id
    //console.log(path);
    //window.location.href = path;
    history.push('/book/'+id);
  }

  const social = () =>{
    if(props.isLoggedIn){
      return(
        <Typography style={{float:"right",display: 'inline-block'}}>
          <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
              <Button size="small" color="primary" onClick={() =>likeHandler(props.id)}>
                  {likes.length}<ThumbUpAltIcon/>
              </Button>
              <Button size="small" color="primary">
                  {props.comments.length}<CommentIcon/>
              </Button>

          </ButtonGroup>
        </Typography>
      )
    }
  }
  //add the book to the cart
  function handleAddToCart(bookId){
    var userId = ParseJWT().jti;
    Cart_AddToCart(userId, bookId).then((res)=>{
      console.log(res);
    });
    document.getElementById('ShoppingCartIcon').click();
    history.push('/Cart/');
  }
  return (
    <Card key={props.id} className={classes.root}>
      <CardHeader
       avatar={
         <Avatar style={{background:randomcolor({luminosity: 'dark'})}} aria-label="recipe" className={classes.avatar}>
           {props.author.substring(0,1)}
         </Avatar>
       }
       action={
         <IconButton aria-label="settings">
           <FavoriteIcon />
         </IconButton>
       }
       title={"By "+props.author}
       subheader={"ISBN "+props.isbn}

       />
     <CardActionArea onClick={()=>handleBookProfile(props.id)}>
        <CardMedia
          className={classes.media}
          image={props.imageUrl}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography className={classes.descriptionMax} variant="body2" color="textSecondary" component="p">
            <div>
              <b>{"Published on " + FormatDate(props.createAt.substring(0,10),'yyyy-mm-dd','mm/dd/yyyy')}</b>
            </div>
            <ShowMoreText
               lines={2}
               more={"Show More"}
               less={"Show Less"}
               onClick={onClick}
               expanded={expand}
               width={props.descriptionLength}
             >
              {props.description}
             </ShowMoreText>
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider/>
      <div className={classes.footer}>
          <Typography style={{float:"left",display: 'inline-block'}}>
              <Button size="small" color="primary">
                {props.quantity + ' Copies Left'}
              </Button>
          </Typography>
            {social()}
      </div>
      <CardActions className={classes.order}>
        <Button disabled={!order} className={classes.orderbtn} onClick={()=>handleAddToCart(props.id)} size="small" color="primary">
          {order ? "GET THIS BOOK" : "UNAVAILABLE"}
        </Button>
      </CardActions>
    </Card>
  );
}

BookCard.defaultProps = {
  descriptionLength:500

}
