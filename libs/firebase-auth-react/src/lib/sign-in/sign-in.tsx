import React, {useState} from "react";
import { Link } from 'react-router-dom';
import { auth } from 'firebase';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    margin: 'auto',
    '& > *': {
      margin: theme.spacing(1),
      
    },
  }
}));

export const SignIn = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth().signInWithEmailAndPassword(email, password).then(x => console.log(x)).catch(error => {
      setError("Error signing in with password and email!");
      console.error("Error signing in with password and email", error);
    });
  };

  const onChangeHandler = (event) => {
      const {name, value} = event.currentTarget;

      if(name === 'userEmail') {
          setEmail(value);
      }
      else if(name === 'userPassword'){
        setPassword(value);
      }
  };

  const classes = useStyles()
  return (
    <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.root}
      >
      <Grid item xs={8} md={3}>
          <Paper className={classes.paper}>
          <Typography gutterBottom variant="h4" component="h4">
            Welcome Back!
          </Typography>
          <Typography gutterBottom variant="h5" component="h5">
            {props.title}
          </Typography>
        <TextField
          label="Email" 
          variant="outlined"
          type="email"
          name="userEmail"
          onChange = {(event) => onChangeHandler(event)}/>
        <TextField 
          label="Password" 
          variant="outlined" 
          type="password"
          name="userPassword"
          autoComplete="current-password"
          onChange = {(event) => onChangeHandler(event)}/>

            <Button variant="contained" color="primary" onClick = {(event) => signInWithEmailAndPasswordHandler(event, email, password)}>
              Sign in
            </Button>

            <Button color="primary">
              Forgot Password
            </Button>
          </Paper>
      </Grid>
    </Grid>
  );
};
export default SignIn;