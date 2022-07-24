import React from 'react';
import { GoogleOutlined } from '@ant-design/icons';
import 'firebase/app';
import { auth } from '../firebase';
import firebase from 'firebase/app';

const Login = () => {
    return (
        <div id="login-page">
            <div id="login-card">
                <h2>Welcome to ChatterBox</h2>
                <p className='instruction'>Please sign-in with your google account to get started.</p>
                <div
                    className='login-button google'
                    onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
                >
                    <GoogleOutlined /> Sign In with Google
                </div>
            </div>
        </div>
    );
}

export default Login;