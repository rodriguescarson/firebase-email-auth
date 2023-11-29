// components/Auth.js
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import firebase_app from '../lib/firebase'
const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        const auth = getAuth(firebase_app);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('User registered successfully!');
        } catch (error) {
            console.error('Error registering user:', error.message);
        }
    };

    const handleSignIn = async () => {
        const auth = getAuth(firebase_app);
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in successfully!', user);
        } catch (error) {
            console.error('Error logging in:', error.message);
        }
    };

    return (
        <div>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignUp}>Sign Up</button>
            <button onClick={handleSignIn}>Sign In</button>
        </div>
    );
};

export default Auth;
