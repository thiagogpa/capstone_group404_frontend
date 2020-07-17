import React from 'react';
import { useFormik } from 'formik';

// Import CSV package
// This requires npm install react-csv
// You can use the 'separator' parameter to select the character to be used as a separator
//import { CSVLink, CSVDownload } from "react-csv";

const COrderSummary = () => {

    // Gets the current order data
    //const orderData = [ ];

    return(
        <>
            <h1>This is Order Summary</h1>
            {/* Uncomment here to enable the CSVLink component (export to CSV file)
            <CSVLink data={orderData} separator={","}>Export to CSV file</CSVLink>;
            */}
        </>
    )
}

export default COrderSummary