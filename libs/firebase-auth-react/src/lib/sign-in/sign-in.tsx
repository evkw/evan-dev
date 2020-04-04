import React, {useState} from "react";
import { Link } from 'react-router-dom';
import { auth } from 'firebase';
import './sign-in.scss';

export const SignIn = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const signInWithEmailAndPasswordHandler = (event,email, password) => {
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

  return (
    <div className="sign-in-container">
      <h1>{props.title}</h1>
      <h1>Log in to your account</h1>
      <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        {error !== null && <div className = "py-4 bg-red-600 w-full text-white text-center mb-3">{error}</div>}
        <form className="">
          <input
            type="email"
            name="userEmail"
            value = {email}
            placeholder="Email Address"
            onChange = {(event) => onChangeHandler(event)}
          />
          <input
            type="password"
            className="mt-1 mb-3 p-1 w-full"
            name="userPassword"
            value = {password}
            placeholder="Password"
            onChange = {(event) => onChangeHandler(event)}
          />
          <button onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
            Sign in
          </button>
        </form>
        <p className="text-center my-3">or</p>
        <button
          className="bg-red-500 hover:bg-red-600 w-full py-2 text-white">
          Sign in with Google
        </button>
        <p className="text-center my-3">
          Don't have an account?{" "}
          <Link to="signUp" className="text-blue-500 hover:text-blue-600">
            Sign up here
          </Link>{" "}
          <br />{" "}
          <Link to = "passwordReset" className="text-blue-500 hover:text-blue-600">
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignIn;