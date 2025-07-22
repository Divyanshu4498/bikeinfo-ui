import axios from "axios";
import React, { FC, useState } from "react";
import Home from "./components/home/Home";
import { AppContextInterface, CountApiParam } from "./Interface";

export const UserContext = React.createContext<AppContextInterface | any>(null);

const App: FC = () => {
  const [bikeData, setBikeData] = useState([]);
  const [showApiError, setShowApiError] = useState(false);
  const [apiError, setApiError] = useState("");
  const [inputLocation, setInputLocation] = useState("IP");
  const [inputMiles, setInputMiles] = useState(200);
  const [newBikeData, setNewBikeData] = useState([]);
  const [showNoData, setShowNoData] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [showCount, setShowCount] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [apiDataParam, setApiDataParam] = useState({
    page: 1,
    per_page: 10,
    location: inputLocation,
    distance: inputMiles,
    stolenness: "proximity",
  });
  const [apiCountParam, setApiCountParam] = useState({
    location: inputLocation,
    distance: inputMiles,
    stolenness: "proximity",
  });

  const getData = () => {
    setShowLoader(true);
    setShowApiError(false);
    setApiError("");
    axios("https://bikeindex.org/api/v3/search", { params: apiDataParam })
      .then((response: any) => {
        setBikeData(response.data.bikes);
        setNewBikeData(response.data.bikes);
        setShowLoader(false);
      })
      .catch((err: any) => {
        setApiError(err.message);
        setShowLoader(false);
        setShowApiError(true);
      });
  };
  const getCount = () => {
    axios("https://bikeindex.org/api/v3/search/count", {
      params: apiCountParam,
    })
      .then((response: CountApiParam) => {
        setTotalCount(response.data.proximity);
      })
      .catch((err: any) => {
        setApiError(err.message);
      });
  };

  return (
    <UserContext.Provider
      value={{
        bikeData,
        setBikeData,
        newBikeData,
        setNewBikeData,
        apiDataParam,
        setApiDataParam,
        apiCountParam,
        setApiCountParam,
        totalCount,
        setTotalCount,
        inputLocation,
        setInputLocation,
        inputMiles,
        setInputMiles,
        showCount,
        setShowCount,
        showLoader,
        setShowLoader,
        getData,
        getCount,
        showApiError,
        apiError,
        showNoData,
        setShowNoData,
      }}
    >
      <Home />
    </UserContext.Provider>
  );
};

export default App;
