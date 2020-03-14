import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { message , Spin } from 'antd';

import { register } from '../../appRedux/actions/auth'
import { RESET_ALERT } from '../../constants/ActionTypes'

const useStyles = makeStyles(theme => ({
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

export default function SignUp() {
  const classes = useStyles();

  // useState
  const [user, setUser] = useState({})

  // dispatch
  const dispatch = useDispatch()

  // selectState from reducer
  const alert = useSelector(state => state.alert)
  const loading = useSelector(state=> state.auth.loading)

  const onChange = (e) => {
      setUser({
          ...user,
          [e.target.name]: e.target.value
      })
  }

  useEffect(()=>{
    dispatch({ type: RESET_ALERT})
  },[])

  useEffect(() => {
      if (alert.register) {
          if (alert.isRegSuccess) {
              message.success(alert.register)
              setTimeout(() => {
                  window.location = 'login'
              }, 1000);
          } else {
              message.error(alert.register);
          }
      }
  }, [alert])

  const onSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.password2) {
        return message.error('Password do not match.', 3);
    }
    dispatch(register(user));
}

  return (
    <Spin spinning={loading} tip='Loading...'>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <form className={classes.form} onSubmit={e => onSubmit(e)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="name"
              label="Full Name"
              onChange={e => onChange(e)}
            />
            <TextField
              variant= "outlined"
              margin='normal'
              type='email'
              required
              fullWidth
              label="Email Address"
              name="email"
              onChange={e => onChange(e)}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              onChange={e => onChange(e)}
            />
            <small className="form-text">Password should contain at least at 6 chacracters, including UPPER/lowercase and numbers</small>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Confirm Password"
              type="password"
              onChange={e => onChange(e)}
            />
            
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © Your Website '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </Spin>
  );
}