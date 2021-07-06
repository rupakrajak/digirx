import React, { useState, useEffect, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "./AppContext";
import "../styles/Dashboard.css";
import axios from "axios";
import cal_on from "../images/phone-solid.svg";
import prescription from "../images/prescription.svg";
import notification from "../images/notification.svg";
import chat from "../images/chat.svg";
import man from "../images/man.svg";
import medicine from "../images/medicine.svg";
import calendar from "../images/calendar.svg";
import CallerScreen from "./CallerScreen";
import ReceiverScreen from "./ReceiverScreen";
import SearchBar from "./SearchBar";
import Tilt from "react-vanilla-tilt";

const Dashboard = () => {
    // const history = useHistory();
    const initialState = {
        category: "health-worker",
        URL: "http://localhost:8000/users/search/health-worker",
        text: "doctor",
    };
    const [inpute, setInpute] = useState("");
    const [state, setState] = useState(initialState);
    const [value, setValue] = useState("");
    const [results, setResults] = useState([]);
    const cardStyle = {
        "transform-style": "preserve-3d",
        margin: "20px",
        padding: "0",
        "flex-grow": "1",
        display: "flex",
        "flex-direction": "column",
        "justify-content": "center",
        "align-items": "center",
        height: "100%",
        "border-radius": "10px",
        width: "100%",
    };

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

    const displaySearchResults = () => {
        if (state.category === "clinical-labs")
            return [
                results.map((item) => {
                    return <div id="clinical-lab-card"></div>;
                }),
            ];

        if (state.category === "health-worker")
            return [
                results.map((item) => {
                    return (
                        <div id="health-worker-card" className="profile-card">
                            <div className="profile-image"></div>
                            <div id="health-worker-detail">
                                <h5>{`${item.details[0].title}`}</h5>
                                <h3>{`${item.name.firstname} ${item.name.middlename} ${item.name.lastname}`}</h3>
                                <h6>{`${item.details[0].degrees[0].degree.name} (${item.details[0].degrees[0].degree.abbreviation}), ${item.details[0].degrees[1].degree.name} (${item.details[0].degrees[1].degree.abbreviation})`}</h6>
                                <h4>{`Gender: ${item.gender}`}</h4>
                                <h4>{`Email: ${item.email}`}</h4>
                                <h4>{`Mobile: ${item.mobile}`}</h4>
                            </div>
                            <div className="profile-card-buttons">
                                <button id="req-pres">
                                    Request prescription
                                </button>
                                <button id="call" onClick={onClickCall} >Call</button>
                            </div>
                        </div>
                    );
                }),
            ];

        if (state.category === "general")
            return [
                results.map((item) => {
                    return (
                        <div id="general-card" className="profile-card">
                            <div className="profile-image"></div>
                            <div id="user-detail">
                                <h3>{`${item.name.firstname} ${item.name.middlename} ${item.name.lastname}`}</h3>
                                <h4>{`Gender: ${item.gender}`}</h4>
                                <h4>{`Email: ${item.email}`}</h4>
                                <h4>{`Mobile: ${item.mobile}`}</h4>
                            </div>
                            <div className="profile-card-buttons">
                                <button id="view-pres">
                                    View prescription
                                </button>
                                <button id="write-pres">
                                    Write prescription
                                </button>
                                <button id="call">Call</button>
                            </div>
                        </div>
                    );
                }),
            ];
        console.log(results);
    };

    const onClickCall = () => {
        console.log(inpute);
        // if (inpute != "") {
        // dummy 
        if (inpute == "") {
            console.log("entered", id, inpute, partnerID);
            // setId(input);
            setPartnerID("moriah46@yahoo.com");
            // setPartnerID(inpute);
            // console.log(id);
            setIsCalling(true);
        }
        // console.log(partnerID);
    };

    const onClickNavButtons = (category) => {
        setResults([]);
        const temp = { category };
        if (category === "general") {
            temp.URL = "http://localhost:8000/users/search/general";
            temp.text = "user";
            setState(temp);
        }
        if (category === "health-worker") {
            temp.URL = "http://localhost:8000/users/search/health-worker";
            temp.text = "doctor";
            setState(temp);
        }
        if (category === "clinical-labs") {
            temp.URL = "http://localhost:8000/clinical-labs/search";
            temp.text = "clinical lab";
            setState(temp);
        }
        console.log("called", temp);
    };

    const onClickSearch = async () => {
        console.log(value);
        const URL = `${state.URL}?query=${value}`;
        try {
            const results = await axios.get(URL);
            setResults(results.data[0].results);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="Dashboard">
            {isCalling && <CallerScreen />}
            {isReceiving && <ReceiverScreen />}
            <div id="section-wrapper">
                {/* <div id="upper-section">
                    <div id="input-area">
                        <input
                            onInput={(e) => {
                                setInpute(e.target.value);
                            }}
                        />
                        <button onClick={onClickCall}>
                            <img src={cal_on} />
                        </button>
                    </div>
                </div> */}
                <div id="upper-section">
                    <div id="navbar">
                        <div>
                            <h2>Welcome, Rupakkumar Rajak</h2>
                        </div>
                        <div>
                            <button id="view-prescription">
                                <img src={chat} />
                            </button>
                            <button id="notification">
                                <img src={notification} />
                            </button>
                        </div>
                    </div>
                    <div id="user-options">
                        <Tilt
                            options={{ max: 100, speed: 1000, scale: 1 }}
                            className="tilt"
                            style={cardStyle}
                        >
                            <div className="option-card">
                                <img src={prescription} />
                                <button>Prescription</button>
                            </div>
                        </Tilt>
                        <Tilt
                            options={{ max: 100, speed: 1000, scale: 1 }}
                            className="tilt"
                            style={cardStyle}
                        >
                            <div className="option-card">
                                <img src={calendar} />
                                <button>Appointment</button>
                            </div>
                        </Tilt>
                        <Tilt
                            options={{ max: 100, speed: 1000, scale: 1 }}
                            className="tilt"
                            style={cardStyle}
                        >
                            <div className="option-card">
                                <img src={medicine} />
                                <button>Medicine</button>
                            </div>
                        </Tilt>
                        <Tilt
                            options={{ max: 100, speed: 1000, scale: 1 }}
                            className="tilt"
                            style={cardStyle}
                        >
                            <div className="option-card">
                                <img src={man} />
                                <button>Profile</button>
                            </div>
                        </Tilt>
                    </div>
                </div>
                <div id="lower-section">
                    <div id="nav-buttons">
                        <button
                            id="patients"
                            onClick={() => onClickNavButtons("general")}
                        >
                            Patients
                        </button>
                        <button
                            id="doctors"
                            onClick={() => onClickNavButtons("health-worker")}
                        >
                            Doctors
                        </button>
                        <button id="pharmacies">Pharmacies</button>
                        <button id="hospitals">Hospitals</button>
                        <button
                            id="clinical-labs"
                            onClick={() => onClickNavButtons("clinical-labs")}
                        >
                            Clinical Labs
                        </button>
                    </div>
                    <div id="search-bar">
                        <SearchBar
                            data={state}
                            value={value}
                            setValue={setValue}
                        />
                    </div>
                    <button id="search-button" onClick={onClickSearch}>
                        Search
                    </button>
                    <div id="search-results">
                        {results.length !== 0 ? displaySearchResults() : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
