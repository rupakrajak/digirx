import React from "react";
import { useHistory } from "react-router-dom";
import "../styles/Home.css";
import digirx_logo from "../images/digirx-logo.svg";

const Home = () => {
    let history = useHistory();

    const onClickSignUp = () => {
        history.push("/signup");
    };

    const onClickSignIn = () => {
        history.push("/signin");
    };

    return (
        <div className="Home">
            <div id="background-wrap">
                <div id="background"></div>
            </div>
            <div id="content">
                <div id="title-container">
                    <img src={digirx_logo} alt="DigiRx logo" />
                    <div id="title">
                        <h1>DigiRx</h1>
                        <h2>A Medical Assistant</h2>
                    </div>
                </div>
                <div id="card">
                    <button onClick={onClickSignUp}>SIGN UP</button>
                    <button onClick={onClickSignIn}>SIGN IN</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
