import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/TypePrescription.css";
import { useHistory } from "react-router-dom";
import notification from "../images/notification.svg";
import chat from "../images/chat.svg";

const TypePrescription = ({ data, docID }) => {
    const [id, setId] = useState(null);
    const [basicChecks, setBasicChecks] = useState([]);
    const [symptoms, setSymptoms] = useState([]);
    const [diagnostics, setDiagnostics] = useState([]);
    const [currentConds, setCurrentConds] = useState([]);
    const [medicines, setMedicines] = useState([]);
    const [tests, setTests] = useState([]);
    const [remarks, setRemarks] = useState([]);
    const [basicCheck, setBasicCheck] = useState({ name: "", value: "" });
    const [symptom, setSymptom] = useState("");
    const [diagnostic, setDiagnostic] = useState("");
    const [currentCond, setCurrentCond] = useState("");
    const [medicine, setMedicine] = useState({ name: "", dosage: "" });
    const [test, setTest] = useState("");
    const [remark, setRemark] = useState("");

    const history = useHistory();

    useEffect(() => {
        console.log(data);
        setId({ uid: data._id, did: docID });
    }, []);

    useEffect(() => {
        setBasicCheck({ name: "", value: "" });
    }, [basicChecks]);

    useEffect(() => {
        setSymptom("");
    }, [symptoms]);

    useEffect(() => {
        setDiagnostic("");
    }, [diagnostics]);

    useEffect(() => {
        setMedicine({ name: "", dosage: "" });
    }, [medicines]);

    useEffect(() => {
        setTest("");
    }, [tests]);

    useEffect(() => {
        setRemark("");
    }, [remarks]);

    const onClickAddCheck = () => {
        if (basicCheck.name === "") {
            alert("Enter check name.");
            return;
        }
        if (basicCheck.value === "") {
            alert("Enter check value.");
            return;
        }
        setBasicChecks((prev) => {
            return [...prev, basicCheck];
        });
    };

    const onClickAddSymptom = () => {
        if (symptom === "") {
            alert("Enter symptom.");
            return;
        }
        setSymptoms((prev) => {
            return [...prev, symptom];
        });
    };

    const onClickAddDiagnostic = () => {
        if (diagnostic === "") {
            alert("Enter diagnostic.");
            return;
        }
        setDiagnostics((prev) => {
            return [...prev, diagnostic];
        });
    };

    const onClickAddCurrentCond = () => {
        if (currentCond === "") {
            alert("Enter condition.");
            return;
        }
        setCurrentConds((prev) => {
            return [...prev, currentCond];
        });
    };

    const onClickAddMedicine = () => {
        if (medicine.name === "") {
            alert("Enter medicine name.");
            return;
        }
        if (medicine.dosage === "") {
            alert("Enter dosage.");
            return;
        }
        setMedicines((prev) => {
            return [...prev, medicine];
        });
    };

    const onClickAddTest = () => {
        if (test === "") {
            alert("Enter test name.");
            return;
        }
        setTests((prev) => {
            return [...prev, test];
        });
    };

    const onClickAddRemark = () => {
        if (remark === "") {
            alert("Enter remark.");
            return;
        }
        setRemarks((prev) => {
            return [...prev, remark];
        });
    };

    const displayBasicChecks = () => {
        return [
            basicChecks.map((item) => {
                return (
                    <div class="pair">
                        <div class="name">{item.name}</div>
                        <div class="value">{item.value}</div>
                        <div
                            class="cross"
                            onMouseDown={() => onClickCheckCross(item)}
                        >
                            X
                        </div>
                    </div>
                );
            }),
        ];
    };

    const displaySymptoms = () => {
        return [
            symptoms.map((item) => {
                return (
                    <div class="single">
                        <div class="svalue">{item}</div>
                        <div
                            class="cross"
                            onMouseDown={() => onClickSympCross(item)}
                        >
                            X
                        </div>
                    </div>
                );
            }),
        ];
    };

    const displayDiagnostics = () => {
        return [
            diagnostics.map((item) => {
                return (
                    <div class="single">
                        <div class="svalue">{item}</div>
                        <div
                            class="cross"
                            onMouseDown={() => onClickDiagCross(item)}
                        >
                            X
                        </div>
                    </div>
                );
            }),
        ];
    };

    const displayCurrentConds = () => {
        return [
            currentConds.map((item) => {
                return (
                    <div class="single">
                        <div class="svalue">{item}</div>
                        <div
                            class="cross"
                            onMouseDown={() => onClickCurrCross(item)}
                        >
                            X
                        </div>
                    </div>
                );
            }),
        ];
    };

    const displayMedicines = () => {
        return [
            medicines.map((item) => {
                return (
                    <div class="pair">
                        <div class="name">{item.name}</div>
                        <div class="value">{item.dosage}</div>
                        <div
                            class="cross"
                            onMouseDown={() => onClickMedCross(item)}
                        >
                            X
                        </div>
                    </div>
                );
            }),
        ];
    };

    const displayTests = () => {
        return [
            tests.map((item) => {
                return (
                    <div class="single">
                        <div class="svalue">{item}</div>
                        <div
                            class="cross"
                            onMouseDown={() => onClickTestCross(item)}
                        >
                            X
                        </div>
                    </div>
                );
            }),
        ];
    };

    const displayRemarks = () => {
        return [
            remarks.map((item) => {
                return (
                    <div class="single">
                        <div class="svalue">{item}</div>
                        <div
                            class="cross"
                            onMouseDown={() => onClickRemCross(item)}
                        >
                            X
                        </div>
                    </div>
                );
            }),
        ];
    };

    const onClickCheckCross = (item) => {
        setBasicChecks((prev) => {
            const idx = prev.indexOf(item);
            if (idx > -1) prev.splice(idx, 1);
            return [...prev];
        });
    };
    const onClickSympCross = (item) => {
        console.log("mai aaya");
        setSymptoms((prev) => {
            const idx = prev.indexOf(item);
            if (idx > -1) prev.splice(idx, 1);
            console.log(prev);
            return [...prev];
        });
    };
    const onClickDiagCross = (item) => {
        setDiagnostics((prev) => {
            const idx = prev.indexOf(item);
            if (idx > -1) prev.splice(idx, 1);
            return [...prev];
        });
    };
    const onClickCurrCross = (item) => {
        setCurrentConds((prev) => {
            const idx = prev.indexOf(item);
            if (idx > -1) prev.splice(idx, 1);
            return [...prev];
        });
    };
    const onClickMedCross = (item) => {
        setMedicines((prev) => {
            const idx = prev.indexOf(item);
            if (idx > -1) prev.splice(idx, 1);
            return [...prev];
        });
    };
    const onClickTestCross = (item) => {
        setTests((prev) => {
            const idx = prev.indexOf(item);
            if (idx > -1) prev.splice(idx, 1);
            return [...prev];
        });
    };
    const onClickRemCross = (item) => {
        setRemarks((prev) => {
            const idx = prev.indexOf(item);
            if (idx > -1) prev.splice(idx, 1);
            return [...prev];
        });
    };

    const onClickSendPrescription = async () => {
        const temp1 = [
            basicChecks.map((item) => {
                return {
                    check_name: item.name,
                    check_value: item.value,
                };
            }),
        ];

        const temp2 = [
            medicines.map((item) => {
                return {
                    medicine: item.name,
                    quantity: item.dosage,
                };
            }),
        ];

        const prescription = {
            uid: id.uid,
            did: id.did,
            date: new Date(),
            basic_checks: temp1,
            symptoms: symptoms,
            diagnosis: diagnostics,
            current_conditions: currentConds,
            medicines: temp2,
            tests: tests,
            remarks: remarks,
        };

        const URL = `http://localhost:8000/prescription/add-prescription`;
        try {
            const response = await axios.post(URL, prescription);
            if (response.status === 201) {
                history.push("/dashboard");
            } else {
                alert("Some error occurred while sending prescription!");
            }
        } catch (err) {
            console.log(err);
        }
        console.log(prescription);
    };

    const displayForm = () => {
        console.log(data);
        return (
            <div>
                <div id="info-section">
                    <h2>
                        {`To: ${data.name.firstname} ${data.name.middlename} ${data.name.lastname}`}
                    </h2>
                    <div id="info-in">
                        <h5>{`Email: ${data.email}`}</h5>
                        <h5>{`Mobile: ${data.mobile}`}</h5>
                        <h5>{`Gender: ${data.gender}`}</h5>
                        <h5>{`Blood group: ${data.bloodgrp}`}</h5>
                    </div>
                </div>
                <div id="form-section">
                    <div id="basic-checks">
                        <h3>Basic Checks</h3>
                        <div className="input-section">
                            <input
                                placeholder="Enter check name"
                                id="check-name"
                                value={basicCheck.name}
                                onChange={(e) => {
                                    setBasicCheck((prev) => {
                                        return {
                                            ...prev,
                                            name: e.target.value,
                                        };
                                    });
                                }}
                            />
                            <input
                                placeholder="Enter check value"
                                id="check-value"
                                value={basicCheck.value}
                                onChange={(e) => {
                                    setBasicCheck((prev) => {
                                        return {
                                            ...prev,
                                            value: e.target.value,
                                        };
                                    });
                                }}
                            />
                        </div>
                        <button class="add-button" onClick={onClickAddCheck}>
                            Add check
                        </button>
                        <div id="checks">
                            {basicChecks.length !== 0
                                ? displayBasicChecks()
                                : `No checks added`}
                        </div>
                    </div>

                    <div id="symptoms">
                        <h3>Symptoms</h3>
                        <div className="input-section">
                            <input
                                placeholder="Enter symptom"
                                id="symptom-name"
                                value={symptom}
                                onChange={(e) => {
                                    setSymptom(e.target.value);
                                }}
                            />
                        </div>
                        <button class="add-button" onClick={onClickAddSymptom}>
                            Add symptom
                        </button>
                        <div id="symptoms-list">
                            {symptoms.length !== 0
                                ? displaySymptoms()
                                : `No symptoms added`}
                        </div>
                    </div>

                    <div id="diagnostics">
                        <h3>Diagnostics</h3>
                        <div className="input-section">
                            <input
                                placeholder="Enter diagnostic"
                                id="diagnostic-name"
                                value={diagnostic}
                                onChange={(e) => {
                                    setDiagnostic(e.target.value);
                                }}
                            />
                        </div>
                        <button
                            class="add-button"
                            onClick={onClickAddDiagnostic}
                        >
                            Add diagnostic
                        </button>
                        <div id="diagnostics-list">
                            {diagnostics.length !== 0
                                ? displayDiagnostics()
                                : `No diagnostics added`}
                        </div>
                    </div>

                    <div id="current-conditions">
                        <h3>Current conditions</h3>
                        <div className="input-section">
                            <input
                                placeholder="Enter current condition"
                                id="condition-name"
                                value={currentCond}
                                onChange={(e) => {
                                    setCurrentCond(e.target.value);
                                }}
                            />
                        </div>
                        <button
                            class="add-button"
                            onClick={onClickAddCurrentCond}
                        >
                            Add current condition
                        </button>
                        <div id="current-conditions-list">
                            {currentConds.length !== 0
                                ? displayCurrentConds()
                                : `No conditions added`}
                        </div>
                    </div>

                    <div id="medicines">
                        <h3>Medicines</h3>
                        <div className="input-section">
                            <input
                                placeholder="Enter medicine name"
                                id="medicine-name"
                                value={medicine.name}
                                onChange={(e) => {
                                    setMedicine((prev) => {
                                        return {
                                            ...prev,
                                            name: e.target.value,
                                        };
                                    });
                                }}
                            />
                            <input
                                placeholder="Enter dosage"
                                id="dosage"
                                value={medicine.dosage}
                                onChange={(e) => {
                                    setMedicine((prev) => {
                                        return {
                                            ...prev,
                                            dosage: e.target.value,
                                        };
                                    });
                                }}
                            />
                        </div>
                        <button class="add-button" onClick={onClickAddMedicine}>
                            Add medicine
                        </button>
                        <div id="medicines-list">
                            {medicines.length !== 0
                                ? displayMedicines()
                                : `No medicines added`}
                        </div>
                    </div>

                    <div id="tests">
                        <h3>Tests</h3>
                        <div className="input-section">
                            <input
                                placeholder="Enter test"
                                id="test-name"
                                value={test}
                                onChange={(e) => {
                                    setTest(e.target.value);
                                }}
                            />
                        </div>
                        <button class="add-button" onClick={onClickAddTest}>
                            Add test
                        </button>
                        <div id="tests-list">
                            {tests.length !== 0
                                ? displayTests()
                                : `No tests added`}
                        </div>
                    </div>

                    <div id="remarks">
                        <h3>Remarks</h3>
                        <div className="input-section">
                            <input
                                placeholder="Enter remark"
                                id="check-name"
                                value={remark}
                                onChange={(e) => {
                                    setRemark(e.target.value);
                                }}
                            />
                        </div>
                        <button class="add-button" onClick={onClickAddRemark}>
                            Add remark
                        </button>
                        <div id="remarks-list">
                            {remarks.length !== 0
                                ? displayRemarks()
                                : `No remarks added`}
                        </div>
                    </div>
                </div>
                <button className="submit" onClick={onClickSendPrescription}>
                    Send prescription
                </button>
            </div>
        );
    };

    return (
        <div className="TypePrescription">
            <div id="section-wrapper">
                <div id="upper-section">
                    <div id="navbar">
                        <div>
                            <h2>Write prescription</h2>
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
                    {id !== null ? displayForm() : null}
                </div>
            </div>
        </div>
    );
};

export default TypePrescription;
