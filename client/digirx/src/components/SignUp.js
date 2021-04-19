import React, { useState } from "react";
import "../styles/SignUp.css";
import digirx_logo from "../images/digirx-logo.svg";

function SignUp() {
    const initialFormState = {
        name: {
            firstname: "",
            middlename: "",
            lastname: "",
        },
        email: "",
        mobile: "",
        dob: "",
        gender: "",
        bloodgrp: "",
        residence: {
            addressline1: "",
            addressline2: "",
            city_village: "",
            district: "",
            pincode: "",
            state: "",
            country: "",
        },
        category: "",
        password: "",
        confirm_password: "",
        additional: null,
    };

    const [formState, setFormState] = useState(initialFormState);
    const [pageState, setPageState] = useState(0);

    console.log("Page loaded", pageState);
	console.log(formState["name"]);

    const onClickNext = () => {
        setPageState((pageState) => pageState + 1);
    };

    const onClickBack = () => {
        setPageState((pageState) => pageState - 1);
    };

    const disableNextButton = () => {
        return !(
            formState.name.firstname !== "" &&
            formState.name.middlename !== "" &&
            formState.name.lastname !== "" &&
            formState.email !== "" &&
            formState.mobile !== "" &&
            formState.dob !== "" &&
            formState.gender !== "" &&
            formState.bloodgrp !== "" &&
            formState.residence.addressline1 !== "" &&
            formState.residence.city_village !== "" &&
            formState.residence.district !== "" &&
            formState.residence.pincode !== "" &&
            formState.residence.state !== "" &&
            formState.residence.country !== ""
        );
    };

    return (
        <div className="SignUp">
            <div id="form">
                <div id="row">
                    <div id="col">
                        <img src={digirx_logo} alt="DigiRx logo" />
                        <div>
                            <h1>Sign up</h1>
                            <div id="name">
                                <input
                                    type="text"
                                    name="firstname"
                                    placeholder="First Name"
									onInput={(e) => {formState.name.firstname = e.target.value}}
                                />
                                <input
                                    type="text"
                                    name="middlename"
                                    placeholder="Middle Name"
									onInput={(e) => {formState.name.middlename = e.target.value}}
                                />
                                <input
                                    type="text"
                                    name="lastname"
                                    placeholder="Last Name"
									onInput={(e) => {formState.name.lastname = e.target.value}}
                                />
                            </div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
								onInput={(e) => {formState.email = e.target.value}}
                            />
                            <input
                                type="tel"
                                name="mobile"
                                placeholder="Mobile"
								onInput={(e) => {formState.mobile = e.target.value}}
                            />
                            <div id="group">
                                <input
                                    type="date"
                                    name="dob"
                                    placeholder="D.O.B."
									onInput={(e) => {formState.dob = e.target.value; console.log(formState.dob)}}
                                />
                                <select name="gender" defaultValue={formState.gender} onChange={(e) => {formState.gender = e.target.value; console.log(formState.gender)}}>
                                    <option value="" disabled hidden>
                                        Gender
                                    </option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                <select name="bloodgrp">
                                    <option value="" selected disabled hidden>
                                        Blood group
                                    </option>
                                    <option>O+</option>
                                    <option>A+</option>
                                    <option>B+</option>
                                    <option>AB+</option>
                                    <option>O-</option>
                                    <option>A-</option>
                                    <option>B-</option>
                                    <option>AB-</option>
                                </select>
                            </div>
                            <div id="residence">
                                <div id="section-1">
                                    <input
                                        type="text"
                                        name="addressline1"
                                        placeholder="Address line 1"
                                    />
                                    <input
                                        type="text"
                                        name="addressline2"
                                        placeholder="Address line 2"
                                    />
                                </div>
                                <div id="section-2">
                                    <input
                                        type="text"
                                        name="city_village"
                                        placeholder="City/Village"
                                    />
                                    <input
                                        type="text"
                                        name="district"
                                        placeholder="District"
                                    />
                                    <input
                                        type="text"
                                        name="pincode"
                                        placeholder="PIN code"
                                    />
                                </div>
                                <div id="section-3">
                                    <input
                                        type="text"
                                        name="state"
                                        placeholder="State"
                                    />
                                    <input
                                        type="text"
                                        name="country"
                                        placeholder="Country"
                                    />
                                </div>
                            </div>
                            <div id="password">
                                <input type="password" placeholder="Password" />
                                <input
                                    type="password"
                                    placeholder="Confirm password"
                                />
                            </div>
                        </div>
                    </div>
                    <div id="nav-buttons">
                        <button
                            id="back"
                            className={pageState === 0 ? "hidden" : ""}
                            onClick={onClickBack}
                        >
                            Back
                        </button>
                        <button
                            id="next"
                            disabled={disableNextButton()}
                            onClick={onClickNext}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;

{
    /* <div id="register-types-buttons">
                        <div className="radio-wrapper">
                            <input type="radio" id="category1" name="category" value="general" />
                            <label for="category1">General</label>
                        </div>
                        <div className="radio-wrapper">
                            <input type="radio" id="category2" name="category" value="general" />
                            <label for="category2">Health worker</label>
                        </div>
                        <div className="radio-wrapper">
                            <input type="radio" id="category3" name="category" value="general" />
                            <label for="category3">Pharmacy</label>
                        </div>
                        <div className="radio-wrapper">
                            <input type="radio" id="category4" name="category" value="general" />
                            <label for="category4">Hospital</label>
                        </div>
                        <div className="radio-wrapper">
                            <input type="radio" id="category5" name="category" value="general" />
                            <label for="category5">Clinical lab</label>
                        </div>
                    </div> */
}
