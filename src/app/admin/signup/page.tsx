"use client";

import { NextPage } from "next";
import React, { useEffect } from "react";

const Signup: NextPage = () => {
    useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('containerr');

        signUpButton?.addEventListener('click', () => {
            container?.classList.add('right-panel-active');
        });

        signInButton?.addEventListener('click', () => {
            container?.classList.remove('right-panel-active');
        });

        return () => {
            signUpButton?.removeEventListener('click', () => { });
            signInButton?.removeEventListener('click', () => { });
        };
    }, []);

    return (
        <div className="flex flex-col justify-center items-center  admin-section">
            {/* <h1 className="text-orange-400 mb-6 text-center text-6xl">Ignite Admin Panel</h1> */}
            <div className="containerr bg-[#14151B]" id="containerr">
                <div className="px-10 form-container sign-up-container flex justify-center items-center">
                    <form action="#" className="flex flex-col w-full">
                        <h1 className="text-orange-400 mb-4 text-center text-6xl">Create Account</h1>
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <input type="text" placeholder="number" />
                        <input type="password" placeholder="Password" />
                        <input type="password" placeholder="Confirm Password" />
                        <button className="mt-6 text-xl py-4 px-14 form-btn mx-auto text-white rounded-xl font-semibold shadow-lg hover:shadow-none shadow-[0_10px_15px_-3px_rgba(250,250,250,0.15)]">Sign Up</button>
                    </form>
                </div>
                <div className="px-10 form-container sign-in-container flex justify-center items-center">
                    <form action="#" className="flex flex-col w-full">
                        <h1 className="text-orange-400 mb-4 text-center text-6xl">Sign in</h1>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <a href="#" className="py-2 text-xl">Forgot your password?</a>
                        <button className="mt-6 text-xl py-4 px-14 form-btn mx-auto text-white rounded-xl font-semibold shadow-lg hover:shadow-none shadow-[0_10px_15px_-3px_rgba(250,250,250,0.15)]">Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost bg-[#67b7c5] mt-6 text-xl py-4 px-14 mx-auto text-white rounded-xl font-semibold shadow-lg hover:shadow-none" id="signIn">Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start your journey with us</p>
                            <button className="ghost bg-[#67b7c5] mt-6 text-xl py-4 px-14 mx-auto text-white rounded-xl font-semibold shadow-lg hover:shadow-none" id="signUp">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
