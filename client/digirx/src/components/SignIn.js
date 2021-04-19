import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "./AppContext";
import axios from "axios";
import "../styles/SignIn.css";
import image from "../images/3775392.svg";

function SignIn() {
    /**
     * this code should be removed
     */

    // const { state } = useContext(AppContext);

    // useEffect(() => {
    //     if (state) history.push("/dashboard");
    // }, []);

    /******************/

    let { socket, setId } = useContext(AppContext);

    const initialFormState = {
        email: "",
        password: "",
    };

    const initialPageState = {
        loading: false,
        failure: "",
    };

    const history = useHistory();
    const [formState, setFormState] = useState(initialFormState);
    const [pageState, setPageState] = useState(initialPageState);
    const [disableSignInButtonState, setDisableSignInButtonState] = useState(
        true
    );

    useEffect(() => {
        if (pageState.failure !== "") {
            alert(pageState.failure);
            setPageState({ ...pageState, failure: "" });
        }
    }, [pageState]);

    useEffect(() => {
        setDisableSignInButtonState(
            !(formState.email !== "" && formState.password !== "")
        );
    }, [formState]);

    const onSignInButtonClick = async () => {
        setPageState({ ...pageState, loading: true });
        const URL = "http://localhost:8000/users/auth";
        const config = {
            body: formState,
        };
        try {
            console.warn(config.body);
            const response = await axios.post(URL, config);
            if (response.status === 200) {
                setPageState({ ...pageState, loading: false });
                const email = formState.email;
                setId(email);
                socket.emit("client:associate-email-with-socket", { email });
                // window.localStorage.setItem("id", email);
                history.push("/dashboard");
            }
        } catch (err) {
            console.log(err);
            setPageState({
                loading: false,
                failure: err.response.data.message,
            });
        }
    };

    return (
        <div className="SignIn">
            <div
                className={(() => {
                    return pageState.loading ? "modal" : "modal hidden";
                })()}
            >
                <div
                    className={(() => {
                        return pageState.loading ? "loader" : "loader hidden";
                    })()}
                ></div>
            </div>
            <div id="display-card">
                <div id="image">
                    <img src={image} alt="Display" />
                </div>
                <div id="form-wrapper">
                    <div id="form">
                        <div id="input-area">
                            <input
                                type="text"
                                placeholder="EMAIL"
                                onInput={(e) => {
                                    setFormState({
                                        ...formState,
                                        email: e.target.value,
                                    });
                                }}
                            />
                            <input
                                type="password"
                                placeholder="PASSWORD"
                                onInput={(e) => {
                                    setFormState({
                                        ...formState,
                                        password: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        <button
                            disabled={disableSignInButtonState}
                            onClick={onSignInButtonClick}
                        >
                            Sign in
                        </button>
                    </div>
                    <div id="no-acc">
                        <h6>Don't have an account?</h6>
                        <h6
                            onMouseDown={() => {
                                history.push("/signup");
                            }}
                        >
                            Click here.
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
