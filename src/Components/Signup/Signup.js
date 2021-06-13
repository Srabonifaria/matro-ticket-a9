import React, { useContext } from 'react';
import './Signup.css'
import facebook from './../images/fblogo.png'
import google from './../images/googlelogo.png'
import { Link } from 'react-router-dom';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../Login/firebase.config';
import { useHistory, useLocation } from 'react-router-dom'
import { UserContext } from '../../App';




if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}



const SignUp = () => {

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/destination" } };
    const [  setLoggedInUser] = useContext(UserContext);



    const handleSignupWithFb = () => {
        const fbProvider = new firebase.auth.FacebookAuthProvider();
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signInUser = { name: displayName, email }
                setLoggedInUser(signInUser);
                history.replace(from);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }


    const handleSignupWithGoogle = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signInUser = { name: displayName, email }
                setLoggedInUser(signInUser);
                history.replace(from);
                // ...
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-3">
                </div>
                <div className="col-md-6 form-div">
                    <form action="" >
                        {

                        }
                        <h1>Sign Up</h1>
                        <div>
                            <input type="text" placeholder="Name" required />
                            <br /> <br />
                            <input type="email" placeholder="Email" required />
                            <br /> <br />
                            <input type="password" placeholder="Password" required />
                            <br /> <br />
                            <input type="password" placeholder="Confirm Password" required />
                            <br /> <br />
                            <input className="login-btn" type="submit" value="Sign Up" />
                        </div>
                        <br />
                        <p> have an account? <Link style={{ color: 'lightcoral' }} to="/login">Login</Link></p>
                    </form>
                    <br />
                    <h4> or </h4>
                    <br />
                    <div className="loginWithsocial">
                    <button onClick={handleSignupWithGoogle}> <img src={google} alt="" /> Continue with Google</button>
                        
                        <br /> <br />
                        <button onClick={handleSignupWithFb}> <img src={facebook} alt="" /> Continue with Facebook</button>
                    </div>
                </div>
                <div className="col-md-3">
                </div>
            </div>
        </div>
    );
};

export default SignUp;