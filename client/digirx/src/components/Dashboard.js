import React, { useState, useEffect, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "./AppContext";
import "../styles/Dashboard.css";
import cal_on from "../images/phone-solid.svg";
import CallerScreen from "./CallerScreen";
import ReceiverScreen from "./ReceiverScreen";

const Dashboard = () => {
    // const history = useHistory();

    const [inpute, setInpute] = useState("");
    let {
        callUser,
        isCalling,
        isReceiving,
        setPartnerID,
        partnerID,
        id,
        setId,
        setIsCalling,
        setIsReceiving,
    } = useContext(AppContext);
    let timeOut;

    // useEffect(() => {
    //     if (state) {
    //         console.log("Mount");
    //         timeOut = setTimeout(() => {
    //             myVideo.current.srcObject.getVideoTracks()[0].stop();
    //             myVideo.current.srcObject.getAudioTracks()[0].stop();
    //             console.log("Called");
    //             setState(false);
    //         }, 10000);
    //     }
    //     return () => {
    //         console.log("Unmount");
    //         clearTimeout(timeOut);
    //     };
    // }, [state]);

    const onClickCall = () => {
        console.log(inpute);
        if (inpute != "") {
            console.log("entered", id, inpute, partnerID);
            // setId(input);
            setPartnerID(inpute);
            // console.log(id);
            setIsCalling(true);
        }
        // console.log(partnerID);
    };

    return (
        <div className="Dashboard">
            <div id="input-area">
                <input
                    onInput={(e) => {
                        setInpute(e.target.value);
                    }}
                />
                <button onClick={onClickCall}><img src={cal_on} /></button>
            </div>
            {isCalling && <CallerScreen />}
            {isReceiving && <ReceiverScreen />}
        </div>
    );
};

export default Dashboard;
