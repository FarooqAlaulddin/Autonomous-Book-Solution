import React,{ useState , useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import { Auth_Login } from 'prepareAPI';
import { useHistory } from "react-router-dom";

import Cookies from 'js-cookie';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function Login(props) {
  const classes = useStyles();
  const history = useHistory();

  const [error, setError] = useState(false);
  const [val, setVal] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    Auth_Login(val).then((res)=>{
      if(res.status === 200){
        setError(false);
        //Cookies.set("jwt",res.data.token);
        localStorage.setItem('jwt', res.data.token);
        // console.log("Login: props.setIsLoggedIn => ", true)
        props.setIsLoggedIn(true);
        // props.callback();
        history.push('/');

        window.location.reload();

      }
      else{
        setError(true);
        //props.setIsLoggedIn(false);
      }
    })
  }




  // const changeName = (event) => {
  //   setVal((prevState)=>({
  //     ...prevState,
  //     [event.target.name]: event.target.value
  //   }));
  // }
  //
  // const changePass = (event) =>{
  //   setVal((prevState)=>({
  //     ...prevState,
  //     [event.target.name]: event.target.value
  //   }));
  // }

  return (
    <Container component="main" onSubmit={handleSubmit} maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="username"
            autoFocus
            value={val.email}
            onChange={e=>setVal({...val,email: e.target.value})}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            id="password"
            value={val.password}
            onChange={e=>setVal({...val,password: e.target.value})}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            value="Submit"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
        {
        error &&
        <Alert
          className="alert"
          severity="error"
          >Error has occurred when signing in please try again.
        </Alert>
        }
</Container>
  );
}
