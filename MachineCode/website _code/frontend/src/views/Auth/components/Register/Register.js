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
import { Auth_Register } from 'prepareAPI';


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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [val, setVal] = useState({
      fname: '',
      lname: '',
      email: '',
      password: '',
      dob: ''
    }
  );

  console.log(val)

  const handleSubmit = (event) => {
    console.log('here')
    event.preventDefault();

    if(
         val.fn == ''
      || val.ln == ''
      || val.email == ''
      || val.password == ''
      || val.dob == ''
    ){
      setError(true);
      setSuccess(false)

    }
    else{

      Auth_Register(val).then((res)=>{
        if(res.status === 200){
          setError(false);
          setSuccess(true)

        }
        else{
          setError(true);
          setSuccess(false)
          //props.setIsLoggedIn(false);
        }
      })
    }
  }

  return (
    <Container component="main" onSubmit={handleSubmit} maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="fname"
                variant="outlined"
                required
                fullWidth
                id="fname"
                label="First Name"
                value={val.fname}
                onChange={e=>setVal({...val,fname: e.target.value})}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lname"
                label="Last Name"
                name="lname"
                autoComplete="lname"
                value={val.lname}
                onChange={e=>setVal({...val,lname: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={val.email}
                onChange={e=>setVal({...val,email: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                 variant="outlined"
                 required
                 fullWidth
                 id="date"
                 name="dob"
                 label="Birthday"
                 type="date"
                 value={val.dob}
                 onChange={e=>setVal({...val,dob: e.target.value})}

                 InputLabelProps={{
                   shrink: true,
                 }}/>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={val.password}
                onChange={e=>setVal({...val,password: e.target.value})}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
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

      {
      success &&
      <Alert
        className="alert"
        severity="success"
        >Registration Completed.
      </Alert>
      }
    </Container>
  );
}
