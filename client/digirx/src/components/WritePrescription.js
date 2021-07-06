import React, { useEffect, useState } from "react";
import "../styles/WritePrescription.css"
import axios from "axios";
import { useHistory } from "react-router-dom";
import PrescriptionSearchAndHistory from "./PrescriptionSearchAndHistory";
import TypePrescription from "./TypePrescription";

const WritePrescription = () => {
    const [details, setDetails] = useState(null);
    const history = useHistory();

    useEffect(async () => {
        const search = window.location.search;
        const _id = new URLSearchParams(search).get("id");
        const URL = `http://localhost:8000/users/user/${_id}`;
        try {
            const results = await axios.get(URL);
            console.log(results.data.result);
            if (results.status === 200) {
                setDetails(results.data.result);
            }
        } catch (err) {
            console.log(err);
            history.push("/dashboard/write-prescription");
        }
    }, []);

    return (
        <div className="WritePrescription">
            {details === null ? <PrescriptionSearchAndHistory />: <TypePrescription data={details} docID="608e98103325891dc409b9a9" />}
        </div>
    );
};

export default WritePrescription;
