import React, { useRef, useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "../styles/CallerScreen.css";
import mic_on from "../images/microphone-solid.svg";
import cam_on from "../images/video-solid.svg";
import mic_off from "../images/microphone-slash-solid.svg";
import cam_off from "../images/video-slash-solid.svg";
import cal_off from "../images/phone-slash-solid.svg";
import { AppContext } from "./AppContext";

const CallerScreen = () => {
    const history = useHistory();
    const {myVideo, uncallUser} = useContext(AppContext)

    const [mic, setMic] = useState(true);
    const [cam, setCam] = useState(true);
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
        <div className="CallerScreen">
            <div id="panel">
                <video ref={myVideo} autoPlay muted />
                <h6>P</h6>
                <div id="controls">
                    <button id="mic">
                        <img src={mic ? mic_on : mic_off} />
                    </button>
                    <button id="cal" onClick={uncallUser}>
                        <img src={cal_off} />
                    </button>
                    <button id="cam">
                        <img src={cam ? cam_on : cam_off} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CallerScreen;
