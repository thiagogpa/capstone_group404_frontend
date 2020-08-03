import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CButton,
  CImg,
  CButtonGroup,
  CCardFooter,
} from "@coreui/react";

import { CIcon } from "@coreui/icons-react";
import BinClass from "./BinClass";
import { CBinProvider } from "../../contexts/BinContext";
import CBinDelete from "./CBinDelete";
import CBinUpdate from "./CBinUpdate";

console.log("===============CBin====================");
//this component renders table for bin administration

//defining fields for the table
const fields = [
  {
    key: "update-delete",
    label: "",
    _style: { width: "1%" },
    sorter: false,
    filter: false,
  },

  { key: "wasteType", _style: { width: "10%" }, filter: true },
  { key: "capacity", _style: { width: "10%" } },
  { key: "measurement", _style: { width: "10%" } },
  { key: "dailyCost", _style: { width: "10%" } },
  { key: "amount", _style: { width: "5%" } },
  "description",
];

/// function returns component
const CBins = () => {
  let axiosInstance = axios.create({
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
    baseURL: process.env.REACT_APP_BACKEND,
  });
  //getting data and transform for use in the table
  useEffect(() => {
    axiosInstance
      .get("/api/bin")
      .then((response) => {
        const transformedBinList = response.data.map((item) =>
          BinClass.from(item)
        );
        setBinsList(transformedBinList);
        //console.log(trantformedBinList);
      })
      .catch((error) => setAlertMessage(error.message));
  }, []);

  const [binsList, setBinsList] = useState([]);
  const [currentBin, setCurrentBin] = useState({});

  //define CRUD operations on binlist
  const removeBin = (binId) => {
    console.log("Remove bin ", binId);
    axiosInstance
      .delete("/api/bin/" + binId)
      .then((response) =>
        setBinsList(binsList.filter((bin) => !(bin.id === binId)))
      )
      .catch((error) => setAlertMessage(error.message));
  };

  const addBin = (bin) => {
    axiosInstance
      .post("/api/bin/", bin)
      .then((response) => {
        bin.id = response.data.id;
        setBinsList([...binsList.push(bin)]);
      })
      .catch((error) => setAlertMessage(error.message));
  };

  const updateBin = (bin) => {
    console.log("Update bin ", bin.id);

    axiosInstance
      .put("/api/bin/" + bin.id, bin)
      .then((response) => {
        console.log(response);
        let binIndex = binsList.findIndex((b) => b.id === bin.id);
        binsList[binIndex] = bin;
        setBinsList([...binsList]);
      })
      .catch((error) => setAlertMessage(error.message));
  };

  //all functions are set as context to pass to other components

  const [alertMessage, setAlertMessage] = useState("");

  //states defining visibility of the helping CRUD forms
  const [deleteFormState, setDeleteFormState] = useState(false);
  const [addFormState, setAddFormState] = useState(false);
  const [updateFormState, setUpdateFormState] = useState(false);

  //passing all CRUD function and current bin through context
  const binContextValue = {
    addBin: addBin,
    updateBin: updateBin,
    removeBin: removeBin,
    bin: currentBin,
  };

  //Form Event handlers

  const handleDeleteButton = () => {
    console.log("Inside handle delete");
    console.log(currentBin);
    setDeleteFormState(true);
  };

  const handleUpdateButton = () => {
    console.log("Inside handleUpdateButton");
    console.log(currentBin);
    setUpdateFormState(true);
  };

  const handleAddButton = () => {
    console.log("Inside handleUpdateButton");
    console.log(currentBin);
    setAddFormState(true);
  };

  //return table component
  return (
    <>
      <CCard>
        <CCardHeader>
          <h1>Our Bins</h1>
        </CCardHeader>
        <CCardBody>
          <CBinProvider value={binContextValue}>
            {deleteFormState && (
              <CBinDelete
                display={true}
                setState={setDeleteFormState}
                bin={currentBin}
              />
            )}
            {updateFormState && (
              <CBinUpdate
                display={true}
                setState={setUpdateFormState}
                bin={currentBin}
                title={"Update Bin"}
              />
            )}
            {addFormState && (
              <CBinUpdate
                display={true}
                setState={setAddFormState}
                title={"Add new Bin"}
                isNewBin={true}
              />
            )}

            <CDataTable
              className="display-linebreak"
              items={binsList}
              fields={fields}
              tableFilter
              itemsPerPageSelect
              itemsPerPage={5}
              hover
              sorter
              pagination
              striped
              onRowClick={(bin) => {
                setCurrentBin(bin);
              }}
              scopedSlots={{
                wasteType: (item) => {
                  return <td className="align-middle"> {item.wasteType}</td>;
                },
                capacity: (item) => {
                  return (
                    <td className="align-middle">
                      {" "}
                      {item.getCapacity() + " yards"}
                    </td>
                  );
                },
                measurement: (item) => {
                  return (
                    <td className="align-middle">
                      {" "}
                      {item.getMeasurementString()}
                    </td>
                  );
                },
                dailyCost: (item) => {
                  return <td className="align-middle"> {item.dailyCost}</td>;
                },
                description: (item) => {
                  return <td className="align-middle"> {item.description}</td>;
                },
                amount: (item) => {
                  return <td className="align-middle"> {item.amount}</td>;
                },
                "update-delete": (item, index) => {
                  return (
                    <td className="py-2 align-middle">
                      <CButtonGroup>
                        <CButton
                          name="update"
                          onClick={() => handleUpdateButton()}
                          color={"primary"}
                          variant={"ghost"}
                        >
                          <CIcon name={"cilPencil"} />
                        </CButton>
                        <CButton
                          name="delete"
                          onClick={() => handleDeleteButton()}
                          color={"danger"}
                          variant={"ghost"}
                        >
                          <CIcon name={"cilTrash"} />
                        </CButton>
                      </CButtonGroup>
                    </td>
                  );
                },
              }}
            />
          </CBinProvider>
        </CCardBody>
        <CCardFooter>
          <CButton
            name="add"
            onClick={() => handleAddButton()}
            color={"primary"}
            className="shadow p-3 mb-5"
          >
            Add new bin to catalog
          </CButton>
        </CCardFooter>
      </CCard>
    </>
  );
};

export default CBins;
