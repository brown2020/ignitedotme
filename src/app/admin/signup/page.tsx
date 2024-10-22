"use client";

import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, User } from "firebase/auth";
import { NextPage } from "next";
import React, { useEffect } from "react";
import { auth, db } from "../../../firebase";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Signup: NextPage = () => {
    const router = useRouter();
    const provider = new GoogleAuthProvider();

    useEffect(() => {
        const signUpButton = document.getElementById("signUp");
        const signInButton = document.getElementById("signIn");
        const container = document.getElementById("containerr");

        signUpButton?.addEventListener("click", () => {
            container?.classList.add("right-panel-active");
        });

        signInButton?.addEventListener("click", () => {
            container?.classList.remove("right-panel-active");
        });

        return () => {
            signUpButton?.removeEventListener("click", () => { });
            signInButton?.removeEventListener("click", () => { });
        };
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                localStorage.setItem('user', JSON.stringify(currentUser));
            } else {
                localStorage.removeItem('user');
            }
        });

        return () => unsubscribe();
    }, []);

    const googleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            localStorage.setItem('user', JSON.stringify(result.user));
            await saveUserToFirestore(result.user);
        } catch (error) {
            console.error("Sign-in error:", error);
            toast.error("Sign-in failed. Please try again.");
        }
    };

    const saveUserToFirestore = async (user: User) => {
        if (!user) return;

        try {
            const userRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userRef);

            if (!userDoc.exists()) {
                await setDoc(userRef, {
                    uid: user.uid,
                    display_name: user.displayName,
                    email: user.email,
                    photo_url: user.photoURL,
                    created_at: new Date(),
                    is_admin: false
                });
                toast.success('User added successfully');
            } else {
                toast.success('User already exists');
            }

            const token = await auth.currentUser?.getIdToken(true);
            localStorage.setItem('token', token || "");
            router.push("/admin");
        } catch (error) {
            console.log('Error adding user to Firestore:', error);
            toast.error("Error adding user to Firestore.");
        }
    };

    return (
        <div className="w-full flex flex-col justify-center items-center  admin-section">
            <div className="containerr bg-[#14151B]" id="containerr">
                <div className="px-10 form-container sign-in-container flex justify-center items-center">
                    <div className="flex flex-col gap-6 w-full">
                        <h1 className="text-orange-400 mb-4 text-center text-6xl">Login</h1>
                        <div className="flex flex-col gap-4">
                            <div className="w-full main-contain flex gap-2  justify-center">
                                <button
                                    className="h-10 max-w-[220px] flex items-center bg-white text-black rounded-sm gap-2 p-2 text-left w-full"
                                    onClick={googleSignIn}
                                >
                                    <svg width="25px" height="25px" viewBox="0 0 118 120" version="1.1">
                                        <title>google_buttn</title>
                                        <desc>Created with Sketch.</desc>
                                        <defs />
                                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                            <g id="Artboard-1" transform="translate(-332.000000, -639.000000)">
                                                <g id="google_buttn" transform="translate(332.000000, 639.000000)">
                                                    <g id="logo_googleg_48dp">
                                                        <path d="M117.6,61.3636364 C117.6,57.1090909 117.218182,53.0181818 116.509091,49.0909091 L60,49.0909091 L60,72.3 L92.2909091,72.3 C90.9,79.8 86.6727273,86.1545455 80.3181818,90.4090909 L80.3181818,105.463636 L99.7090909,105.463636 C111.054545,95.0181818 117.6,79.6363636 117.6,61.3636364 L117.6,61.3636364 Z" id="Shape" fill="#4285F4" />
                                                        <path d="M60,120 C76.2,120 89.7818182,114.627273 99.7090909,105.463636 L80.3181818,90.4090909 C74.9454545,94.0090909 68.0727273,96.1363636 60,96.1363636 C44.3727273,96.1363636 31.1454545,85.5818182 26.4272727,71.4 L6.38181818,71.4 L6.38181818,86.9454545 C16.2545455,106.554545 36.5454545,120 60,120 L60,120 Z" id="Shape" fill="#34A853" />
                                                        <path d="M26.4272727,71.4 C25.2272727,67.8 24.5454545,63.9545455 24.5454545,60 C24.5454545,56.0454545 25.2272727,52.2 26.4272727,48.6 L26.4272727,33.0545455 L6.38181818,33.0545455 C2.31818182,41.1545455 0,50.3181818 0,60 C0,69.6818182 2.31818182,78.8454545 6.38181818,86.9454545 L26.4272727,71.4 L26.4272727,71.4 Z" id="Shape" fill="#FBBC05" />
                                                        <path d="M60,23.8636364 C68.8090909,23.8636364 76.7181818,26.8909091 82.9363636,32.8363636 L100.145455,15.6272727 C89.7545455,5.94545455 76.1727273,0 60,0 C36.5454545,0 16.2545455,13.4454545 6.38181818,33.0545455 L26.4272727,48.6 C31.1454545,34.4181818 44.3727273,23.8636364 60,23.8636364 L60,23.8636364 Z" id="Shape" fill="#EA4335" />
                                                        <path d="M0,0 L120,0 L120,120 L0,120 L0,0 Z" id="Shape" />
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                    <span className="firebaseui-idp-text-long">
                                        Sign in with Google
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start your journey with us</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
