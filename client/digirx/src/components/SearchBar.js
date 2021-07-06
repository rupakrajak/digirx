import React, { useState, useEffect } from "react";
import Autosuggest from "react-autosuggest";
import { debounce } from "throttle-debounce";
import axios from "axios";
import "../styles/SearchBar.css";

const SearchBar = ({ data, value, setValue }) => {
    // const [value, setValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    let onChange = (event, { newValue }) => {
        setValue(newValue);
    };

    let onSuggestionsFetchRequested = async ({ value }) => {
        // const URL = `http://localhost:8000/clinical-labs/search?query=${value}`;
        const URL = `${data.URL}?query=${value}`;
        try {
            const results = await axios.get(URL);
            setSuggestions(results.data[0].results);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        onSuggestionsFetchRequested = debounce(
            5000,
            onSuggestionsFetchRequested
        );
    }, []);

    let onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    let getSuggestionValue = (suggestion) => {
        console.log(suggestion.name);
        if (data.category === "clinical-labs") return suggestion.name;
        else
            return `${suggestion.name.firstname} ${suggestion.name.middlename} ${suggestion.name.lastname}`;
    };

    let renderSuggestion = (suggestion) => {
        if (data.category === "clinical-labs")
            return <div id="suggestion">{suggestion.name}</div>;
        else
            return (
                <div id="suggestion">{`${suggestion.name.firstname} ${suggestion.name.middlename} ${suggestion.name.lastname}`}</div>
            );
    };

    const inputProps = {
        placeholder: `Enter ${data.text} name...`,
        value: value,
        onChange,
    };

    return (
        <div className="SearchBar">
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                id="autosuggest"
            />
        </div>
    );
};

export default SearchBar;
