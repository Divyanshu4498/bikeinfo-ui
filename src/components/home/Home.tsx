import { FC, useEffect, useContext } from "react";
import "./Home.css";
import { UserContext } from "../../App";
import Navbar from "../navbar/Navbar";
import Stolenbikes from "../bikes/Stolenbikes";
import Loader from "../loader/Loader";
import Filter from "../filter/Filter";
import Error from "../Error/Error";

const Home: FC = () => {
  const {
    apiDataParam,
    apiCountParam,
    totalCount,
    newBikeData,
    inputMiles,
    inputLocation,
    showCount,
    getData,
    getCount,
    showLoader,
    showApiError,
    showNoData,
  } = useContext(UserContext);
  useEffect(() => {
    getData();
  }, [apiDataParam]);
  useEffect(() => {
    getCount();
  }, [apiCountParam]);

  return (
    <div className="main_container">
      <Navbar />
      {showLoader ? (
        <Loader />
      ) : (
        <>
          {showApiError ? (
            <Error />
          ) : (
            <div className="bikes_container">
              <Filter />
              {newBikeData.length ? (
                <>
                  {totalCount ? (
                    <div className="count_container">
                      {showCount ? (
                        <>
                          {totalCount} bikes stolen within {inputMiles} miles of{" "}
                          {inputLocation}
                        </>
                      ) : (
                        <>
                          {totalCount} bikes stolen within {inputMiles} miles of
                          Your Location
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="count_container">
                      {totalCount} bikes stolen within {inputMiles} miles of
                      given Location
                    </div>
                  )}
                  <Stolenbikes />
                </>
              ) : (
                <>
                  {showNoData ? (
                    <div className="no_bikedata">
                      <h1>No Data Available For Given Input</h1>
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
