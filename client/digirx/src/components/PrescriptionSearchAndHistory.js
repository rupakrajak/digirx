import React, { useState } from "react";
import "../styles/PrescriptionSearchAndHistory.css";
import SearchBar from "./SearchBar";
import prescription from "../images/prescription-alt.svg";
import notification from "../images/notification.svg";
import chat from "../images/chat.svg";

const PrescriptionSearchAndHistory = () => {
    const data = {
        category: "general",
        URL: "http://localhost:8000/users/search/general",
        text: "user",
    };
    const [state, setState] = useState("history");
    const [results, setResults] = useState([]);
    const [value, setValue] = useState("");
    const [historyResults, setHistoryResults] = useState([]);
    const [searchNameResults, setSearchNameResults] = useState([]);
    const [searchIdResults, setSearchIdResults] = useState([]);

    const displayHistoryResults = () => {
        return [
            <div className="prescription-history-card">
                <div className="card-title">
                    <img src={prescription} />
                    <h1 className="id">ID: 6094b6f83d73013cbc0941a0</h1>
                    <h1 className="date">Date: 2021-05-07</h1>
                </div>
                <div className="card-body">
                    <h5>
                        <span>Patient name:</span> Ethan Winters
                    </h5>
                    <h5>
                        <span>Doctor name:</span> Rupakkumar Rajak
                    </h5>
                    <h5>
                        <span>Diagnosis:</span> High blood pressure
                    </h5>
                </div>
            </div>,
            <div className="prescription-history-card">
                <div className="card-title">
                    <img src={prescription} />
                    <h1 className="id">ID: 6094b6f83d73013cbc0941a1</h1>
                    <h1 className="date">Date: 2021-05-07</h1>
                </div>
                <div className="card-body">
                    <h5>
                        <span>Patient name:</span> Rosemary Winters
                    </h5>
                    <h5>
                        <span>Doctor name:</span> Rupakkumar Rajak
                    </h5>
                    <h5>
                        <span>Diagnosis:</span> R.A.
                    </h5>
                </div>
            </div>,
            <div className="prescription-history-card">
                <div className="card-title">
                    <img src={prescription} />
                    <h1 className="id">ID: 6094b6f83d73013cbc0941a2</h1>
                    <h1 className="date">Date: 2021-05-07</h1>
                </div>
                <div className="card-body">
                    <h5>
                        <span>Patient name:</span> Mia Winters
                    </h5>
                    <h5>
                        <span>Doctor name:</span> Rupakkumar Rajak
                    </h5>
                    <h5>
                        <span>Diagnosis:</span> High fever
                    </h5>
                </div>
            </div>,
            <div className="prescription-history-card">
                <div className="card-title">
                    <img src={prescription} />
                    <h1 className="id">ID: 6094b6f83d73013cbc0941a3</h1>
                    <h1 className="date">Date: 2021-05-07</h1>
                </div>
                <div className="card-body">
                    <h5>
                        <span>Patient name:</span> Chris Redfields
                    </h5>
                    <h5>
                        <span>Doctor name:</span> Rupakkumar Rajak
                    </h5>
                    <h5>
                        <span>Diagnosis:</span> Headache
                    </h5>
                </div>
            </div>,
        ];
    };

    const displaySearchNameResults = () => {};

    const displaySearchIdResults = () => {};

    const onClickSearchNameButton = () => {};

    const onClickSearchIdButton = () => {};

    const displayHistory = () => {
        return (
            <div id="content">
                <h2>History</h2>
                <div id="history-results">
                    {/* {historyResults.length !== 0
                        ? displayHistoryResults()
                        : null} */}
                    {displayHistoryResults()}
                </div>
            </div>
        );
    };

    const displaySearchName = () => {
        return (
            <div id="content">
                <div id="search-name-bar">
                    <SearchBar data={data} value={value} setValue={setValue} />
                </div>
                <button
                    id="search-name-button"
                    onClick={onClickSearchNameButton}
                >
                    Search
                </button>
                <div id="search-name-results">
                    {searchNameResults.length !== 0
                        ? displaySearchNameResults()
                        : null}
                </div>
            </div>
        );
    };

    const displaySearchID = () => {
        return (
            <div id="content">
                <div id="search-id-bar">
                    <input
                        id="search-id-input"
                        placeholder="Type prescription ID"
                    />
                </div>
                <button id="search-id-button" onClick={onClickSearchIdButton}>
                    Search
                </button>
                <div id="search-id-results">
                    {searchIdResults.length !== 0
                        ? displaySearchIdResults()
                        : null}
                </div>
            </div>
        );
    };

    const displayContent = () => {
        if (state === "history") return displayHistory();
        if (state === "search-name") return displaySearchName();
        if (state === "search-id") return displaySearchID();
    };

    return (
        <div className="PrescriptionSearchAndHistory">
            <div id="section-wrapper">
                <div id="upper-section">
                    <div id="navbar">
                        <div>
                            <h2>Prescription</h2>
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
                </div>
                <div id="lower-section">
                    <div id="psah-nav-buttons">
                        <button
                            id="history"
                            className={
                                state === "history"
                                    ? "button focused"
                                    : "button"
                            }
                            onClick={() => {
                                if (state !== "history") setState("history");
                            }}
                        >
                            History
                        </button>
                        <button
                            id="search-name"
                            className={
                                state === "search-name"
                                    ? "button focused"
                                    : "button"
                            }
                            onClick={() => {
                                if (state !== "search-name")
                                    setState("search-name");
                            }}
                        >
                            Search by name
                        </button>
                        <button
                            id="search-id"
                            className={
                                state === "search-id"
                                    ? "button focused"
                                    : "button"
                            }
                            onClick={() => {
                                if (state !== "search-id")
                                    setState("search-id");
                            }}
                        >
                            Search by ID
                        </button>
                    </div>
                    <div id="prescription-area">{displayContent()}</div>
                </div>
            </div>
        </div>
    );
};

export default PrescriptionSearchAndHistory;
