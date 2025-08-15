import React from "react";
import {ClipLoader} from "react-spinners";

const Loader = () => {
    return (
        <div className="loader">
            <ClipLoader color="#007bff" size={50}/>
        </div>
    );
};

export default Loader;
