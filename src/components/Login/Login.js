import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) =>{
  if( action.type === 'USER_INPUT'){
    return { value:action.val, isValid:action.val.includes('@') }
  }
  if(action.type === 'INPUT_BLUR'){
    return { value: state.value, isValid: state.value.includes('@')};
  }
  return {value: '', isValid: false}
};

const Login = (props) => { 
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredcollege, setEnteredcollege] = useState('');
  const [collegeIsValid, setcollegeIsValid] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);

  const[emailState, dispatchEmail] = useReducer(emailReducer,
    {value:'', 
    isValid:false});

  // useEffect(() =>{
  //   const identifier = setTimeout(()=>{
  //     console.log('checking identify');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredcollege.trim().length > 0
  //     );

  //   }, 500);
  //   // setFormIsValid(
  //   //   enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredcollege.trim().length > 0
  //   // );
  //   return () =>{
  //     console.log("cleanup");
  //     clearTimeout(identifier);
  //   }
  // },[enteredEmail,enteredPassword,enteredcollege]);
 useEffect(() =>{
  console.log('EFFECT RUNNING');
 
  return () =>{
    console.log('EFFECT CLEANUP');
  }
 }, []);
  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    // recucer code
    dispatchEmail({type: 'USER_INPUT', val: event.target.value });

    setFormIsValid(
      event.target.value.includes('@') && enteredPassword.trim().length > 6
    );
  }
   

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    // setFormIsValid(
    //   event.target.value.trim().length > 6 && enteredEmail.includes('@')
    // );
    // reducer code below line
     
    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6
    );
   
  };

  const collegeChangeHandler = (event) => {
    setEnteredcollege(event.target.value);
  }
  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
   
  //  reducer code below line 
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const validateCollegeHandler = () => {
    setcollegeIsValid(enteredcollege.trim().length > 0);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // props.onLogin(enteredEmail, enteredPassword);
    // reducer code
    props.onLogin(emailState.value, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            // emailIsValid === false ? classes.invalid : ''
            // below rreducer code
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            // value={enteredEmail}
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collegeIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="college">College Name</label>
          <input
            type="text"
            id="college"
            value={enteredcollege}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
