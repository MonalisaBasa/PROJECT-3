import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) =>{
  if( action.type === 'USER_INPUT'){
    return { value:action.val, isValid:action.val.includes('@') }
  }
  if(action.type === 'INPUT_BLUR'){
    return { value: state.value, isValid: state.value.includes('@')};
  }
  return {value: '', isValid: false}
};

const passwordReducer = (state, action) =>{
  if( action.type === 'USER_INPUT'){
    return { value:action.val, isValid:action.val.trim().length > 6 }
  }
  if(action.type === 'INPUT_BLUR'){
    return { value: state.value, isValid: state.value.trim().length > 6};
  }
  return {value: '', isValid: false};
};

const Login = (props) => { 
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [enteredcollege, setEnteredcollege] = useState('');
  // const [collegeIsValid, setcollegeIsValid] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);

  const[emailState, dispatchEmail] = useReducer(emailReducer,
    {value:'', 
    isValid:false
  });

  const[passwordState,dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
    })
   const authCtx = useContext(AuthContext);

   
  

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

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
 useEffect(() =>{
  console.log('EFFECT RUNNING');
 
  return () =>{
    console.log('EFFECT CLEANUP');
  }
 }, []);

 const { isValid: emailIsValid} = emailState;
 const { isValid: passwordIsValid} = passwordState;

 useEffect(()=>{
  const identifier = setTimeout(()=>{
    console.log('checking form validity');
    setFormIsValid(emailIsValid && passwordIsValid);
  },500);
 

 return () =>{
      console.log("cleanup");
      clearTimeout(identifier);
    }
  },[emailIsValid,passwordIsValid]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    // recucer code
    dispatchEmail({type: 'USER_INPUT', val: event.target.value });

    // setFormIsValid(
    //   event.target.value.includes('@') && enteredPassword.trim().length > 6
    // );
  }
   

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);

    // setFormIsValid(
    //   event.target.value.trim().length > 6 && enteredEmail.includes('@')
    // );
    // reducer code below line
     
    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6
    // );
   
  };

  // const collegeChangeHandler = (event) => {
  //   setEnteredcollege(event.target.value);
  // }
  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
   
  //  reducer code below line 
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type: 'INPUT_BLUR'});
  };

  // const validateCollegeHandler = () => {
  //   setcollegeIsValid(enteredcollege.trim().length > 0);
  // };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid){
      authCtx.onLogin(emailState.value, passwordState.value);
    }
    else if(!emailIsValid){

       emailInputRef.current.focus();
    }
    else{
      passwordInputRef.current.focus();
    }
    // props.onLogin(enteredEmail, enteredPassword);
    // reducer code
    // props.onLogin(emailState.value, enteredPassword);
    // props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
        ref={emailInputRef}
        id="email" 
        label="E-mail" 
        type="email"
        isValid={emailIsValid} 
        value={emailState.value}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}
        />
        {/* <div
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
        </div> */}
        <Input 
        ref={passwordInputRef}
        id="password" 
        label="Password" 
        type="password"
        isValid={passwordIsValid} 
        value={passwordState.value}
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler}
        />
        {/* <div
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
        </div> */}
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
