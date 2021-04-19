import React, { useRef, useState, useEffect, useContext } from "react";
import "../styles/VideoCall.css";
import mic_on from "../images/microphone-solid.svg";
import cam_on from "../images/video-solid.svg";
import mic_off from "../images/microphone-slash-solid.svg";
import cam_off from "../images/video-slash-solid.svg";
import cal_off from "../images/phone-slash-solid.svg";
import { AppContext } from "./AppContext";

function VideoCall() {
    const { myVideo, othVideo, stream, endCall } = useContext(AppContext);
    console.log({ myVideo, othVideo });
    const aspectRatio = window.innerWidth / window.innerHeight;
    const initialStream = {
        video: {
            width: window.innerWidth,
            height: window.innerHeight,
            // width: 1920,
            // height: 942.5,
            // aspectRatio: (window.innerWidth * 1.25) / (window.innerHeight * 1.25),
            // facingMode: { exact: "environment" }
        },
        audio: true,
    };

    // console.log(as);

    // console.log(window.innerWidth * 1.25 + "X" + window.innerHeight * 1.25);

    // const [stream, setStream] = useState(initialStream);
    const [mic, setMic] = useState(true);
    const [cam, setCam] = useState(true);
    // const myVideo = useRef();
    // const othVideo = useRef();

    useEffect(() => {
        console.log(stream);
        myVideo.current.srcObject = stream;
        myVideo.current.srcObject.getVideoTracks()[0].applyConstraints({
            width: window.innerWidth,
            height: window.innerWidth / aspectRatio,
        });
        window.onresize = () => {
            // console.log((window.innerWidth) + " x " + (window.innerHeight));
            // console.log((window.innerWidth) + " X " + (window.innerWidth*as));
            // setStream({video: { width: window.innerWidth * 1.25, height: window.innerHeight * 1.25 }, audio: true});
            myVideo.current.srcObject.getVideoTracks()[0].applyConstraints({
                width: window.innerWidth,
                height: window.innerWidth / aspectRatio,
            });
        };
        //     navigator.mediaDevices.getUserMedia(stream).then((currentStream) => {
        //         myVideo.current.srcObject = currentStream;
        //         // console.log(myVideo.current.srcObject);
        //     });
        //     navigator.mediaDevices.getUserMedia(stream).then((currentStream) => {
        //         othVideo.current.srcObject = currentStream;
        //         // console.log(myVideo.current.srcObject);
        //     });
        return () => {
            window.onresize = null;
        };
    }, []);

    const onClickMic = () => {
        myVideo.current.srcObject.getAudioTracks()[0].enabled = !myVideo.current.srcObject.getAudioTracks()[0]
            .enabled;

        setMic(!mic);
    };
    const onClickCam = () => {
        myVideo.current.srcObject.getVideoTracks()[0].enabled = !myVideo.current.srcObject.getVideoTracks()[0]
            .enabled;
        setCam(!cam);
    };

    // const onClickMyVideo = () => {
    //     let temp = myVideo.current.srcObject;
    //     myVideo.current.srcObject = othVideo.current.srcObject;
    //     myVideo.current.srcObject = temp;
    // }

    return (
        <div className="VideoCall">
            <div id="screen-wrapper">
                <div id="video-wrapper">
                    <video
                        ref={othVideo}
                        autoPlay
                        type="video/mp4"
                        // media="all and (max-width: 1080px)"
                        className="temp"
                    />
                    <video
                        ref={myVideo}
                        autoPlay
                        type="video/mp4"
                        // media="all and (max-width: 1080px)"
                        className="temp1"
                        // onClick={onClickMyVideo}
                    />
                </div>
                <div id="controls">
                    {/* <div id="mute" onClick={mute}>
                        <img src={micon} />
                    </div>
                    <div id="no-video" onClick={cam}>
                        Cam
                    </div> */}
                    <button id="mic" onClick={onClickMic}>
                        <img src={mic ? mic_on : mic_off} />
                    </button>
                    <button id="cal" onClick={endCall}>
                        <img src={cal_off} />
                    </button>
                    <button id="cam" onClick={onClickCam}>
                        <img src={cam ? cam_on : cam_off} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VideoCall;
