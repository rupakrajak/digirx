import React, { useRef, useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "../styles/ReceiverScreen.css";
import cal_on from "../images/phone-solid.svg";
import cal_off from "../images/phone-slash-solid.svg";
import { AppContext } from "./AppContext";

const CallerScreen = () => {
    const history = useHistory();
    const {myVideo, uncallUser, rejectCall, acceptCall} = useContext(AppContext)

    // let audioEl;
    // useEffect(() => {
    //     audioEl = new Audio("../sounds/Ringtone.mp3");
    //     audioEl.crossOrigin = "anonymous";
    //     audioEl.play();
    //     console.log(audioEl);
    //     navigator.mediaDevices
    //         .getUserMedia({
    //             video: { aspectRatio: 0.625 },
    //             audio: true,
    //         })
    //         .then((currentStream) => {
    //             myVideo.current.srcObject = currentStream;
    //         });

    //     return () => {
    //         history.push("/dashboard");
    //         console.log("Video Unmount");
    //     };
    // }, []);

    return (
        <div className="ReceiverScreen">
            <div id="panel">
                <h6>R</h6>
                <div id="controls">
                    <button id="cal_on" onClick={acceptCall}>
                        <img src={cal_on} />
                    </button>
                    <button id="cal_off" onClick={rejectCall}>
                        <img src={cal_off} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CallerScreen;
