import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from "../Firebase/firebase.config.js";
import useAxiosPublic from "../Hooks/useAxiosPublic.jsx";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleSignIn = () => {
        setLoading(true);
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider);
    };

    const githubSignIn = () => {
        setLoading(true);
        const githubProvider = new GithubAuthProvider();
        return signInWithPopup(auth, githubProvider);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    // Ovserver On State Change
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (mainUser) => {
            console.log(mainUser);
            setUser(mainUser);
            if (mainUser) {
                //do something
                const userInfo = { email: mainUser.email };
                axiosPublic.post("/jwt", userInfo).then((res) => {
                    // console.log(res.data);
                    if (res.data.token) {
                        localStorage.setItem("token", res.data.token);
                    }
                });
            } else {
                //do something
                localStorage.removeItem("token");
            }
            setLoading(false);
        });
        return () => unSubscribe();
    }, [axiosPublic]);

    const info = { createUser, signInUser, user, googleSignIn, githubSignIn, logOut, loading, setLoading };

    return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.node,
};

export default AuthProvider;
